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
    trigger: 'un-text-gray-900 dark:un-text-gray-100',
    overlay: 'un-fixed un-inset-0 un-bg-black dark:un-bg-moon-900 un-bg-opacity-25 dark:un-bg-opacity-85 un-z-499 un-backdrop-filter un-backdrop-blur-sm',
    title: `un-bg-white dark:un-bg-moon-700 un-text-gray-900 dark:un-text-gray-100 un-text-xl un-font-semibold un-leading-6 
        un-border-b un-border-b-gray-200 dark:un-border-b-moon-600 un-p-4 un-rounded-t`,
    content: `un-fixed un-top-[50%] un-left-[50%] un-max-h-[85vh] un-w-[90vw] un-max-w-[28rem] un-translate-x-[-50%] un-translate-y-[-50%]
        un-rounded un-bg-gray-50 dark:un-bg-moon-800
        un-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:un-outline-none un-z-500
        un-border un-border-gray-200 dark:un-border-moon-600`,
    description: 'un-text-gray-900 dark:un-text-gray-100 un-p-4',
    confirmButton: `un-bg-primary hover:un-bg-primary-600 dark:hover:un-bg-primary-400  un-text-gray-100 
                        disabled:un-bg-gray-400 disabled:active:un-text-gray-100 disabled:hover:un-bg-gray-400 disabled:hover:un-text-gray-100
                        un-rounded un-px-4 un-h-[2.375rem]`,
    cancelButton: `un-border un-border-slate-200 dark:un-border-moon-700 
                    hover:un-border-slate-100 dark:hover:un-border-moon-600 
                    un-bg-slate-50 dark:un-bg-moon-800 hover:un-bg-gray-200 dark:hover:un-bg-moon-700 dark:un-text-gray-100 
                    un-rounded un-px-4 un-h-[2.375rem]`
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
            <button class="un-bg-primary hover:un-bg-primary-600 dark:hover:un-bg-primary-400  un-text-gray-100 un-rounded un-px-4 un-h-[2.375rem]">Settings</button>
        </slot>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay :class="getClass('overlay')" />
      <DialogContent :class="getClass('content')">
        <DialogTitle :class="getClass('title')">{{ title }}</DialogTitle>
        <DialogDescription :class="getClass('description')">{{ description }}</DialogDescription>
        <slot name="content" v-bind="{ open }">
        </slot>
        <div class="un-flex un-gap-4 un-justify-end un-p-3">
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