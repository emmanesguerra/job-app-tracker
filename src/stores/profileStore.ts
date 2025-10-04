import { defineStore } from "pinia";
import { ref } from "vue";
import { profileDb } from "@/database/profileDb";
import type { Profile } from "@/database/profileDb";

export const useProfileStore = defineStore("profileStore", () => {
    const profiles = ref<Profile[]>([]);

    const loadProfiles = async (): Promise<void> => {
        const all = await profileDb.profiles.toArray();
        profiles.value = all;
    };

    const addProfile = async (profile: Omit<Profile, "id">): Promise<void> => {
        await profileDb.profiles.add(profile);
        await loadProfiles();
    };

    const updateProfile = async (id: number, data: Partial<Omit<Profile, "id">>): Promise<void> => {
        await profileDb.profiles.update(id, data);
        await loadProfiles();
    };

    const getProfileById = async (id: number): Promise<Profile | undefined> => {
        return await profileDb.profiles.get(id);
    };

    const deleteProfile = async (id: number): Promise<void> => {
        await profileDb.profiles.delete(id);
        await loadProfiles();
    };

    return {
        profiles,
        loadProfiles,
        addProfile,
        updateProfile,
        getProfileById,
        deleteProfile,
    };
});
