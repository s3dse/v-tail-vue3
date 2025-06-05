<template>
    <div
        :class="{ 'truncate': props.truncateItems }"
        class="listselectitem w-full h-full ps-2 py-2 hover:cursor-pointer
        text-gray-900 dark:text-gray-100 
        data-[state=checked]:bg-primary data-[state=checked]:text-gray-100 
        data-[highlighted]:text-gray-100 data-[highlighted]:bg-primary-400
        [&[data-state=checked][data-highlighted]]:bg-red-400"
    >
        {{ props.labelFn(option) }}
    </div>
</template>
<script setup>

const props = defineProps({
    option: Object,
    labelFn: Function,
    truncateItems: {type: Boolean, default: false},
});
</script>
