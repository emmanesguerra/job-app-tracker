import Dexie from "dexie";

export const db = new Dexie("JobTrackerDB");

db.version(1).stores({
    applications: "++id, company, title, description, status, dateApplied, coverLetter, salary, notes",
});

db.open().catch((err) => {
    console.error("Failed to open db:", err);
});
