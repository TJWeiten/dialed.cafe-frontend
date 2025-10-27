export interface Grinder {
    id: string;
    name: string;
    burrType: string;
    stepless: boolean;
    grindRange: string;
    notes: string | null;
    imageUrl: string | null;
}
