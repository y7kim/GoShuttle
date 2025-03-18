export interface Rally {
    location: {
        type: "POINT";
        coordinates: number[];
    };
    skillLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    time: Date;
    free: boolean;
    vehicle: {
        color: string;
        make: string;
    };
}