<template>
    <div
        ref="listExcess"
        class="absolute left-0 right-0 ml-auto mr-auto min-w-10 w-fit z-999999"
    >
        <div
            v-if="listLengthExceeded"
            class="bg-red-400 border border-red-500 rounded-sm p-2 text-sm text-gray-100 transition-colors"
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
