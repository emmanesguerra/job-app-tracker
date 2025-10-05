<template>
    <v-container class="mt-5">
        <div class="d-flex justify-space-between mb-4">
            <v-btn text color="black" @click="$router.push('/')">← Back to Dashboard</v-btn>
            <v-btn text color="primary" @click="$router.push('/profile')">Continue to Profile →</v-btn>
        </div>

        <v-card v-if="job" class="mt-4">
            <v-card-title class="text-center font-weight-bold text-uppercase">
                {{ job.title }}
            </v-card-title>

            <!-- Job Info Grid -->
            <v-row class="mt-2" dense align="stretch">
                <v-col cols="12" md="2">
                    <v-sheet class="pa-3 d-flex flex-column fill-height justify-center" elevation="1">
                        <strong>Status:</strong>
                        <v-menu v-model="statusMenu" offset-y>
                            <template #activator="{ props }">
                                <v-chip v-bind="props" :color="statusColor(job.status)" text-color="white" small
                                    class="justify-center">
                                    {{ job.status }}
                                </v-chip>
                            </template>
                            <v-list>
                                <v-list-item v-for="s in statuses" :key="s" @click="changeStatus(s)">
                                    <v-list-item-title>{{ s }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-sheet>
                </v-col>

                <v-col cols="12" md="2">
                    <v-sheet class="pa-3 d-flex flex-column fill-height justify-center" elevation="1">
                        <strong>Date Applied:</strong>
                        <div>{{ formatDate(job.dateApplied) }}</div>
                    </v-sheet>
                </v-col>

                <v-col cols="12" md="2">
                    <v-sheet class="pa-3 d-flex flex-column fill-height justify-center" elevation="1">
                        <strong>Salary:</strong>
                        <div>{{ job.salary ? formatSalary(job.salary) : "N/A" }}</div>
                    </v-sheet>
                </v-col>

                <v-col cols="12" md="6">
                    <v-sheet class="pa-3 d-flex flex-column fill-height justify-center" elevation="1">
                        <strong>Company:</strong>
                        <div>{{ job.company }}</div>
                    </v-sheet>
                </v-col>
            </v-row>

            <!-- Job Description & Cover Letter -->
            <v-card-text class="mt-4">
                <v-row>
                    <v-col cols="12" md="6">
                        <h3>Job Description</h3>
                        <DynamicFormField v-if="job" v-model="job.description" :field="jobDescriptionField" />
                    </v-col>

                    <v-col cols="12" md="6">
                        <h3>Cover Letter</h3>
                        <DynamicFormField v-if="job" v-model="job.coverLetter" :field="coverLetterField" />

                        <div class="d-flex mt-3" style="gap: 10px;">
                            <v-btn color="primary" @click="saveCoverLetter">Save Cover Letter</v-btn>
                            <v-btn color="secondary" @click="generateCoverLetter">Generate Cover Letter</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <div v-else>
            <v-alert type="info">Loading...</v-alert>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import DynamicFormField from "@/components/DynamicFormField.vue";
import { useJobStore } from "@/stores/jobStore";
import { formatDate, statusColor, formatSalary } from "@/utils/jobUtils";
import { generateCoverLetterAI } from "@/utils/coverLetterUtils";
import type { Job } from "@/database/db";
import { useProfileStore } from "@/stores/profileStore";

const route = useRoute();
const store = useJobStore();
const profileStore = useProfileStore();

const job = ref<Job | null>(null);
const statusMenu = ref(false);
const statuses = ["Applied", "Interview", "Offer", "Rejected"];

const coverLetterField = {
    key: "coverLetter",
    label: "Generated Cover Letter",
    type: "textarea",
    required: false,
    rows: 15,
};

const jobDescriptionField = {
    key: "description",
    label: "Job Description",
    type: "textarea",
    required: false,
    rows: 15,
    readonly: true,
};

const loadJob = async () => {
    const id = Number(route.params.id);
    job.value = await store.getJobById(id);
};

const saveCoverLetter = async () => {
    if (!job.value) return;
    await store.updateCoverLetter(job.value.id, job.value.coverLetter);
    alert("Cover letter saved!");
};

const generateCoverLetter = async () => {
    if (!job.value) return;

    await profileStore.loadProfiles();
    const profile = profileStore.profiles[0];

    if (!profile) {
        alert("No profile found. Please create a profile first.");
        return;
    }

    job.value.coverLetter = await generateCoverLetterAI(job.value, profile);

    console.log("✅ Generated Cover Letter:", job.value.coverLetter);
};

const changeStatus = async (newStatus: string) => {
    if (!job.value) return;
    await store.updateJobStatus(job.value.id, newStatus);
    job.value.status = newStatus;
    statusMenu.value = false;
};

onMounted(loadJob);
</script>
