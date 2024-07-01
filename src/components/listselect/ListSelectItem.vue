<template>
    <div
        v-if="isSelected(option)"
        class="un-w-full un-h-full un-ps-2 un-py-2 un-bg-navy-300/80 un-text-gray-100 dark:un-bg-moon-600 hover:un-cursor-pointer hover:un-text-gray-100 hover:un-bg-red-400"
    >
        {{ props.labelFn(option) }}
    </div>
    <div
        v-else
        class="un-w-full un-h-full un-ps-2 un-py-2 hover:un-cursor-pointer un-text-gray-900 dark:un-text-gray-100 hover:un-text-gray-100 hover:un-bg-navy-400"
    >
        {{ props.labelFn(option) }}
    </div>
</template>
<script setup>

const props = defineProps({
    option: Object,
    isSelected: Function,
    labelFn: Function,
});
</script>
