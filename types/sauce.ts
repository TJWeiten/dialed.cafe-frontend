export interface Sauce {
    id: string;
    name: string;
    imageUrl: string | null;
    latestVersion?: SauceVersion;
}

export interface SauceVersion {
    id: string;
    sauceId: string;
    recipe: string;
    createdAt: string;
}
