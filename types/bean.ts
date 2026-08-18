export type RoastLevel =
    | "LIGHT"
    | "MEDIUM_LIGHT"
    | "MEDIUM"
    | "MEDIUM_DARK"
    | "DARK"
    | "UNKNOWN";

export type Process =
    | "WASHED"
    | "NATURAL"
    | "HONEY"
    | "ANAEROBIC"
    | "WET_HULLED"
    | "CARBONIC_MACERATION"
    | "OTHER"
    | "UNKNOWN";

export interface Bean {
    id: string;
    name: string;
    roaster: string;
    roastLevel: RoastLevel;
    packageWeight: number | null;
    currentWeight: number | null;
    decaf: boolean;
    process: Process;
    descriptors: string | null;
    notes: string | null;
    imageUrl: string | null;
    archived: boolean;
    roastDate: string | null;
}
