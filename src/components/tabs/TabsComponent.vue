<template>
    <!-- <div class="un-border-b un-border-gray-200 dark:un-border-moon-700"> -->
        <ul class="un-flex un-px-2 un-border-b">
            <tab-component 
                class="data-[active=true]:un-bg-white 
                data-[active=true]:un-border-b-transparent 
                dark:data-[active=true]:un-bg-moon-800 
                dark:data-[active=true]:un-border-b-transparent
                dark:data-[active=true]:un-text-gray-100
                -un-mb-px un-py-3 un-px-4 un-inline-flex un-items-center un-gap-x-2 
                un-bg-gray-50 un-text-sm un-font-medium un-text-center 
                un-border 
                data-[active=false]:un-border-t-transparent
                data-[active=false]:un-border-l-transparent
                data-[active=false]:un-border-r-transparent
                hover:data-[active=false]:un-border-gray-200 
                dark:hover:data-[active=false]:un-border-moon-700 
                un-text-gray-500 un-rounded-t hover:un-text-gray-700 dark:hover:un-text-gray-300
                disabled:un-opacity-50 disabled:un-pointer-events-none 
                dark:un-bg-moon-900 dark:un-border-moon-700 dark:un-text-gray-400 
                dark:focus:un-outline-none dark:focus:un-ring-1 dark:focus:un-ring-gray-600"
                v-for="(tab, index) in tabs" :key="tab" :title="tabLabel(tab)" @click="selectTab(index)" :data-active="index===tabIndex"></tab-component>
        </ul>
    <!-- </div> -->
</template>
<script setup>
import { ref } from 'vue'
import TabComponent from './TabComponent.vue';
const props = defineProps({
    tabs: {
        type: Array,
        default: () => []
    },
    currentTabIndex: {
        type: Number,
        default: 0
    }
})
const tabLabel = tab => tab.label ? tab.label : `tab-${props.tabs.indexOf(tab)}`
const tabIndex = ref(props.currentTabIndex)
const emit = defineEmits(['update:currentTabIndex'])
const selectTab = index => {
    tabIndex.value = index
    emit('update:currentTabIndex', index)
}
</script>