<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { getClass as dispatchClass } from '@/utils/css-class-dispatch.js'
import { toRefs, ref } from 'vue';

const defaultClasses = {
    trigger: 'text-gray-900 dark:text-gray-100',
    overlay: 'fixed inset-0 bg-black dark:bg-moon-900 bg-opacity-25 dark:bg-opacity-85 z-499 backdrop-filter backdrop-blur-sm',
    title: `bg-white dark:bg-moon-700 text-gray-900 dark:text-gray-100 text-xl font-semibold leading-6 
        border-b border-b-gray-200 dark:border-b-moon-600 p-4 rounded-t`,
    content: `fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[28rem] translate-x-[-50%] translate-y-[-50%]
        rounded bg-gray-50 dark:bg-moon-800
        shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-500
        border border-gray-200 dark:border-moon-600`,
    description: 'text-gray-900 dark:text-gray-100 p-4',
    confirmButton: `bg-primary hover:bg-primary-600 dark:hover:bg-primary-400  text-gray-100 
                        disabled:bg-gray-400 disabled:active:text-gray-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-100
                        rounded px-4 h-[2.375rem]`,
    cancelButton: `border border-slate-200 dark:border-moon-700 
                    hover:border-slate-100 dark:hover:border-moon-600 
                    bg-slate-50 dark:bg-moon-800 hover:bg-gray-200 dark:hover:bg-moon-700 dark:text-gray-100 
                    rounded px-4 h-[2.375rem]`
}


const props = defineProps({
    classes: {
        type: Object,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    preConfirm: {
        type: Function,
        default() {
            return true
        }
    },
    confirmDisabled: {
        type: Boolean,
        default: false
    }
})

const { classes: propsClasses, preConfirm } = toRefs(props)

const getClass = dispatchClass(defaultClasses, propsClasses)
const emit = defineEmits(['confirm', 'cancel'])
const open = ref(false)

const confirm = () => {
    if (preConfirm.value()) {
        emit('confirm')
        open.value = false
    }
}
const cancel = () => emit('cancel')
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger :class="getClass('trigger')">
        <slot name="trigger">
            <button class="bg-primary hover:bg-primary-600 dark:hover:bg-primary-400  text-gray-100 rounded px-4 h-[2.375rem]">Settings</button>
        </slot>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay :class="getClass('overlay')" />
      <DialogContent :class="getClass('content')">
        <DialogTitle :class="getClass('title')">{{ title }}</DialogTitle>
        <DialogDescription :class="getClass('description')">{{ description }}</DialogDescription>
        <slot name="content" v-bind="{ open }">
        </slot>
        <div class="flex gap-4 justify-end p-3">
            <DialogClose>
                <slot name="cancelTrigger">
                    <button @click="cancel" :class="getClass('cancelButton')">
                        <slot name="cancelLabel">
                            <span>Cancel</span>
                        </slot>
                    </button>
                </slot>
            </DialogClose>
            <slot name="confirmTrigger">
                <button 
                    @click="confirm" 
                    :disabled="confirmDisabled" 
                    :class="getClass('confirmButton')"
                >
                    <slot name="confirmLabel">
                        <span>OK</span>
                    </slot>
                </button>
            </slot>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>