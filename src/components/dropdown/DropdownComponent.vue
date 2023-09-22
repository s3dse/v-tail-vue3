<template>
    <div v-click-outside="closeDropdown" class="dropdown-component tw-relative">
        <div
            @click="toggleDropdown"
            :class="['dropdown-button', buttonClassList ? buttonClassList : 'tw-bg-slate-50 dark:tw-bg-moon-800 hover:tw-bg-slate-100 dark:hover:tw-bg-moon-700 hover:tw-cursor-pointer tw-rounded-sm tw-border tw-border-slate-500 dark:tw-border-moon-700 dark:hover:tw-border-moon-600 tw-text-sm dark:tw-text-gray-300 tw-px-4 tw-py-1 tw-text-center tw-inline-flex tw-items-center tw-w-full']"
            type="button"
        >
            <slot name="toggle-label" v-bind="{ currentItem }">
                {{ currentItem }}
            </slot>
            <span class="tw-ms-2" :class="[show ? upIcon : downIcon]"></span>
        </div>
        <div
            v-show="show"
            class="tw-absolute tw-top-[100%] tw-w-fit tw-z-10 tw-bg-white dark:tw-bg-moon-700 tw-divide-y tw-divide-gray-100 dark:tw-divide-moon-600 tw-rounded-sm tw-shadow w-44"
        >
            <ul class="text-sm text-gray-700 dark:text-gray-200">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    class="tw-block tw-py-2 tw-text-right hover:tw-cursor-pointer dark:tw-text-gray-300 hover:tw-bg-gray-200 dark:hover:tw-bg-moon-600 hover:tw-bg-opacity-50"
                >
                    <p
                        class="tw-block tw-w-[100%] tw-px-8 tw-text-right hover:tw-cursor-pointer"
                        :class="getActiveClassList(item)"
                        @click="setCurrentItem(item)"
                    >
                        {{ item }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { clickOutside} from '@/directives/click-outside'
export default {
    directives: {
        clickOutside
    },
    name: 'dropdown-component',
    props: {
        modelValue: {
            type: [String, Boolean, Number],
            required: false
        },
        value: {
            type: [String, Boolean, Number],
            required: false
        },
        options: {
            type: Array,
            default: () => []
        },
        buttonClassList: {
            type: String,
            default: ''
        },
        upIcon: {
            type: String,
            default: 'i-custom-chevron-up dark:tw-text-gray-300'
        },
        downIcon: {
            type: String,
            default: 'i-custom-chevron-down dark:tw-text-gray-300'
        }
    },
    data() {
        return {
            show: false,
            currentItem: this.modelValue || this.value || null
        }
    },
    methods: {
        closeDropdown() {
            this.show = false
        },
        toggleDropdown() {
            this.show = !this.show
        },
        setCurrentItem(item) {
            this.currentItem = item
            this.$emit('update:modelValue', this.currentItem)
            this.$emit('input', this.currentItem)
        },
        getActiveClassList(item) {
            return this.currentItem === item ? 'tw-font-bold' : ''
        }
    }
}
</script>
