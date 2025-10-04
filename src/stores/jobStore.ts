import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/database/db";
import type { Job } from "@/database/db";

export const useJobStore = defineStore("jobStore", () => {
    const jobs = ref<Job[]>([]);

    const loadJobs = async (): Promise<void> => {
        const all: Job[] = await db.applications.toArray();
        jobs.value = all.sort(
            (a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
        );
    };

    const addJob = async (
        job: Omit<Job, "id" | "dateApplied" | "coverLetter">
    ): Promise<void> => {
        await db.applications.add({
            ...job,
            dateApplied: new Date(),
            coverLetter: "",
        });
        await loadJobs();
    };

    const getJobById = async (id: number): Promise<Job | undefined> => {
        return await db.applications.get(id);
    };

    const updateJob = async (
        id: number,
        data: Partial<Omit<Job, "id">>
    ): Promise<void> => {
        await db.applications.update(id, data);
        await loadJobs();
    };

    const updateJobStatus = async (id: number, status: string): Promise<void> => {
        await db.applications.update(id, { status });
        const index = jobs.value.findIndex((j) => j.id === id);
        if (index !== -1) jobs.value[index].status = status;
    };

    const updateCoverLetter = async (id: number, coverLetter: string): Promise<void> => {
        await db.applications.update(id, { coverLetter });
        const index = jobs.value.findIndex((j) => j.id === id);
        if (index !== -1) jobs.value[index].coverLetter = coverLetter;
    };

    const deleteJob = async (id: number): Promise<void> => {
        await db.applications.delete(id);
        await loadJobs();
    };

    return {
        jobs,
        loadJobs,
        addJob,
        getJobById,
        updateJob,
        updateJobStatus,
        updateCoverLetter,
        deleteJob,
    };
});
