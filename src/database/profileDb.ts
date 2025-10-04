import Dexie from "dexie";
import type { Table } from "dexie";

export interface Profile {
    id?: number;
    fullName: string;
    experience?: number;
    skills: string[];
    bio: string;
}

export class ProfileDatabase extends Dexie {
    profiles!: Table<Profile, number>;

    constructor() {
        super("ProfileDB");
        this.version(1).stores({
            profiles: "++id, fullName, experience, skills, bio",
        });
    }
}

export const profileDb = new ProfileDatabase();
