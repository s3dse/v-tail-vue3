<template>
    <label
        class="flex items-center bg-[field] dark:bg-moon-900 border border-gray-200 dark:border-moon-700 rounded"
    >
        <input
            v-model="searchTerm"
            class="w-full h-[2.31rem] rounded text-sm text-gray-900 dark:text-gray-100 outline-none pl-2 bg-[field] dark:bg-moon-900"
            :class="props.inputClasses"
            ref="searchInput"
            v-bind:placeholder="inputPlaceholder"
        />
        <div
            v-if="searchTerm"
            class="shrink-0 i-tabler-backspace block text-2xl text-gray-500! hover:cursor-pointer"
            ref="clearSearchButton"
            @click.prevent="searchTerm = ''"
        ></div>
        <div v-busy="optionsLoading">
            <span
                class="shrink-0 listselect--dropdown-toggle i-tabler-chevron-down block text-2xl text-gray-500! mr-2"
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
