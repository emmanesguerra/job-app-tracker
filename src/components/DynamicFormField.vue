<template>
    <component :is="componentType" :label="field.label" :type="field.type" :rows="field.rows" :items="field.options"
        :required="field.required" outlined dense class="mb-1" :model-value="modelValue" @update:model-value="onInput">
    </component>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

type Field = {
    key: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    rows?: number;
};

const props = defineProps<{
    field: Field;
    modelValue: any;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

const componentType = computed(() => {
    if (props.field.type === "textarea") return "v-textarea";
    if (props.field.type === "select") return "v-select";
    return "v-text-field";
});

const onInput = (value: any) => {
    emit("update:modelValue", value);
};
</script>
