<template>
    <div :class="{ 'un-truncate': props.truncateLabel }"
        class="un-flex un-flex-gap-0 un-items-center un-justify-start un-w-full 
        un-min-h-[40px] un-h-40px un-max-h-[40px]
        un-border-0 un-ps-2
        data-[highlighted]:un-bg-navy-400 data-[highlighted]:un-text-gray-100
        data-[state=checked]:[&:not([data-highlighted])]:un-bg-navy-300/80 data-[state=checked]:[&:not([data-highlighted])]:un-text-gray-100
        data-[state=checked]:[&[data-highlighted]]:un-bg-red-400! data-[state=checked]:[&[data-highlighted]]:un-text-gray-100">
    {{ props.label }}
    </div>
</template>
<script setup>

const props = defineProps({
    label: String,
    isSelected: Boolean,
    truncateLabel: {type: Boolean, default: false},
});
</script>
