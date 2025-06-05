<template>
    <!-- <div class="border-b border-gray-200 dark:border-moon-700"> -->
        <ul class="flex px-2 border-b border-gray-200 dark:border-moon-700 w-full">
            <tab-component 
                class="data-[active=true]:bg-white 
                data-[active=true]:border-b-transparent 
                dark:data-[active=true]:bg-moon-800 
                dark:data-[active=true]:border-b-transparent
                dark:data-[active=true]:text-gray-100
                -mb-px py-3 px-4 inline-flex items-center gap-x-2 
                bg-gray-50 text-sm font-medium text-center 
                border 
                data-[active=false]:border-t-transparent
                data-[active=false]:border-l-transparent
                data-[active=false]:border-r-transparent
                hover:data-[active=false]:border-gray-200 
                dark:hover:data-[active=false]:border-moon-700 
                text-gray-500 rounded-t hover:text-gray-700 dark:hover:text-gray-300
                disabled:opacity-50 disabled:pointer-events-none 
                dark:bg-moon-900 dark:border-moon-700 dark:text-gray-400 
                dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                v-for="(tab, index) in tabs" :key="tab" :title="tabLabel(tab)" :help="tab.help" @click="selectTab(index)" :data-active="index===tabIndex"></tab-component>
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