<template>
    <v-container class="mt-5">
        <v-row>
            <v-col cols="12" md="3">
                <JobForm />
            </v-col>

            <v-col cols="12" md="9">
                <JobTable />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import JobForm from "./JobForm.vue";
import JobTable from "./JobTable.vue";
</script>
