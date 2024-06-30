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
    trackBy: { type: String, default: 'id' },
    multiple: { type: Boolean, default: true },
    optionsLoading: { type: Boolean, default: false },
    inputClasses: { type: String, default: 'focus:placeholder-transparent' },
    dropdownClasses: { type: String, default: '' },
    optionSize: { type: Number, default: 40 },
    selectionTextFn: { type: Function, default: count => `${count} items selected` },
    maxSelectionLength: { type: Number, default: 2 },
    maxSelectionLengthTextFn: {
        type: Function,
        default: limit => `You can only select ${limit} items`
    },
    searchOptionsTextFn: { type: Function, default: () => 'Search items...' },
    itemNameTextFn: { type: Function, default: count => (count !== 1 ? 'items' : 'item') }
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
            return props.searchOptionsTextFn()
        }
    } else if (selectedOptions.value.length === 0) {
        return props.searchOptionsTextFn()
    } else {
        return `${selectedOptions.value.length} ${props.itemNameTextFn(
            selectedOptions.value.length
        )}`
    }
})

const removeItem = index => {
    const newValue = [...selectedOptions.value]
    newValue.splice(index, 1)
    selectedOptions.value = newValue
}

const delay = (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const listExcess = ref(null)
const listLengthExceeded = ref(false)
const select = option => {
    if (props.multiple) {
        if (isSelected(option)) {
            selectedOptions.value = selectedOptions.value.filter(
                selectedOption => selectedOption.id !== option.id
            )
            return
        } else if (selectedOptions.value.length < props.maxSelectionLength) {
            selectedOptions.value = [...selectedOptions.value, option]
        } else {
            selectedOptions.value = [...selectedOptions.value]
            listLengthExceeded.value = true
            delay().then(() => {
                listLengthExceeded.value = false
            })
        }
    } else {
        if (isSelected(option)) {
            selectedOptions.value = []
        } else {
            selectedOptions.value = [option]
            open.value = false
        }
    }
}

const showFooter = computed(() => props.multiple && open.value && selectedOptions.value.length)
</script>

<template>
    <ListboxRoot
        class="un-flex un-flex-col un-text-nowrap"
        v-model="selectedOptions"
        selection-behavior="toggle"
        :multiple="props.multiple"
        as="div"
        :by="props.trackBy"
        v-on-click-outside="onClickOutsideHandler"
    >
        <ListboxFilter v-model="searchTerm" asChild>
            <label
                class="un-flex un-items-center un-bg-[field] dark:un-bg-moon-900 un-border un-border-gray-200 dark:un-border-moon-700 un-rounded"
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
        <div>
            <ScrollAreaRoot :scrollHideDelay="50" class="un-h-100 un-overflow-hidden">
                <slot name="list-excess" v-if="listLengthExceeded">
                    <div
                        ref="listExcess"
                        class="un-absolute un-left-0 un-right-0 un-ml-auto un-mr-auto un-min-w-10 un-w-fit un-z-999999"
                    >
                        <div
                            v-if="listLengthExceeded"
                            class="un-bg-red-400 un-border un-border-red-500 un-rounded-sm un-p-2 un-text-gray-100 un-transition-colors"
                        >
                            {{ props.maxSelectionLengthTextFn(props.maxSelectionLength) }}
                        </div>
                    </div>
                </slot>
                <ScrollAreaViewport
                    v-if="open"
                    class="un-w-full un-border-t un-border-l un-border-r un-border-gray-200 dark:un-border-moon-700 un-rounded-t un-h-full"
                    :class="{ 'un-border-b un-rounded-b': !showFooter }"
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
                            <ListboxItem
                                :value="option"
                                class="listselect__option un-flex un-items-center un-justify-start un-w-full un-min-h-[38px] un-max-h-[38px] p-0"
                                @click.stop.prevent="select(option)"
                            >
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
            <div
                class="un-border un-border-gray-200 un-rounded-b dark:un-border-moon-700 un-min-h-25 un-max-h-fit un-p-2"
                v-if="showFooter"
            >
                <slot name="footer" :selection="{ selectedOptions }">
                    <div class="un-font-semibold un-uppercase un-text-slate-500 un-text-sm un-py-2">
                        {{ props.selectionTextFn(selectedOptions.length) }}:
                    </div>
                    <ul class="un-flex un-flex-wrap un-gap-2">
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
                                    @click="removeItem(index)"
                                ></span>
                            </span>
                        </li>
                    </ul>
                </slot>
            </div>
        </div>
    </ListboxRoot>
</template>
