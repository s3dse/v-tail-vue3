<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <component :is="toggleType" @click="openModal" :class="toggleClassList">
            {{ toggleText }}
        </component>
    </div>
    <Dialog as="div" :open="isOpen" @close="cancel" :class="dialogClassList" :unmount="unmount">
        <div name="backdrop" :class="backdropClassList" />
        <div class="un-fixed un-inset-0">
            <div class="un-flex un-min-h-full un-items-center un-justify-center un-text-center">
                <DialogPanel :class="dialogPanelClassList">
                    <div class="un-border-b un-bg-white">
                        <DialogTitle as="div" :class="dialogTitleClassList">
                            {{ title }}
                        </DialogTitle>
                    </div>
                    <div :class="bodyClassList">
                        <slot name="content">
                            <div class="un-mt-2 un-px-4">
                                <p class="un-text-sm un-text-gray-500">
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
                            un-bg-opacity-25`)
    },
    dialogPanelClassList: {
        type: String,
        default: joinLines(`un-w-full 
                            un-max-w-md 
                            un-overflow-hidden 
                            un-bg-white 
                            
                            un-text-left 
                            un-align-middle 
                            un-shadow-xl`)
    },
    dialogTitleClassList: {
        type: String,
        default: joinLines(`un-p-4
                            un-text-lg 
                            un-font-medium 
                            un-leading-6 
                            un-text-gray-900 
                            `)
    },
    title: {
        type: String,
        default: ''
    },
    bodyClassList: {
        type: String,
        default: 'un-bg-slate-50'
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
