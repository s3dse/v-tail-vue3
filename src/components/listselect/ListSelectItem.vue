<template>
    <div
        v-if="isSelected(option)"
        :class="{ 'un-truncate': props.truncateItems }"
        class="un-w-full un-h-full un-ps-2 un-py-2 un-bg-primary un-text-gray-100 hover:un-cursor-pointer hover:un-text-gray-100 hover:un-bg-red-400"
    >
        {{ props.labelFn(option) }}
    </div>
    <div
        v-else
        :class="{ 'un-truncate': props.truncateItems }"
        class="un-w-full un-h-full un-ps-2 un-py-2 hover:un-cursor-pointer un-text-gray-900 dark:un-text-gray-100 hover:un-text-gray-100 hover:un-bg-primary-400"
    >
        {{ props.labelFn(option) }}
    </div>
</template>
<script setup>

const props = defineProps({
    option: Object,
    isSelected: Function,
    labelFn: Function,
    truncateItems: {type: Boolean, default: false},
});
</script>
