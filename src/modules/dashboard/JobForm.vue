<template>
    <v-card>
        <v-card-title>Add New Job</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitJob">
                <DynamicFormField v-for="field in fields" :key="field.key" :field="field" v-model="form[field.key]" />
                <v-btn type="submit" color="primary">Add Job</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useJobStore } from "@/stores/jobStore";
import DynamicFormField from "@/components/DynamicFormField.vue";

const store = useJobStore();

type FormFields = {
    company: string;
    title: string;
    description: string;
    salary: number | null;
    status: string;
    [key: string]: string | number | null;
};

const form = reactive<FormFields>({
    company: "",
    title: "",
    description: "",
    salary: null,
    status: "Applied",
});

const fields = [
    { key: "company", label: "Company", type: "text", required: true },
    { key: "title", label: "Job Title", type: "text", required: true },
    { key: "description", label: "Job Description", type: "textarea", required: false, rows: 4 },
    { key: "salary", label: "Salary", type: "number", required: false },
    { key: "status", label: "Status", type: "select", options: ["Applied", "Interview", "Offer", "Rejected"], required: true },
];

const submitJob = async () => {
    await store.addJob(form);
    Object.keys(form).forEach(key => {
        (form as any)[key as keyof FormFields] = key === "status" ? "Applied" : key === "salary" ? null : "";
    });
};
</script>
