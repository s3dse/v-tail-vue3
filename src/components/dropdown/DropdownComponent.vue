<template>
    <div v-click-outside="closeDropdown" class="dropdown-component relative">
        <div
            @click="toggleDropdown"
            :class="['dropdown-button', buttonClassList ? buttonClassList : 'bg-slate-50 dark:bg-moon-800 hover:bg-slate-100 dark:hover:bg-moon-700 hover:cursor-pointer rounded-sm border border-slate-500 dark:border-moon-700 dark:hover:border-moon-600 text-sm dark:text-gray-100 px-4 py-1 text-center inline-flex items-center w-full']"
            type="button"
        >
            <slot name="toggle-label" v-bind="{ currentItem }">
                {{ currentItem }}
            </slot>
            <span class="ms-2" :class="[show ? upIcon : downIcon]"></span>
        </div>
        <div
            v-show="show"
            :class="['dropdown-container absolute top-[100%] z-10', dropdownContainerClassList ? dropdownContainerClassList : 'absolute top-[100%] w-fit z-10 bg-white dark:bg-moon-700 divide-y divide-gray-100 dark:divide-moon-600 rounded-sm shadow w-44']"
        >
            <ul :class="[ulClassList ? ulClassList : 'text-sm text-gray-700 dark:text-gray-100']">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    :class="[liClassList ? liClassList : 'block py-2 text-right hover:cursor-pointer dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-moon-600 hover:bg-opacity-50']"
                    @click="setCurrentItem(item)"
                >
                    <p
                        class="block w-[100%] px-8 text-right hover:cursor-pointer"
                        :class="getActiveClassList(item)"
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
            default: 'i-custom-chevron-up dark:text-gray-100'
        },
        downIcon: {
            type: String,
            default: 'i-custom-chevron-down dark:text-gray-100'
        },
        activeClassList: {
            type: String,
            default: 'font-bold'
        },
        dropdownContainerClassList: {
            type: String,
            default: ''
        },
        ulClassList: {
            type: String,
            default: ''
        },
        liClassList: {
            type: String,
            default: ''
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
            return this.currentItem === item ? this.activeClassList : ''
        }
    }
}
</script>
