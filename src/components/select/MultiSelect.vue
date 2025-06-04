<template>
    <div
        v-click-outside="closeDropdown"
        @keydown.space="!open && toggleOpen()"
        @keydown.arrow-down="!open && toggleOpen()"
        @keydown.arrow-up="!open && toggleOpen()"
        @keydown.esc="closeDropdown"
        @keydown.tab="closeDropdown"
        tabindex="0"
    >
        <label
            class="selectcomponent__label un-flex un-items-center un-bg-[field] dark:un-bg-moon-900 un-border un-border-gray-200 dark:un-border-moon-700 un-rounded"
        >
            <input
                :value="modelText"
                readonly
                tabindex="-1"
                class="un-w-full un-h-[2.31rem] un-rounded un-text-gray-900 dark:un-text-gray-100 un-outline-none un-pl-2 un-bg-[field] dark:un-bg-moon-900 hover:un-cursor-pointer"
                :class="props.inputClasses"
            />
            <div>
                <span
                    class="un-shrink-0 i-tabler-chevron-down un-block un-text-2xl un-text-gray-500! un-mr-2"
                    @click.prevent="toggleOpen"
                    ref="dropdownToggle"
                ></span>
            </div>
        </label>
        <div class="un-relative">
            <div
                class="un-p-3 un-absolute un-top-[-2.31rem] un-right-auto un-bg-white dark:un-bg-moon-800 un-rounded un-min-w-[15.75rem] un-max-h-50rem un-overflow-auto un-scrollbar un-border un-border-gray-200 dark:un-border-moon-700 un-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] un-z-501"
                v-if="open"
            >
                <ul
                    ref="listRef"
                    role="listbox"
                    @keydown="onArrowKey"
                    aria-multiselectable="true"
                    :aria-activedescendant="'opion-' + idFunction(options[focusedIndex])"
                >
                    <li
                        v-for="(option, i) in options"
                        class="un-text-gray-900 dark:un-text-gray-100 un-leading-none un-flex un-items-center un-pl-8 un-outline-none un-select-none un-py-1 data-[disabled]:un-cursor-not-allowed hover:un-bg-gray-200 hover:dark:un-bg-moon-600 `"
                        :class="[focusedIndex === i ? 'un-bg-gray-200 dark:un-bg-moon-600' : '']"
                        :id="'option-' + idFunction(option)"
                        :key="idFunction(option)"
                        role="option"
                        @focus="focusedIndex = i"
                        :tabindex="i === focusedIndex ? 0 : -1"
                        @keydown.enter.prevent="toggleSelect(option)"
                        @click="toggleSelect(option)"
                        :aria-selected="isSelected(option)"
                    >
                        <div class="un-relative un-inline-flex un-items-center un-justify-center">
                            <span
                                :data-selected="isSelected(option)"
                                class="data-[selected=true]:un-block data-[selected=true]:i-tabler-check un-absolute un-left-[-1.75rem]"
                            ></span>
                            {{ labelFunction(option) }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, toRef, toValue, ref, useTemplateRef, onMounted } from 'vue'
import { useSmartMultiSelect } from './useSmartSelect'
import { useListKeyboardNavigation } from './useListKeyboardNavigation'
import { clickOutside } from '@/directives/click-outside'

const vClickOutside = clickOutside

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

const modelValue = defineModel({
    type: Array,
    default: () => [],
    required: true,
    get(value) {
        const val = toValue(value)
        return preserveArray(val, props.multiple)
    },
    set(newValue) {
        return preserveArray(newValue, props.multiple)
    }
})
const open = ref(false)

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    isDefaultOption: {
        type: Function,
        default: x => x.id === 'DEFAULT'
    },
    labelFunction: {
        type: Function,
        default: x => x.label
    },
    idFunction: {
        type: Function,
        default: x => x.id
    },
    multiple: {
        type: Boolean,
        default: true
    },
    placeholderFunction: {
        type: Function
    }
})

const options = toRef(props, 'options')

const modelText = computed(() => {
    const value = modelValue.value
    if (props.placeholderFunction) return props.placeholderFunction(value)
    return value.length === 1
        ? props.labelFunction(value[0])
        : `${value.length} selected`
})

const closeDropdown = () => {
    open.value = false
}

const handleEnter = event => {
    if (!open.value) {
        event.preventDefault()
        toggleOpen()
    }
}

const toggleOpen = () => {
    open.value = !open.value
    if (open.value) {
        resetFocus()
    }
}

const { toggleSelect, isSelected } = useSmartMultiSelect({
    modelValue,
    multiple: props.multiple,
    options,
    isDefaultOption: props.isDefaultOption,
    getId: props.idFunction,
    multiple: props.multiple
})

const listTemplateRef = useTemplateRef('listRef')

const { focusedIndex, onArrowKey, resetFocus } = useListKeyboardNavigation({
    itemsRef: options,
    listTemplateRef
})
</script>
