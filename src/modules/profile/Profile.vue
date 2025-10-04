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
                            <!-- Full Name -->
                            <v-col cols="12" md="8">
                                <DynamicFormField v-model="profile.fullName" :field="fields.fullName" />
                            </v-col>

                            <!-- Years of Experience -->
                            <v-col cols="12" md="4">
                                <DynamicFormField v-model="profile.experience" :field="fields.experience" />
                            </v-col>

                            <!-- Skills -->
                            <v-col cols="12">
                                <DynamicFormField v-model="profile.skills" :field="fields.skills" />
                            </v-col>

                            <!-- Bio / Summary -->
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
import { ref, reactive, onMounted } from "vue";
import DynamicFormField from "@/components/DynamicFormField.vue";

interface Profile {
    fullName: string;
    experience: number | null;
    skills: string[];
    bio: string;
}

const profile = reactive<Profile>({
    fullName: "",
    experience: null,
    skills: [],
    bio: "",
});

const fields = {
    fullName: { key: "fullName", label: "Full Name", type: "text", required: true },
    experience: { key: "experience", label: "Years of Experience", type: "number", required: false },
    skills: { key: "skills", label: "Skills (comma separated)", type: "text", required: false },
    bio: { key: "bio", label: "Bio / Summary", type: "textarea", rows: 5, required: false },
};

const saveProfile = () => {
    console.log("Profile saved:", profile);
    alert("Profile saved!");
};

</script>
