import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import 'chartjs-adapter-date-fns';
import { Chart } from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent implements AfterViewInit, OnChanges {

    private chart: any;

    @Input() type!: string;
    @Input() color!: string; // Au format "rrr, ggg, bbb"
    @Input() data!: { time: Date; value: number; }[];

    ngAfterViewInit(): void {
        this.createChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && changes['data'].currentValue && changes['data'].currentValue.length > 0) {
            this.updateChart();
        }
    }

    createChart() {
        const ctx = document.getElementById(`${this.type}-chart`) as HTMLCanvasElement;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'My Dataset',
                    data: this.data,
                    borderColor: `rgba(${this.color}, 1)`,
                    backgroundColor: `rgba(${this.color}, 0.2)`,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                scales: {
                    x: {
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'DD/MM/YYYY',
                                hour: 'HH:mm'
                            },
                            tooltipFormat: 'DD/MM/YYYY HH:mm'
                        },
                        ticks: {
                            autoSkip: true,
                            autoSkipPadding: 5,
                            maxRotation: 0
                        }
                    },
                    y: {}
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    updateChart() {
        if (this.chart) {
            // Connaître l'intervalle des données, pour définir le format :
            // Plus de 24h  -> DD/MM/YYYY
            // 24h ou moins -> HH:mm
            const interval = moment(this.data[this.data.length - 1].time).diff(moment(this.data[0].time), 'hours');
            const labelFormat = interval > 24 ? 'DD/MM/YYYY' : 'HH:mm';

            this.chart.data.labels = this.data.map(d => moment(d.time).format(labelFormat));
            this.chart.data.datasets[0].data = this.data.map(d => d.value);
            this.chart.options.scales.x.time.displayFormats.day = labelFormat;
            this.chart.options.scales.x.time.tooltipFormat = `${labelFormat} HH:mm`;
            this.chart.update();
        }
    }
}
