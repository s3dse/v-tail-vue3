<template>
    <div
        ref="listExcess"
        class="un-absolute un-left-0 un-right-0 un-ml-auto un-mr-auto un-min-w-10 un-w-fit un-z-999999"
    >
        <div
            v-if="listLengthExceeded"
            class="un-bg-red-400 un-border un-border-red-500 un-rounded-sm un-p-2 un-text-sm un-text-gray-100 un-transition-colors"
        >
            {{ props.maxSelectionLengthTextFn(props.maxSelectionLength) }}
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    listLengthExceeded: Boolean,
    maxSelectionLength: Number,
    maxSelectionLengthTextFn: Function,
});
</script>
