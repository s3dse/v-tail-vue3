<script setup>
import { computed, toValue, ref, watch, useTemplateRef } from 'vue'
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
} from 'reka-ui'
import { vOnClickOutside } from '@vueuse/components'
import { onClickOutside } from '@vueuse/core'
import ListSelectItem from './ListSelectItem.vue'
import ListSelectPreview from './ListSelectPreview.vue'
import ListSelectExcessIndicator from './ListSelectExcessIndicator.vue'
import ListSelectInput from './ListSelectInput.vue'
import delay from '@/utils/delay.js'

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
    maxSelectionLength: { type: Number, default: 10 },
    maxSelectionLengthTextFn: {
        type: Function,
        default: limit => `You can only select ${limit} items`
    },
    selectionExceededInfoDuration: { type: Number, default: 1300 },
    searchOptionsTextFn: { type: Function, default: () => 'Search items...' },
    itemNameTextFn: { type: Function, default: count => (count !== 1 ? 'items' : 'item') },
    searchFn: { type: Function, required: false },
    dropDownZIndex: { type: Number, default: 9999 },
    dropDownWidth: { type: String, default: '30rem' },
    truncateItems: { type: Boolean, default: false }
})

const listLengthExceeded = ref(false)

const preserveArray = (value, multiple) => {
    if (!Array.isArray(value)) {
        return value ? [value] : []
    } else {
        if (multiple) {
            return value
        } else {
            return value.slice(-1)
        }
    }
}

const handleListLengthExceeded = value => {
    listLengthExceeded.value = true
    delay(props.selectionExceededInfoDuration).then(() => {
        listLengthExceeded.value = false
    })
    return [...value].splice(0, props.maxSelectionLength)
}

const selectedOptions = defineModel({
    type: [Object, Array],
    get(value) {
        const val = toValue(value)
        return preserveArray(val, props.multiple)
    },
    set(newValue) {
        const value = preserveArray(newValue, props.multiple)
        if (props.multiple && value.length > props.maxSelectionLength) {
            return handleListLengthExceeded(value)
        } else {
            return value
        }
    }
})

const removeFromSelection = index => {
    if (props.multiple) {
        selectedOptions.value = selectedOptions.value.filter((_, idx) => idx !== index)
    } else {
        selectedOptions.value = null
    }
}

const open = ref(false)
const toggleOpen = () => {
    open.value = !open.value
}

const searchTerm = ref('')
watch(searchTerm, newVal => {
    if (newVal.length > 0 && !open.value) {
        open.value = true
    }
})

watch(open, newVal => {
    if (!newVal) {
        searchTerm.value = ''
    }
})

const searchInput = ref(null)
const clearSearchButton = ref(null)
const dropdownToggle = ref(null)

const close = () => {
    open.value = false
}

const listboxRootRef = useTemplateRef('listboxRootRef')

onClickOutside(listboxRootRef, close, {
    ignore: [searchInput, clearSearchButton, dropdownToggle],
    // eventFilter: e => {
    //     // Prevent closing when clicking inside the dropdown
    //     return !e.target.closest('.listselect__root')
    // }
})
// const onClickOutsideHandler = [close, { ignore: [dropdownToggle, searchInput, clearSearchButton] }]

const filteredOptions = computed(() =>
    searchTerm.value === ''
        ? props.options
        : props.options.filter(option => {
              return props.labelFn(option).toLowerCase().includes(searchTerm.value.toLowerCase())
          })
)

const getSingleSelectPlaceholder = () => {
    if (selectedOptions.value && selectedOptions.value.length === 1) {
        return props.labelFn(selectedOptions.value[0])
    } else {
        return props.searchOptionsTextFn()
    }
}
const getMultipleSelectPlaceholder = () => {
    if (selectedOptions.value?.length === 1) {
        return props.labelFn(selectedOptions.value[0])
    } else if (selectedOptions.value?.length === 0) {
        return props.searchOptionsTextFn()
    } else {
        return `${selectedOptions.value.length} ${props.itemNameTextFn(
            selectedOptions.value.length
        )}`
    }
}

const $inputPlaceholder = computed(() => {
    if (props.inputPlaceholder) {
        return props.inputPlaceholder
    } else if (!props.multiple) {
        return getSingleSelectPlaceholder()
    } else {
        return getMultipleSelectPlaceholder()
    }
})

const showFooter = computed(() => props.multiple && open.value && selectedOptions.value?.length)
</script>

<template>
    <!-- v-on-click-outside="onClickOutsideHandler" -->
    <ListboxRoot
        class="listselect__root un-flex un-flex-col un-text-nowrap un-relative"
        v-model="selectedOptions"
        :multiple="props.multiple"
        as="div"
        :by="props.trackBy"
        ref="listboxRootRef"
        @keydown.enter.prevent="() => {}"
    >
        <ListboxFilter v-model:searchTerm="searchTerm" @keydown.esc="close" asChild>
            <ListSelectInput
                :inputClasses="props.inputClasses"
                :optionsLoading="props.optionsLoading"
                :inputPlaceholder="$inputPlaceholder"
                :toggleOpen="toggleOpen"
            />
        </ListboxFilter>
        <div
            v-if="open"
            class="un-min-w-fit un-absolute un-z-10 un-top-[39px] un-left-0 un-bg-white dark:un-bg-moon-900 un-shadow-lg un-rounded"
            :class="props.dropdownClasses"
            :style="{ 'z-index': props.dropDownZIndex, width: props.dropDownWidth }"
        >
            <ScrollAreaRoot :scrollHideDelay="50" class="un-h-100 un-overflow-hidden">
                <slot name="list-excess" v-if="listLengthExceeded">
                    <ListSelectExcessIndicator
                        :listLengthExceeded="listLengthExceeded"
                        :maxSelectionLength="props.maxSelectionLength"
                        :maxSelectionLengthTextFn="props.maxSelectionLengthTextFn"
                    />
                </slot>
                <ScrollAreaViewport
                    class="un-w-full un-border-t un-border-l un-border-r un-border-gray-200 dark:un-border-moon-700 un-rounded-t un-h-full"
                    :class="{ 'un-border-b un-rounded-b': !showFooter }"
                    asChild
                >
                    <ListboxContent asChild>
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
                                asChild
                            >
                                <slot name="option" :option="option">
                                    <ListSelectItem
                                        :option="option"
                                        :labelFn="props.labelFn"
                                        :truncateItems="props.truncateItems"
                                    />
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
                        class="un-flex-1 un-w-full un-bg-slate-200 hover:un-bg-slate-300 dark:un-bg-moon-700 dark:hover:un-bg-moon-600 un-rounded-sm un-relative before:un-content-[''] before:un-absolute before:un-top-1/2 before:un-left-1/2"
                    />
                </ScrollAreaScrollbar>
                <ScrollAreaCorner />
            </ScrollAreaRoot>
            <div
                class="un-border un-border-gray-200 un-rounded-b dark:un-border-moon-700 un-min-h-25 un-max-h-fit un-p-2"
                v-if="showFooter"
            >
                <slot name="footer" :selection="{ selectedOptions }">
                    <ListSelectPreview
                        :selectedOptions="selectedOptions"
                        :labelFn="props.labelFn"
                        :selectionTextFn="props.selectionTextFn"
                        @remove-option="removeFromSelection"
                    ></ListSelectPreview>
                </slot>
            </div>
        </div>
    </ListboxRoot>
</template>
