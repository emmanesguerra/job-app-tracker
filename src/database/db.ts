import Dexie from "dexie";
import type { Table } from "dexie";

export interface Job {
    id?: number;
    company: string;
    title: string;
    description: string;
    status: string;
    salary?: number;
    dateApplied: Date;
    coverLetter: string;
}

export class JobDatabase extends Dexie {
    applications!: Table<Job, number>;

    constructor() {
        super("JobTrackerDB");
        this.version(1).stores({
            applications: "++id, company, title, description, status, salary, dateApplied, coverLetter",
        });
    }
}

export const db = new JobDatabase();
