<template>
    <div>
        <label for="collection-id-select" class="dark:text-white"
            >Collection</label
        >
        <BaseSelect
            id="collection-id-select"
            :value="collection"
            @input="(e: Event) => $emit('update:collection', (e.target as HTMLSelectElement)?.value)"
            placeholder="Collection..."
        >
            <option v-for="col in collections" :value="col.id">
                {{ col.title }}
            </option>
        </BaseSelect>
    </div>
</template>
<script lang="ts" setup>
import { collectionService } from "../services/hiddentreasures";
import BaseSelect from "./BaseSelect.vue";

const collections = (await collectionService.list()).filter(
    (i) => i.type === "song"
);

defineProps<{
    collection: string | null;
}>();

defineEmits<{
    (e: "update:collection", value: string | null): void;
}>();
</script>
