<script setup>
import { computed, ref, watch } from 'vue'
import {
    ListboxContent,
    ListboxFilter,
    ListboxItem,
    ListboxRoot,
    ListboxVirtualizer,
    ScrollAreaCorner,
    ScrollAreaRoot,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport
} from 'radix-vue'
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
    options: { type: Array, default: () => [] },
    inputPlaceholder: { type: String },
    labelFn: { type: Function, default: o => o.label },
    multiple: { type: Boolean, default: true },
    optionsLoading: { type: Boolean, default: false },
    inputClasses: { type: String, default: 'focus:placeholder-transparent' },
    dropdownClasses: { type: String, default: '' },
    optionSize: { type: Number, default: 40 }
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
watch(searchTerm, (newVal, oldVal) => {
    if (newVal.length > 0 && oldVal.length === 0) {
        toggleOpen()
    }
})

const searchInput = ref(null)
const clearSearchButton = ref(null)
const dropdownToggle = ref(null)

const onClickOutsideHandler = [
    () => {
        open.value = false
    },
    { ignore: [dropdownToggle, searchInput, clearSearchButton] }
]

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
            class="un-flex un-flex-col un-text-nowrap"
            v-model="selectedOptions"
            selection-behavior="toggle"
            :multiple="props.multiple"
            as="div"
            v-on-click-outside="onClickOutsideHandler"
        >
            <ListboxFilter v-model="searchTerm" asChild>
                <label
                    class="un-flex un-items-center un-bg-[field] dark:un-bg-moon-900 un-border dark:un-border-moon-700 un-rounded"
                >
                    <input
                        v-model="searchTerm"
                        class="un-w-full un-h-[2.5rem] un-rounded un-text-sm un-text-gray-900 dark:un-text-gray-100 un-outline-none un-pl-2 un-bg-[field] dark:un-bg-moon-900"
                        :class="props.inputClasses"
                        ref="searchInput"
                        v-bind:placeholder="$inputPlaceholder"
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
            <ScrollAreaRoot :scrollHideDelay="50" class="un-h-100 un-overflow-hidden">
                <ScrollAreaViewport
                    v-if="open"
                    
                    class="un-w-full un-border un-border-gray-200 dark:un-border-moon-700 un-rounded un-h-full"
                    asChild
                >
                    <ListboxContent :class="props.dropdownClasses" asChild>
                        <ListboxVirtualizer
                            v-slot="{ option }"
                            :options="filteredOptions"
                            :textContent="props.labelFn"
                            :estimateSize="props.optionSize"
                            class=""
                        >
                            <ListboxItem :value="option" class="un-flex un-items-center un-justify-start un-w-full un-min-h-[38px] un-max-h-[38px] p-0">
                                <slot name="option" :option="option">
                                    <div
                                        v-if="isSelected(option)"
                                        class="un-w-full un-h-full un-ps-2 un-py-2 un-bg-navy-300/80 un-text-gray-100 dark:un-bg-moon-600 hover:un-cursor-pointer hover:un-text-gray-100 hover:un-bg-red-400"
                                    >
                                        {{ props.labelFn(option) }}
                                    </div>
                                    <div
                                        v-else
                                        class="un-w-full un-h-full un-ps-2 un-py-2 hover:un-cursor-pointer un-text-gray-900 dark:un-text-gray-100 hover:un-text-gray-100 hover:un-bg-navy-400"
                                    >
                                        {{ props.labelFn(option) }}
                                    </div>
                                </slot>
                            </ListboxItem>
                        </ListboxVirtualizer>
                    </ListboxContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar
                    class="un-flex un-select-none un-touch-none un-p-0.5 un-bg-inherit hover:un-bg-inherit data-[orientation=vertical]:un-w-3 data-[orientation=horizontal]:un-flex-col data-[orientation=horizontal]:un-h-3"
                    orientation="vertical"
                >
                    <ScrollAreaThumb
                        class="un-flex-1 un-w-full un-bg-slate-200 hover:un-bg-slate-300 dark:un-bg-moon-700 dark:hover:un-bg-moon-600 un-rounded-sm un-relative before:un-content-[''] before:un-absolute before:un-top-1/2 before:un-left-1/2 before:--un-translate-x-1/2 -before:-un-translate-y-1/2 --before:un-w-full --before:un-h-full --before:un-min-w-[44px] --before:un-min-h-[44px]"
                    />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner />
            </ScrollAreaRoot>
        </ListboxRoot>
</template>
