type notification = {
    _id: string;
    Title: string;
    Description: string;
    isForAll: boolean;
    isSystemFlagged: boolean;
    Recievers: string[];
    createdAt: Date;
    updatedAt: Date;
}