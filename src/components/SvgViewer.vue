<template>
    <div id="svg-viewer" v-html="svg">

    </div>
</template>
<script lang="ts" setup>
import { watch, onMounted, onUpdated } from 'vue';


const props = defineProps<{
    svg: string
}>()

const fixElements = () => {
    const els = document.getElementById("svg-viewer")?.children

    if (!els) return

    for (let i = 0; i < els.length; i++) {
        const el = els.item(i) as HTMLElement
        el.removeAttribute("width")
        el.removeAttribute("height")
    }
}

onMounted(() => setTimeout(fixElements, 10))

watch(() => props.svg, () => setTimeout(fixElements, 10))
</script>