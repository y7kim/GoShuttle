export interface Rally {
    location: {
        type: "POINT";
        coordinates: number[];
    };
    capacity: number;
    skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    time: Date;
    free: boolean;
    cost?: string;
    vehicle: {
        color: string;
        make: string;
    };
    username: string;
    diffMin: number;
}