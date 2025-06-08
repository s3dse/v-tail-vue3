<template>
    <div
        :class="{ 'truncate': props.truncateItems }"
        class="listselectitem w-full h-full ps-2 py-2 hover:cursor-pointer
        text-default
        data-[state=checked]:bg-primary data-[state=checked]:text-onprimary
        data-[highlighted]:text-onprimary data-[highlighted]:bg-primary-hover
        [&[data-state=checked][data-highlighted]]:bg-error"
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
