<template>
    <div>
        <div v-if="svg">
            <SvgViewer :svg="svg"></SvgViewer>
        </div>
        <div v-else-if="sheets">
            <div v-for="sheet in sheets">
                {{sheet.name}}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { IMediaFile } from 'hiddentreasures-js';
import { ref, watch } from 'vue';
import {sheetService, fileService} from '../services/hiddentreasures';
import SvgViewer from './SvgViewer.vue';

const props = defineProps<{
    songId: string
    transposition: string
}>();

const getSheets = async () => {
    const files = await fileService.childrenOf(props.songId)
    return files.filter(f => f.type === "sheetmusic")
}

const svg = ref(null as string | null)

const renderSheet = async () => {
    if (sheet.value) {
        const svgs = await sheetService.render({
            id: sheet.value.id,
            transposition: parseInt(props.transposition),
        })

        svg.value = svgs.join("\n")
    }
}

const sheets = ref(await getSheets())
const sheet = ref(null as IMediaFile | null)

const checkSheets = () => {
    if (sheets.value.length === 1) {
        sheet.value = sheets.value[0]
        renderSheet()
    }
}
checkSheets()

watch(() => props.songId, async (s) => {
    svg.value = null;
    sheet.value = null
    sheets.value = await getSheets();
    checkSheets()
})

</script>
