<script setup>
import { computed, ref } from 'vue'
import {
    ListboxContent,
    ListboxFilter,
    ListboxItem,
    ListboxRoot,
    ListboxVirtualizer
} from 'radix-vue'

const props = defineProps({
    options: { type: Array, default: () => [] },
    inputPlaceholder: { type: String },
    labelFn: { type: Function, default: o => o.label },
    multiple: { type: Boolean, default: true },
    optionsLoading: { type: Boolean, default: false },
})

const selectedOptions = defineModel('selection', {
    type: Array,
    default: () => [],
    set(value) {
        if (props.multiple) {
            return value
        } else {
            return value ? [value] : []
        }
    },
    get() {
        if (props.multiple) {
            return props.selection
        } else {
            return props.selection.length ? props.selection[0] : null
        }
    }
})

const open = ref(false)
const toggleOpen = () => {
    open.value = !open.value
}
const searchTerm = ref('')
const isSelected = option => {
    if (props.multiple) {
        return selectedOptions.value.map(selectedOption => selectedOption.id).includes(option.id)
    } else {
        return selectedOptions.value && selectedOptions.value.id === option.id
    }
}

const filteredOptions = computed(() =>
    searchTerm.value === ''
        ? props.options
        : props.options.filter(option => {
              return props.labelFn(option).toLowerCase().includes(searchTerm.value.toLowerCase())
          })
)

const $inputPlaceholder = computed(() => {
    if (props.inputPlaceholder) {
        return props.inputPlaceholder
    } else if (!props.multiple) {
        if (selectedOptions.value) {
            return props.labelFn(selectedOptions.value)
        } else {
            return 'Search items...'
        }
    } else if (selectedOptions.value.length === 0) {
        return 'Search items...'
    } else if (selectedOptions.value.length > 1) {
        return `${selectedOptions.value.length} items`
    } else {
        return `${selectedOptions.value.length} item`
    }
})
</script>

<template>
    <ListboxRoot
        class="un-flex un-flex-col un-text-nowrap un-w-fit"
        v-model="selectedOptions"
        selection-behavior="toggle"
        :multiple="props.multiple"
    >
        <ListboxFilter v-model="searchTerm" asChild>
            <label
                class="un-flex un-items-center un-bg-[field] dark:un-bg-moon-900 un-border dark:un-border-moon-700 un-rounded"
            >
                <input
                    v-model="searchTerm"
                    class="un-w-full un-h-[2.31rem] un-rounded un-text-sm un-outline-none un-pl-2 un-placeholder-transparent un-bg-[field] dark:un-bg-moon-900"
                    ref="searchInput"
                    :placeholder="$inputPlaceholder"
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
        </ListboxFilter>
        <ListboxContent v-if="open" class="un-h-50 un-overflow-auto un-border un-border-gray-200 dark:un-border-moon-700">
            <ListboxVirtualizer
                v-slot="{ option }"
                :options="filteredOptions"
                :textContent="props.labelFn"
                :estimateSize="40"
                class=""
            >
                <ListboxItem :value="option" class="un-flex un-justify-start un-w-full">
                    <div
                        v-if="isSelected(option)"
                        class="un-w-full un-h-full un-ps-2 un-py-2 un-h-[40px] un-bg-gray-200 un-text-gray-900 dark:un-text-gray-100 dark:un-bg-moon-600 hover:un-cursor-pointer hover:un-text-gray-100 hover:un-bg-red-400"
                    >
                        {{ props.labelFn(option) }}
                    </div>
                    <div
                        v-else
                        class="un-w-full un-h-full un-ps-2 un-py-2 un-h-[40px] hover:un-cursor-pointer un-text-gray-900 dark:un-text-gray-100 hover:un-text-gray-100 hover:un-bg-navy-400"
                    >
                        {{ props.labelFn(option) }}
                    </div>
                </ListboxItem>
            </ListboxVirtualizer>
        </ListboxContent>
    </ListboxRoot>
</template>
