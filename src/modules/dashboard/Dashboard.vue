<template>
    <v-container class="mt-5">
        <v-row>
            <!-- Add Job Form - 1/3 width -->
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title>Add New Job</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="addJob">
                            <v-text-field v-model="company" label="Company" required />
                            <v-text-field v-model="title" label="Job Title" required />
                            <v-textarea v-model="description" label="Job Description" rows="4" />
                            <v-text-field v-model="salary" label="Salary" type="number" min="0" />
                            <v-select v-model="status" :items="['Applied', 'Interview', 'Offer', 'Rejected']"
                                label="Status" />
                            <v-btn type="submit" color="primary" class="mt-3">Add Job</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Job List Table - 2/3 width -->
            <v-col cols="12" md="9">
                <v-data-table :headers="headers" :items="jobs" item-key="id" class="elevation-1" dense>
                    <template #item.status="{ item }">
                        <v-chip :color="statusColor(item.status)" text-color="white" small>
                            {{ item.status }}
                        </v-chip>
                    </template>

                    <template #item.dateApplied="{ item }">
                        {{ formatDate(item.dateApplied) }}
                    </template>

                    <template #item.salary="{ item }">
                        {{ item.salary ? `$${item.salary}` : 'N/A' }}
                    </template>

                    <template #item.actions="{ item }">
                        <v-btn color="primary" text
                            @click="$router.push({ name: 'Application', params: { id: item.id } })">
                            View
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../../database/db.js";

// Form fields
const company = ref("");
const title = ref("");
const description = ref("");
const salary = ref("");
const status = ref("Applied");

// Table data
const jobs = ref([]);
const headers = [
    { title: "Company", value: "company" },
    { title: "Job Title", value: "title" },
    { title: "Salary", value: "salary" },
    { title: "Status", value: "status" },
    { title: "Date Applied", value: "dateApplied" },
    { title: "Actions", value: "actions", sortable: false },
];

// Load jobs from Dexie
const loadJobs = async () => {
    const allJobs = await db.applications.toArray();
    jobs.value = allJobs.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
};

onMounted(loadJobs);

const addJob = async () => {
    await db.applications.add({
        company: company.value,
        title: title.value,
        description: description.value,
        status: status.value,
        salary: salary.value,
        dateApplied: new Date(),
        coverLetter: "",
    });

    // Reset form
    company.value = "";
    title.value = "";
    description.value = "";
    salary.value = "";
    status.value = "Applied";

    await loadJobs();
};

const statusColor = (s) => {
    switch (s) {
        case "Applied":
            return "blue";
        case "Interview":
            return "orange";
        case "Offer":
            return "green";
        case "Rejected":
            return "red";
        default:
            return "grey";
    }
};

const formatDate = (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};
</script>
