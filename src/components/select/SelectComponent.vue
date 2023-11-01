<script setup>
import {
    SelectContent,
    SelectGroup,
    SelectArrow,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectLabel,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport
} from 'radix-vue'
import { toRefs, ref, computed } from 'vue'
import { getClass as dispatchClass } from '@/utils/css-class-dispatch.js'

const classes = {
    trigger:
        `un-inline-flex un-items-center un-justify-between un-gap-2 un-min-w-[10rem] 
        un-bg-white dark:un-bg-moon-900 un-border un-border-gray-200 dark:un-border-moon-700 
        un-h-[2.375rem] un-rounded un-text-gray-900 dark:un-text-gray-100 un-px-3`,
    content: `un-bg-white dark:un-bg-moon-800 un-rounded un-min-w-[11.25rem] 
        un-border un-border-gray-200 dark:un-border-moon-700
        un-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] un-z-130`,
    item: `un-text-gray-900 dark:un-text-gray-100 un-leading-none un-flex un-items-center un-pl-8
        un-outline-none un-select-none un-py-1 data-[disabled]:un-cursor-not-allowed hover:un-bg-gray-200 dark:hover:un-bg-moon-600`
}

const props = defineProps({
    classes: {
        type: Object,
        default: null
    },
    options: {
        type: Array,
        required: true
    },
    labelKey: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Select option'
    },
    modelValue: {
        type: [String, Boolean, Number, Object],
        required: false
    }
})
const emit = defineEmits(['update:modelValue'])
const { classes: propsClasses, options, labelKey } = toRefs(props)
const getClass = dispatchClass(propsClasses.value, classes)

const getOptionValue = option => (labelKey.value ? option[labelKey.value] : option)
const getOption = value => props.labelKey !== null ? props.options.find(o => o[props.labelKey] === value) : value
const selected = computed({
    get: () => props.labelKey !== null ? props.modelValue[props.labelKey] : props.modelValue,
    set: (value) => emit('update:modelValue', getOption(value))
})
</script>

<template>
    <SelectRoot v-model="selected">
        <SelectTrigger :class="getClass('trigger')" v-bind="$attrs">
            <SelectValue :placeholder="placeholder">
                <slot name="triggerLabel">
                    <span>{{ selected }}</span>
                </slot>
            </SelectValue>
            <span class="i-tabler-chevron-down un-font-light un-text-gray-400 hover:un-text-gray-800 dark:hover:un-text-gray-100 un-text-2xl un-block"></span>
        </SelectTrigger>

        <SelectPortal>
            <SelectContent :class="getClass('content')" :side-offset="5">
                <SelectScrollUpButton class="un-flex un-items-center un-justify-center">
                    <span
                        class="i-tabler-chevron-up un-block un-text-gray-900 dark:un-text-gray-100"
                    ></span>
                </SelectScrollUpButton>
                <SelectViewport class="un-p-3">
                    <SelectGroup>
                        <SelectItem
                            v-for="(option, index) in options"
                            :key="index"
                            :value="getOptionValue(option)"
                            :class="getClass('item')"
                        >
                            <SelectItemIndicator
                                class="un-absolute un-left-[1rem] un-w-[1rem] un-inline-flex un-items-center un-justify-center"
                            >
                                <span
                                    class="i-tabler-check un-block un-text-gray-900 dark:un-text-gray-100"
                                ></span>
                            </SelectItemIndicator>
                            <SelectItemText>{{ getOptionValue(option) }}</SelectItemText>
                        </SelectItem>
                    </SelectGroup>
                </SelectViewport>
                <SelectScrollDownButton class="un-flex un-items-center un-justify-center">
                    <span
                        class="i-tabler-chevron-down un-block un-text-gray-900 dark:un-text-gray-100"
                    ></span>
                </SelectScrollDownButton>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
