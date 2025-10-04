<template>
    <component :is="componentType" v-bind="componentProps" :model-value="modelValue" @update:model-value="onInput" />
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

type Field = {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
    rows?: number;
    readonly?: boolean;
};

const props = defineProps<{
    field: Field;
    modelValue: any;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

// Determine which Vuetify component to use
const componentType = computed(() => {
    if (props.field.type === "textarea") return "v-textarea";
    if (props.field.type === "select") return "v-select";
    return "v-text-field";
});

// Build common props to pass down
const componentProps = computed(() => {
    return {
        label: props.field.label,
        type: props.field.type,
        required: props.field.required || false,
        rows: props.field.rows || 4,
        items: props.field.options || [],
        readonly: props.field.readonly || false,
        outlined: true,
        dense: true,
        class: "mb-1",
    };
});

const onInput = (value: any) => {
    emit("update:modelValue", value);
};
</script>
