<script setup>
import { computed, toValue, toRef,ref, watch } from 'vue'
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
    optionSize: { type: Number, default: 39 },
    selectionTextFn: { type: Function, default: count => `${count} items selected` },
    maxSelectionLength: { type: Number, default: 2 },
    maxSelectionLengthTextFn: {
        type: Function,
        default: limit => `You can only select ${limit} items`
    },
    searchOptionsTextFn: { type: Function, default: () => 'Search items...' },
    itemNameTextFn: { type: Function, default: count => (count !== 1 ? 'items' : 'item') },
    searchFn: { type: Function, required: false },
    dropDownZIndex: { type: Number, default: 9999 }
})

const selectedOptions = defineModel({
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
            return props.modelValue
        } else {
            return props.modelValue.length ? props.modelValue[0] : null
        }
    }
})

const open = ref(false)
const toggleOpen = () => {
    open.value = !open.value
}

const searchTerm = ref('')
watch(searchTerm, newVal => {
    if (newVal.length > 0) {
        open.value = true
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

const listLengthExceeded = ref(false)
const select = option => {
    if (props.multiple) {
        if (isSelected(option)) {
            selectedOptions.value = selectedOptions.value.filter(
                selectedOption => selectedOption.id !== option.id
            )
        } else if (selectedOptions.value.length < props.maxSelectionLength) {
            selectedOptions.value = [...selectedOptions.value, toRef(option)].map(toValue)
        } else {
            selectedOptions.value = selectedOptions.value.slice()
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
        class="un-flex un-flex-col un-text-nowrap un-relative"
        v-model="selectedOptions"
        selection-behavior="toggle"
        :multiple="props.multiple"
        as="div"
        :by="props.trackBy"
        v-on-click-outside="onClickOutsideHandler"
    >
        <ListboxFilter v-model="searchTerm" @keydown.esc="open = false" asChild>
            <ListSelectInput
                :inputClasses="props.inputClasses"
                :optionsLoading="props.optionsLoading"
                :inputPlaceholder="$inputPlaceholder"
                :toggleOpen="toggleOpen"
            />
        </ListboxFilter>
        <div v-if="open" 
            class="un-min-w-[18.75rem] un-w-fit un-absolute un-z-10 un-mt-[41px] un-bg-white dark:un-bg-moon-900" 
            :class="props.dropdownClasses"
            :style="{'z-index': props.dropDownZIndex }">
            <ScrollAreaRoot :scrollHideDelay="50" class="un-h-98 un-overflow-hidden">
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
                                class="listselect__option un-flex un-items-center un-justify-start un-w-full un-min-h-[38px] un-max-h-[37px] p-0"
                                @click.stop.prevent="select(option)"
                            >
                                <slot name="option" :option="option">
                                    <ListSelectItem
                                        :option="option"
                                        :isSelected="isSelected"
                                        :labelFn="props.labelFn"
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
                        @remove-option="select"
                    ></ListSelectPreview>
                </slot>
            </div>
        </div>
    </ListboxRoot>
</template>
