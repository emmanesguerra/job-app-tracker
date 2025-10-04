<template>
    <v-card>
        <v-card-title>Add New Job</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitJob">
                <v-text-field v-model="company" label="Company" required />
                <v-text-field v-model="title" label="Job Title" required />
                <v-textarea v-model="description" label="Job Description" rows="4" />
                <v-text-field v-model="salary" label="Salary" type="number" min="0" />
                <v-select v-model="status" :items="['Applied', 'Interview', 'Offer', 'Rejected']" label="Status" />
                <v-btn type="submit" color="primary" class="mt-3">Add Job</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useJobStore } from "@/stores/jobStore";

const store = useJobStore();
const company = ref("");
const title = ref("");
const description = ref("");
const salary = ref("");
const status = ref("Applied");

const submitJob = async () => {
    await store.addJob({
        company: company.value,
        title: title.value,
        description: description.value,
        salary: salary.value,
        status: status.value,
        dateApplied: new Date(),
        coverLetter: "",
    });

    company.value = "";
    title.value = "";
    description.value = "";
    salary.value = "";
    status.value = "Applied";
};
</script>
