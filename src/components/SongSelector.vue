<template>
    <div>
        <label>Song</label>
        <Modal
            :title="title"
            v-model:show="showModal"
        >
            <div class="grid grid-cols-10">
                <button v-for="song in songs" class="hover:bg-slate-900 m-2 border-slate-600 border border-solid h-12 w-12" @click="setSong(song)">
                    {{ song.getNumber(collectionId) }}
                </button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts" setup>
import { Song } from "hiddentreasures-js";
import { computed, ref, watch } from "vue";
import { songService } from "../services/hiddentreasures";
import Modal from "./Modal.vue";

const props = defineProps<{
    collectionId: string;
    song: string | null;
}>();

const emit = defineEmits<{
    (e: "update:song", song: string | null): void;
}>();

const sort = (songs: Song[]) => {
    return songs.sort((a, b) => {
        return (a.getNumber(props.collectionId) ?? 0) - (b.getNumber(props.collectionId) ?? 0)
    })
}

const showModal = ref(false);

const songs = ref(sort(await songService.childrenOf(props.collectionId)));

const title = computed(() => {
    const song = songs.value.find(i => i.id === props.song)
    if (!song) {
        return "Select song"
    }
    return song.getNumber(props.collectionId) + " - " + song.title;
})

const setSong = (song: Song) => {
    emit("update:song", song.id)
    showModal.value = false;
    title.effect.run();
}

watch(
    () => props.collectionId,
    async (first) => {
        songs.value = sort(await songService.childrenOf(first))
    }
);
</script>
