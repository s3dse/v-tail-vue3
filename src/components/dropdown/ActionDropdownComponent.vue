<template>
    <div v-click-outside="closeDropdown" class="dropdown-component tw-relative">
        <div
            @click="toggleDropdown"
            :class="['dropdown-button', buttonClassList ? buttonClassList : 'tw-bg-slate-50 dark:tw-bg-moon-800 hover:tw-bg-slate-100 dark:hover:tw-bg-moon-700 hover:tw-cursor-pointer tw-rounded-sm tw-border tw-border-slate-500 dark:tw-border-moon-700 dark:hover:tw-border-moon-600 tw-text-sm tw-px-4 tw-py-1 tw-text-center dark:tw-text-gray-300 tw-inline-flex tw-items-center tw-w-full']"
            type="button"
        >
            <slot name="toggle-label" />
            <span class="tw-ms-2 chevron" :class="[show ? upIcon : downIcon]"></span>
        </div>
        <div
            v-show="show"
            class="tw-absolute tw-w-fit tw-z-10 tw-bg-white dark:tw-bg-moon-700 tw-divide-y tw-divide-gray-100 dark:tw-divide-moon-600 dark:tw-text-gray-300 tw-rounded-sm tw-shadow w-44"
        >
            <ul class="text-sm text-gray-700 dark:text-gray-200">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    class="tw-block tw-py-2 tw-text-right hover:tw-cursor-pointer hover:tw-bg-gray-200 dark:hover:tw-bg-moon-600 hover:tw-bg-opacity-50"
                >
                    <p
                        class="tw-block tw-w-[100%] tw-px-8 tw-text-right hover:tw-cursor-pointer"
                        @click="onSelect(item)"
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
// import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { clickOutside} from '@/directives/click-outside'
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
            show: false,
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
