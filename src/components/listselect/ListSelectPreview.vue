<template>
    <div class="font-semibold uppercase text-slate-500 text-sm py-2">
        {{ props.selectionTextFn(selectedOptions.length) }}:
    </div>
    <ul class="flex flex-wrap gap-1 max-w-100">
        <li
            v-for="(option, index) in selectedOptions"
            :key="`selected-option-${index}`"
            class="px-2 bg-gray-100 dark:bg-moon-700 border-1 border-gray-400 dark:border-moon-600 rounded text-gray-900 dark:text-gray-100 flex items-center gap-2 w-fit"
        >
            <span>
                {{ props.labelFn(option) }}
            </span>
            <span class="hover:bg-gray-400 dark:hover:bg-moon-600 rounded">
                <span
                    class="block i-tabler-x text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
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