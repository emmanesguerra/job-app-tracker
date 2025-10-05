<template>
    <v-container class="mt-5">
        <div class="d-flex justify-space-between mb-4">
            <v-btn text color="black" @click="$router.back()">← Back To Job Details</v-btn>
        </div>
        <v-row dense justify="center">
            <v-col cols="12" md="6" lg="4">
                <v-card>
                    <v-card-title class="text-center font-weight-bold text-uppercase">
                        My Profile
                    </v-card-title>

                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12" md="8">
                                <DynamicFormField v-model="profile.fullName" :field="fields.fullName" />
                            </v-col>

                            <v-col cols="12" md="4">
                                <DynamicFormField v-model="profile.experience" :field="fields.experience" />
                            </v-col>

                            <v-col cols="12">
                                <DynamicFormField v-model="profile.skills" :field="fields.skills" />
                            </v-col>

                            <v-col cols="12">
                                <DynamicFormField v-model="profile.bio" :field="fields.bio" />
                            </v-col>
                        </v-row>

                        <div class="d-flex mt-4" style="gap: 10px;">
                            <v-btn color="primary" @click="saveProfile">Save Profile</v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import DynamicFormField from "@/components/DynamicFormField.vue";

const profileStore = useProfileStore();

const profile = reactive({
    id: null as number | null,
    fullName: "",
    experience: null as number | null,
    skills: [] as string[],
    bio: ""
});

const fields = {
    fullName: { key: "fullName", label: "Full Name", type: "text", required: true },
    experience: { key: "experience", label: "Years of Experience", type: "number", required: false },
    skills: { key: "skills", label: "Skills (comma separated)", type: "text", required: false },
    bio: { key: "bio", label: "Bio / Summary", type: "textarea", rows: 5, required: false },
};

onMounted(async () => {
    await profileStore.loadProfiles();
    if (profileStore.profiles.length > 0) {
        const p = profileStore.profiles[0];
        profile.id = p.id ?? null;
        profile.fullName = p.fullName;
        profile.experience = p.experience;
        profile.skills = p.skills;
        profile.bio = p.bio;
    }
});

const saveProfile = async () => {
    const data = {
        fullName: profile.fullName,
        experience: profile.experience,
        skills: profile.skills,
        bio: profile.bio
    };

    if (profile.id) {
        await profileStore.updateProfile(profile.id, data);
        alert("Profile updated!");
    } else {
        await profileStore.addProfile(data);
        alert("Profile saved!");
        await profileStore.loadProfiles();
        profile.id = profileStore.profiles[0].id ?? null;
    }
};
</script>
