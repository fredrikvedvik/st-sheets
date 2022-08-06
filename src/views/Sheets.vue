<template>
    <div>
        <div class="m-4 grid grid-cols-4 dark:text-white">
            <CollectionSelector
                class="ml-2 flex-col-1"
                v-model:collection="collectionId"
            ></CollectionSelector>
            <TranspositionSelector
                class="ml-2"
                v-model:transposition="transposition"
            ></TranspositionSelector>
            <Suspense v-if="collectionId">
                <template #default>
                    <SongSelector
                        class="ml-2"
                        :collectionId="collectionId"
                        v-model:song="song"
                    >
                    </SongSelector>
                </template>
                <template #fallback> Loading... </template>
            </Suspense>
        </div>
        <div>
            <Suspense v-if="song">
                <template #default>
                    <SheetViewer
                        :songId="song"
                        :transposition="transposition ?? '0'"
                    ></SheetViewer>
                </template>
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import TranspositionSelector from "../components/TranspositionSelector.vue";
import CollectionSelector from "../components/CollectionSelector.vue";
import SongSelector from "../components/SongSelector.vue";
import SheetViewer from "../components/SheetViewer.vue";

const _collectionId = ref(localStorage.getItem("collection"));
const collectionId = computed({
    get() {
        return _collectionId.value;
    },
    set(v) {
        _collectionId.value = v;
        song.value = null;
        if (v) {
            localStorage.setItem("collection", v);
        } else {
            localStorage.removeItem("collection")
        }
    },
});

const _transposition = ref(localStorage.getItem("transposition"))
const transposition = computed({
    get() {
        return _transposition.value;
    },
    set(v) {
        _transposition.value = v
        if (v) {
            localStorage.setItem("transposition", v);
        } else {
            localStorage.removeItem("transposition")
        }
    },
});

const _song = ref(localStorage.getItem("song"))
const song = computed({
    get() {
        return _song.value
    },
    set(v) {
        _song.value = v;
        if (v) {
            localStorage.setItem("song", v);
        } else {
            localStorage.removeItem("song")
        }
    },
});
</script>
