<template>
    <div class="flex items-center">
        <slot name="leftLabel" v-bind="{ isChecked }">
            <span v-if="leftLabel" class="text-gray-900 dark:text-gray-100">{{ leftLabel }}</span>
        </slot>
        <label
            class="relative inline-flex items-center cursor-pointer"
            tabindex="0"
            @keydown.space.prevent="isChecked = !isChecked"
            @keydown.left.prevent="isChecked = false"
            @keydown.right.prevent="isChecked = true"
        >
            <input type="checkbox" class="sr-only" v-model="isChecked" />
            <div
                class="w-10 h-6 bg-gray-200 dark:bg-moon-900 dark:border dark:border-moon-700 rounded-full shadow-inner data-[checked=true]:bg-primary-500 dark:data-[checked=true]:bg-primary-500 transition duration-200 ease-in-out"
                :data-checked="isChecked"
            ></div>
            <div
                class="absolute left-0.5 w-5 h-5 bg-white dark:bg-gray-100 text-gray-900 dark:bg-gray-100 rounded-full shadow transform transition-transform duration-200 ease-in-out"
                :class="{ 'translate-x-4.05': isChecked }"
            >
                <slot name="toggle-icon" v-bind="{ isChecked }">
                    <span :data-checked="isChecked" class="flex mx-auto mt-0.5"></span>
                </slot>
            </div>
        </label>
        <slot name="rightLabel" v-bind="{ isChecked }">
            <span v-if="rightLabel" class="text-gray-900 dark:text-gray-100">{{ rightLabel }}</span>
        </slot>
    </div>
</template>
<script setup>
const isChecked = defineModel({
    type: Boolean,
    default: false
})
const props = defineProps({
    leftLabel: {
        type: String,
        required: false
    },
    rightLabel: {
        type: String,
        required: false
    }
})
</script>
