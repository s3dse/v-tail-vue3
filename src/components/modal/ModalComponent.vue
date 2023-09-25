<template>
    <div class="">
        <component :is="toggleType" @click="openModal" :class="toggleClassList">
            {{ toggleText }}
        </component>
    </div>
    <Dialog as="div" :open="isOpen" @close="cancel" :class="dialogClassList" :unmount="unmount">
        <div name="backdrop" :class="backdropClassList" />
        <div class="un-fixed un-inset-0">
            <div class="un-flex un-min-h-full un-items-center un-justify-center un-text-center">
                <DialogPanel :class="dialogPanelClassList">
<<<<<<< HEAD
                    <div class="un-border-b un-bg-white">
=======
                    <div class="un-border-b un-bg-white dark:un-border-moon-700">
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
                        <DialogTitle as="div" :class="dialogTitleClassList">
                            {{ title }}
                        </DialogTitle>
                    </div>
                    <div :class="bodyClassList">
                        <slot name="content">
                            <div class="un-mt-2 un-px-4">
<<<<<<< HEAD
                                <p class="un-text-sm un-text-gray-500">
=======
                                <p class="un-text-sm un-text-gray-500 dark:text-gray-100">
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
                                    Lorem Ipsum Something Something
                                </p>
                            </div>
                        </slot>

                        <div :class="controlSectionClassList">
                            <slot name="controls">
                                <button
                                    type="button"
                                    :class="confirmButtonClassList"
                                    @click="confirm"
                                >
                                    {{ confirmButtonText }}
                                </button>
                            </slot>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { joinLines } from '@/utils/string-join-lines.js'
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const props = defineProps({
    toggleClassList: {
        type: String,
        default: joinLines(`un-rounded 
                            un-bg-navy-500 
                            un-px-4 
                            un-py-2 
                            un-text-sm 
                            un-gray-50 
                            hover:un-bg-navy-400`)
    },
    toggleType: {
        type: String,
        default: 'button'
    },
    toggleText: {
        type: String,
        default: 'Open Dialog'
    },
    dialogClassList: {
        type: String,
        default: 'un-absolute un-z-100'
    },
    backdropClassList: {
        type: String,
        default: joinLines(`un-fixed 
                            un-inset-0 
                            un-bg-black 
<<<<<<< HEAD
                            un-bg-opacity-25`)
=======
                            dark:un-bg-moon-900
                            un-bg-opacity-25
                            dark:un-bg-opacity-85`)
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
    },
    dialogPanelClassList: {
        type: String,
        default: joinLines(`un-w-full 
                            un-max-w-md 
                            un-overflow-hidden 
<<<<<<< HEAD
                            un-bg-white 
                            
                            un-text-left 
                            un-align-middle 
=======
                            un-bg-white
                            dark:un-bg-moon-600
                            un-rounded
                            un-text-left 
                            un-align-middle
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
                            un-shadow-xl`)
    },
    dialogTitleClassList: {
        type: String,
        default: joinLines(`un-p-4
                            un-text-lg 
                            un-font-medium 
                            un-leading-6 
<<<<<<< HEAD
                            un-text-gray-900 
=======
                            un-text-gray-900
                            dark:un-bg-moon-700
                            dark:un-border
                            dark:un-border-moon-600
                            dark:un-text-gray-100
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
                            `)
    },
    title: {
        type: String,
        default: ''
    },
    bodyClassList: {
        type: String,
<<<<<<< HEAD
        default: 'un-bg-slate-50'
=======
        default: joinLines(`un-bg-slate-50 
                            dark:un-bg-moon-800 
                            dark:un-text-gray-100 
                            un-border-b 
                            un-border-l 
                            un-border-r 
                            dark:un-border-b-moon-600 
                            dark:un-border-l-moon-600 
                            dark:un-border-r-moon-600`)
>>>>>>> 5c1882db6b10f8c17454daf8c27c53b14e593a4d
    },
    controlSectionClassList: {
        type: String,
        default: joinLines(`un-flex 
                            un-justify-end 
                            un-mt-12 
                            un-pb-4 
                            un-px-4`)
    },
    confirmButtonClassList: {
        type: String,
        default: joinLines(`un-rounded 
                            un-bg-navy-500 
                            un-px-4 
                            un-py-2 
                            un-text-sm 
                            un-text-gray-50 
                            hover:un-bg-navy-400`)
    },
    confirmButtonText: {
        type: String,
        default: 'OK'
    },
    unmount: {
        type: Boolean,
        default: false
    }
})

const isOpen = ref(false)
const emit = defineEmits(['opened', 'before-close', 'confirmed', 'cancelled'])

function confirm() {
    closeModal()
    emit('confirmed')
}

function cancel() {
    closeModal()
    emit('cancelled')
}

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
    emit('opened')
}
</script>
