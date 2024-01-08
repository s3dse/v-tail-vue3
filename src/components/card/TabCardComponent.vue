<template>
    <div class="un-card">
        <div class="un-pt-3 dark:un-bg-moon-900 un-bg-gray-50">
            <tabs-component @update:current-tab-index="selectTab" :tabs="tabs">
            </tabs-component>
        </div>
        <component :is="component" v-bind="componentProps"></component>
    </div>
</template>
<script setup>
import TabsComponent from '../tabs/TabsComponent.vue'
import { ref, computed } from 'vue'
const props = defineProps({
    currentTabIndex: {
        type: Number,
        default: 0
    },
    tabs: {
        type: Array,
        default: () => []
    }
})
const component = computed(() => props.tabs[tabIndex.value].component)
const componentProps = computed(() => props.tabs[tabIndex.value].props)
const tabIndex = ref(props.currentTabIndex)
const selectTab = index => {
    tabIndex.value = index
}
</script>
