<template>
    <div>
        <label class="text-white" for="transposition-select"
            >Transposition</label
        >
        <BaseSelect
            id="transposition-select"
            :value="transposition"
            @input="(e: InputEvent) => $emit('update:transposition', (e.target as HTMLSelectElement)?.value)"
        >
            <option v-for="t of transpositions" :value="t.key">
                {{ t.display }}
            </option>
        </BaseSelect>
    </div>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
import BaseSelect from "./BaseSelect.vue";

const transpositions = [
    {
        key: "+2",
        display: "Bb",
    },
    {
        key: "0",
        display: "C",
    },
    {
        key: "+9",
        display: "Eb",
    },
];

defineProps<{
    transposition: string | null;
}>();

defineEmits<{
    (e: "update:transposition", value: string | null): void;
}>();
</script>
