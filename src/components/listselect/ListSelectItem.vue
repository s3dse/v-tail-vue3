<template>
    <div
        :class="{ 'un-truncate': props.truncateItems }"
        class="listselectitem un-w-full un-h-full un-ps-2 un-py-2 hover:un-cursor-pointer
        un-text-gray-900 dark:un-text-gray-100 
        data-[state=checked]:un-bg-primary data-[state=checked]:un-text-gray-100 
        data-[highlighted]:un-text-gray-100 data-[highlighted]:un-bg-primary-400
        [&[data-state=checked][data-highlighted]]:un-bg-red-400"
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
