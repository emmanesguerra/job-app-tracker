<template>
    <v-container class="mt-5">
        <v-btn text @click="$router.push('/')">← Back to Dashboard</v-btn>

        <v-card v-if="job" class="mt-4">
            <v-card-title>
                {{ job.title }} at {{ job.company }}
            </v-card-title>

            <v-card-subtitle>
                <v-chip :color="statusColor(job.status)" text-color="white" small>
                    {{ job.status }}
                </v-chip>
                <span class="ml-3"><strong>Date Applied:</strong> {{ formatDate(job.dateApplied) }}</span>
                <span class="ml-3"><strong>Salary:</strong> {{ job.salary ? formatSalary(job.salary) : "N/A" }}</span>
            </v-card-subtitle>

            <v-card-text>
                <v-row>
                    <!-- Left Column: Job Description (read-only) -->
                    <v-col cols="12" md="6">
                        <h3>Job Description</h3>
                        <v-textarea v-model="job.description" label="Job Description" rows="15" outlined
                            readonly></v-textarea>
                    </v-col>

                    <!-- Right Column: Cover Letter -->
                    <v-col cols="12" md="6">
                        <h3>Cover Letter</h3>
                        <v-textarea v-model="job.coverLetter" label="Generated cover letter" rows="15"
                            outlined></v-textarea>

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

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../../database/db.js";
import { useRoute } from "vue-router";
import { formatDate, statusColor, formatSalary } from "@/utils/jobUtils";

const route = useRoute();
const job = ref(null);

const loadJob = async () => {
    const id = Number(route.params.id);
    job.value = await db.applications.get(id);
};

onMounted(loadJob);

const saveCoverLetter = async () => {
    if (!job.value) return;
    await db.applications.update(job.value.id, { coverLetter: job.value.coverLetter });
    alert("Cover letter saved!");
};

const generateCoverLetter = () => {
    if (!job.value) return;

    // Example placeholder; can replace with AI API
    job.value.coverLetter = `Dear Hiring Manager,

I am excited to apply for the position of ${job.value.title} at ${job.value.company}. With my skills and experience, I believe I can contribute to your team.

Sincerely,
[Your Name]`;
};

</script>
