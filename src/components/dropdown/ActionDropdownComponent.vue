<template>
    <div v-click-outside="closeDropdown" class="dropdown-component relative">
        <div
            @click="toggleDropdown"
            :class="[
                'dropdown-button',
                buttonClassList
                    ? buttonClassList
                    : 'bg-slate-50 dark:bg-moon-800 hover:bg-slate-100 dark:hover:bg-moon-700 hover:cursor-pointer rounded-sm border border-slate-500 dark:border-moon-700 dark:hover:border-moon-600 text-sm px-4 py-1 text-center dark:text-gray-100 inline-flex items-center w-full'
            ]"
            type="button"
        >
            <slot name="toggle-label" />
            <span class="ms-2 chevron" :class="[show ? upIcon : downIcon]"></span>
        </div>
        <div
            v-show="show"
            class="absolute w-fit z-10 bg-white dark:bg-moon-700 divide-y divide-gray-100 dark:divide-moon-600 dark:text-gray-100 rounded-sm shadow w-44"
            :class="dropdownClassList"
        >
            <ul class="text-sm text-gray-700 dark:text-gray-100">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    class="block py-2 text-right hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-moon-600 hover:bg-opacity-50"
                >
                    <slot name="item" :item="item">
                        <p
                            class="block w-[100%] px-8 text-right hover:cursor-pointer"
                            @click="onSelect(item)"
                        >
                            {{ item }}
                        </p>
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { clickOutside } from '@/directives/click-outside'
export default {
    directives: {
        clickOutside
    },
    name: 'action-dropdown-component',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        buttonClassList: {
            type: String,
            default: ''
        },
        dropdownClassList: {
            type: String,
            default: ''
        },
        upIcon: {
            type: String,
            default: 'i-custom-chevron-up'
        },
        downIcon: {
            type: String,
            default: 'i-custom-chevron-down'
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        closeDropdown() {
            this.show = false
        },
        toggleDropdown() {
            this.show = !this.show
        },
        onSelect(item) {
            this.$emit('on-select', item)
            this.closeDropdown()
        }
    }
}
</script>
