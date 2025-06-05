<script setup>
import {
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    SelectPortal,
    SelectRoot,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
    SelectViewport
} from 'reka-ui'
import { toRefs, ref, computed } from 'vue'
import { getClass as dispatchClass } from '@/utils/css-class-dispatch.js'

const classes = {
    trigger:
        `inline-flex items-center justify-between gap-2 min-w-[10rem] 
        bg-white dark:bg-moon-900 border border-gray-200 dark:border-moon-700 
        h-[2.375rem] rounded text-gray-900 dark:text-gray-100 px-3`,
    content: `bg-white dark:bg-moon-800 rounded min-w-[11.25rem] 
        border border-gray-200 dark:border-moon-700
        shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-501`,
    item: `text-gray-900 dark:text-gray-100 leading-none flex items-center pl-8
        outline-none select-none py-1 data-[disabled]:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-moon-600`
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
            <span class="i-tabler-chevron-down font-light text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 text-2xl block"></span>
        </SelectTrigger>

        <SelectPortal>
            <SelectContent :class="getClass('content')" :side-offset="5">
                <SelectScrollUpButton class="flex items-center justify-center">
                    <span
                        class="i-tabler-chevron-up block text-gray-900 dark:text-gray-100"
                    ></span>
                </SelectScrollUpButton>
                <SelectViewport class="p-3">
                    <SelectGroup>
                        <SelectItem
                            v-for="(option, index) in options"
                            :key="index"
                            :value="getOptionValue(option)"
                            :class="getClass('item')"
                        >
                            <SelectItemIndicator
                                class="absolute left-[1rem] w-[1rem] inline-flex items-center justify-center"
                            >
                                <span
                                    class="i-tabler-check block text-gray-900 dark:text-gray-100"
                                ></span>
                            </SelectItemIndicator>
                            <SelectItemText>{{ getOptionValue(option) }}</SelectItemText>
                        </SelectItem>
                    </SelectGroup>
                </SelectViewport>
                <SelectScrollDownButton class="flex items-center justify-center">
                    <span
                        class="i-tabler-chevron-down block text-gray-900 dark:text-gray-100"
                    ></span>
                </SelectScrollDownButton>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
