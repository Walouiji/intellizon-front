export interface SensorData {
    _id: string;
    datetime: Date;
    humidity: {
        value: number;
        unit: string;
    };
    temperature: {
        value: number;
        unit: string;
    };
    light: {
        value: number;
        unit: string;
    };
}