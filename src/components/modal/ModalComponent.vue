<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <component :is="toggleType" @click="openModal" :class="toggleClassList">
            {{ toggleText }}
        </component>
    </div>
    <Dialog as="div" :open="isOpen" @close="closeModal" :class="dialogClassList">
        <div name="backdrop" :class="backdropClassList" />
        <div class="tw-fixed tw-inset-0">
            <div
                class="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-text-center"
            >
                <DialogPanel :class="dialogPanelClassList">
                    <div class="tw-border-b tw-bg-white">
                        <DialogTitle as="div" :class="dialogTitleClassList">
                            {{ title }}
                        </DialogTitle>
                    </div>
                    <div :class="bodyClassList">
                        <slot name="content">
                            <div class="tw-mt-2 tw-px-4">
                                <p class="tw-text-sm tw-text-gray-500">Lorem Ipsum Something Something</p>
                            </div>
                        </slot>

                        <div :class="controlSectionClassList">
                            <slot name="controls">
                                <button
                                    type="button"
                                    :class="confirmButtonClassList"
                                    @click="closeModal"
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
        default: joinLines(`tw-rounded 
                            tw-bg-navy-500 
                            tw-px-4 
                            tw-py-2 
                            tw-text-sm 
                            tw-gray-50 
                            hover:tw-bg-navy-400`)
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
        default: 'tw-absolute tw-z-100'
    },
    backdropClassList: {
        type: String,
        default: joinLines(`tw-fixed 
                            tw-inset-0 
                            tw-bg-black 
                            tw-bg-opacity-25`)
    },
    dialogPanelClassList: {
        type: String,
        default: joinLines(`tw-w-full 
                            tw-max-w-md 
                            tw-overflow-hidden 
                            tw-rounded-md 
                            tw-bg-white 
                            
                            tw-text-left 
                            tw-align-middle 
                            tw-shadow-xl`)
    },
    dialogTitleClassList: {
        type: String,
        default: joinLines(`tw-p-4
                            tw-text-lg 
                            tw-font-medium 
                            tw-leading-6 
                            tw-text-gray-900 
                            `)
    },
    title: {
        type: String,
        default: ''
    },
    bodyClassList: {
        type: String,
        default: 'tw-bg-slate-50'
    },
    controlSectionClassList: {
        type: String,
        default: joinLines(`tw-flex 
                            tw-justify-end 
                            tw-mt-12 
                            tw-pb-4 
                            tw-px-4`)
    },
    confirmButtonClassList: {
        type: String,
        default: joinLines(`tw-rounded 
                            tw-bg-navy-500 
                            tw-px-4 
                            tw-py-2 
                            tw-text-sm 
                            tw-text-gray-50 
                            hover:tw-bg-navy-400`)
    },
    confirmButtonText: {
        type: String,
        default: 'OK'
    }
})

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>
