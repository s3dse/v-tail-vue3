<template>
    <div class="un-font-semibold un-uppercase un-text-slate-500 un-text-sm un-py-2">
        {{ props.selectionTextFn(selectedOptions.length) }}:
    </div>
    <ul class="un-flex un-flex-wrap un-gap-1 un-max-w-100">
        <li
            v-for="(option, index) in selectedOptions"
            :key="`selected-option-${index}`"
            class="un-px-2 un-bg-gray-100 dark:un-bg-moon-700 un-border-1 un-border-gray-400 dark:un-border-moon-600 un-rounded un-text-gray-900 dark:un-text-gray-100 un-flex un-items-center un-gap-2 un-w-fit"
        >
            <span>
                {{ props.labelFn(option) }}
            </span>
            <span class="hover:un-bg-gray-400 dark:hover:un-bg-moon-600 un-rounded">
                <span
                    class="un-block i-tabler-x un-text-gray-500 hover:un-text-gray-900 dark:hover:un-text-gray-100"
                    :class="`remove-option-${index}`"
                    @click="emit('removeOption', index)"
                ></span>
            </span>
        </li>
    </ul>
</template>
<script setup>
const props = defineProps({
    selectedOptions: Array,
    labelFn: Function,
    selectionTextFn: Function,
});
const emit = defineEmits(['removeOption']);
</script>