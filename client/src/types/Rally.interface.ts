export interface Rally {
    location: {
        type: "Point";
        coordinates: number[];
    };
    capacity: number;
    skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    time: string;
    free: boolean;
    cost?: number;
    vehicle: {
        color: string;
        make: string;
    };
    username: string;
    diffMin: number;
}