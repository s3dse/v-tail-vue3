<template>
    <div v-click-outside="closeDropdown" class="tw-relative">
        <div
            @click="toggleDropdown"
            :class="[buttonClassList ? buttonClassList : 'tw-bg-slate-200 hover:tw-bg-slate-300 hover:tw-cursor-pointer tw-rounded-sm tw-border tw-border-slate-500 tw-text-sm tw-px-4 tw-py-1 tw-text-center tw-inline-flex tw-items-center']"
            type="button"
        >
            <slot name="toggle-label" v-bind="{ currentItem }">
                {{ currentItem }}
            </slot>
            <span class="tw-ms-2 chevron" :class="[show ? 'chevron-up' : 'chevron-down']"></span>
        </div>
        <div
            v-show="show"
            class="tw-absolute tw-w-fit tw-z-10 tw-bg-white tw-divide-y tw-divide-gray-100 tw-rounded-sm tw-shadow w-44"
        >
            <ul class="text-sm text-gray-700 dark:text-gray-200">
                <li
                    v-for="(item, index) in options"
                    :key="index"
                    class="tw-block tw-py-2 tw-text-right hover:tw-cursor-pointer hover:tw-bg-navy-500 hover:tw-bg-opacity-50"
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
import '@/assets/index.css'
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
<style scoped>
.chevron {
    float: right;
    width: 12px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: bottom;
}
.chevron-down {
    background-image: url('data:image/svg+xml;uft8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /> </svg> ');
}
.chevron-up {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /> </svg> ');
}
.check {
    /* float: left; */
    width: 12px;
    height: 10px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: bottom;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /> </svg>');
}
</style>
