<template>
    <div class="tw-flex tw-flex-wrap tw-justify-between tw-w-[100%]" data-pagination-component>
        <div class="pagination-label">
            <slot name="pagination-label" :data="{ perPage, currentPage, totalEntries }">
                {{ paginationLabel }}
            </slot>
        </div>
        <div>
            <ul class="pagination tw-flex tw-flex-wrap tw-justify-between tw-gap-8">
                <li class="pagination-item">
                    <button
                        type="button"
                        :disabled="isInFirstPage"
                        @click="onClickPreviousPage"
                        :class="[isInFirstPage ? 'tw-text-slate-300' : '']"
                    >
                        {{ previousLabel }}
                    </button>
                </li>

                <li v-for="page in pages" :key="page" class="pagination-item">
                    <button
                        type="button"
                        :disabled="page === currentPage"
                        @click="onClickPage(page)"
                        :class="[isPageActive(page) ? activeClasses : '']"
                    >
                        {{ page }}
                    </button>
                </li>

                <li class="pagination-item">
                    <button
                        type="button"
                        :disabled="isInLastPage"
                        @click="onClickNextPage"
                        :class="[isInLastPage ? 'tw-text-slate-300' : '']"
                    >
                        {{ nextLabel }}
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import '@/assets/index.css'
const PAGE_CHANGED_EVENT = 'page-changed'
const createIntermediateIndexRange = (currentPage, maxIntermediateButtons, totalPages) => {
    if (totalPages < maxIntermediateButtons) return [...Array(totalPages).keys()].map(i => i + 1)

    if (currentPage <= Math.ceil((maxIntermediateButtons - 1) / 2) || currentPage === 1) {
        return [...Array(maxIntermediateButtons).keys()].map(i => i + 1)
    } else if (currentPage === totalPages) {
        return [...Array(maxIntermediateButtons).keys()].map(i => totalPages - i).reverse()
    } else {
        return [...Array(maxIntermediateButtons).keys()].map(
            i => i + currentPage - Math.ceil((maxIntermediateButtons - 1) / 2)
        )
    }
}
export default {
    name: 'pagination-component',
    props: {
        maxVisibleButtons: {
            type: Number,
            default: 5
        },
        totalPages: {
            type: Number,
            required: true
        },
        totalEntries: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        firstLabel: {
            type: [String, Number],
            default: 1
        },
        lastLabel: {
            type: [String, Number],
            default: ''
        },
        previousLabel: {
            type: String,
            default: 'Previous'
        },
        nextLabel: {
            type: String,
            default: 'Next'
        },
        activeClasses: {
            type: String,
            default:
                'tw-bg-navy-500 tw-text-white tw-ring tw-ring-navy-200 tw-ring-2 tw-rounded-sm tw-px-2'
        }
    },
    data() {
        return {}
    },
    computed: {
        pages() {
            const intermediateRange = createIntermediateIndexRange(
                this.currentPage,
                this.maxVisibleButtons - 2,
                this.totalPages
            )
            return [...new Set([1, ...intermediateRange, this.totalPages])]
        },
        isInFirstPage() {
            return this.currentPage === 1
        },
        isInLastPage() {
            return this.currentPage === this.totalPages
        },
        last() {
            return this.lastLabel === '' ? this.totalPages : this.lastLabel
        },
        paginationLabel() {
            return `Showing entries ${this.perPage * this.currentPage - this.perPage + 1} to ${
                this.perPage * this.currentPage
            } of ${this.totalEntries} entries`
        }
    },
    methods: {
        onCLickFirstPage() {
            this.$emit(PAGE_CHANGED_EVENT, 1)
        },
        onClickPreviousPage() {
            this.$emit(PAGE_CHANGED_EVENT, this.currentPage - 1)
        },
        onClickPage(page) {
            this.$emit(PAGE_CHANGED_EVENT, page)
        },
        onClickNextPage() {
            this.$emit(PAGE_CHANGED_EVENT, this.currentPage + 1)
        },
        onClickLastPage() {
            this.$emit(PAGE_CHANGED_EVENT, this.totalPages)
        },
        isPageActive(page) {
            return this.currentPage === page
        }
    }
}
</script>
