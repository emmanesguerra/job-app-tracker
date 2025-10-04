<template>
    <v-data-table :headers="headers" :items="store.jobs" item-key="id" class="elevation-1" dense>
        <template #item.status="{ item }">
            <v-chip :color="statusColor(item.status)" text-color="white" small>{{ item.status }}</v-chip>
        </template>
        <template #item.dateApplied="{ item }">
            {{ formatDate(item.dateApplied) }}
        </template>
        <template #item.salary="{ item }">
            {{ item.salary ? formatSalary(item.salary) : "N/A" }}
        </template>
        <template #item.actions="{ item }">
            <v-btn color="primary" text
                @click="$router.push({ name: 'Application', params: { id: item.id } })">View</v-btn>
        </template>
    </v-data-table>
</template>

<script setup>
import { useJobStore } from "@/stores/jobStore";
import { onMounted } from "vue";
import { formatDate, statusColor, formatSalary } from "@/utils/jobUtils";

const store = useJobStore();

const headers = [
    { title: "Company", value: "company" },
    { title: "Job Title", value: "title" },
    { title: "Salary", value: "salary" },
    { title: "Status", value: "status" },
    { title: "Date Applied", value: "dateApplied" },
    { title: "Actions", value: "actions", sortable: false },
];

onMounted(() => store.loadJobs());
</script>
