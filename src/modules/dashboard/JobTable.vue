<template>
    <v-data-table :headers="headers" :items="store.jobs" item-key="id" class="elevation-1" dense>
        <template #item.status="{ item }">
            <v-chip :color="statusColor(item.status)" text-color="white" small>{{ item.status }}</v-chip>
        </template>
        <template #item.dateApplied="{ item }">
            {{ formatDate(item.dateApplied) }}
        </template>
        <template #item.salary="{ item }">
            {{ item.salary ? `$${item.salary}` : "N/A" }}
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

const store = useJobStore();

const headers = [
    { title: "Company", value: "company" },
    { title: "Job Title", value: "title" },
    { title: "Salary", value: "salary" },
    { title: "Status", value: "status" },
    { title: "Date Applied", value: "dateApplied" },
    { title: "Actions", value: "actions", sortable: false },
];

const statusColor = (s) => {
    switch (s) {
        case "Applied": return "blue";
        case "Interview": return "orange";
        case "Offer": return "green";
        case "Rejected": return "red";
        default: return "grey";
    }
};

const formatDate = (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
};

onMounted(() => store.loadJobs());
</script>
