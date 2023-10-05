<template>
    <div v-click-outside="closeDropdown" class="dropdown-component un-relative">
        <div
            @click="toggleDropdown"
            :class="['dropdown-button', buttonClassList ? buttonClassList : 'un-bg-slate-50 dark:un-bg-moon-800 hover:un-bg-slate-100 dark:hover:un-bg-moon-700 hover:un-cursor-pointer un-rounded-sm un-border un-border-slate-500 dark:un-border-moon-700 dark:hover:un-border-moon-600 un-text-sm dark:un-text-gray-100 un-px-4 un-py-1 un-text-center un-inline-flex un-items-center un-w-full']"
            type="button"
        >
            <slot name="toggle-label" v-bind="{ currentItem }">
                {{ currentItem }}
            </slot>
            <span class="un-ms-2" :class="[show ? upIcon : downIcon]"></span>
        </div>
        <div
            v-show="show"
            class="un-absolute un-top-[100%] un-w-fit un-z-10 un-bg-white dark:un-bg-moon-700 un-divide-y un-divide-gray-100 dark:un-divide-moon-600 un-rounded-sm un-shadow w-44"
        >
            <ul class="text-sm text-gray-700 dark:text-gray-100">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    class="un-block un-py-2 un-text-right hover:un-cursor-pointer dark:un-text-gray-100 hover:un-bg-gray-200 dark:hover:un-bg-moon-600 hover:un-bg-opacity-50"
                >
                    <p
                        class="un-block un-w-[100%] un-px-8 un-text-right hover:un-cursor-pointer"
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
            default: 'i-custom-chevron-up dark:un-text-gray-100'
        },
        downIcon: {
            type: String,
            default: 'i-custom-chevron-down dark:un-text-gray-100'
        }
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        currentItem: {
            get() {
                return this.modelValue || this.value
            },
            set(v) {
                this.internalCurrentItem = v
            }
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
            this.$emit('update:modelValue', item)
            this.$emit('input', item)
        },
        getActiveClassList(item) {
            return this.currentItem === item ? 'un-font-bold' : ''
        }
    }
}
</script>
