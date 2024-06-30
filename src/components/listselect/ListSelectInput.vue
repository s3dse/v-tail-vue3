<template>
    <label
        class="un-flex un-items-center un-bg-[field] dark:un-bg-moon-900 un-border un-border-gray-200 dark:un-border-moon-700 un-rounded"
    >
        <input
            v-model="searchTerm"
            class="un-w-full un-h-[2.5rem] un-rounded un-text-sm un-text-gray-900 dark:un-text-gray-100 un-outline-none un-pl-2 un-bg-[field] dark:un-bg-moon-900"
            :class="props.inputClasses"
            ref="searchInput"
            v-bind:placeholder="inputPlaceholder"
        />
        <div
            v-if="searchTerm"
            class="un-shrink-0 i-tabler-backspace un-block un-text-2xl un-text-gray-500! hover:un-cursor-pointer"
            ref="clearSearchButton"
            @click.prevent="searchTerm = ''"
        ></div>
        <div v-busy="optionsLoading">
            <span
                class="un-shrink-0 listselect--dropdown-toggle i-tabler-chevron-down un-block un-text-2xl un-text-gray-500! un-mr-2"
                @click.prevent="toggleOpen"
                ref="dropdownToggle"
            ></span>
        </div>
    </label>
</template>
<script setup>
const props = defineProps({
    inputClasses: String,
    optionsLoading: Boolean,
    inputPlaceholder: String,
    toggleOpen: Function
});
const searchTerm = defineModel('searchTerm', { type: String, default: null });
</script>
