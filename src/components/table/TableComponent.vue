<template>
    <div>
        <div v-if="title && !hasTitleSlot" class="vt-title-border tw-border-b dark:tw-border-moon-700 dark:tw-bg-moon-800 tw-my-3">
            <div class="vt-title tw-text-lg tw-mx-4 tw-text-slate-600 dark:tw-text-gray-100 tw-font-semibold tw-my-3">
                {{ title }}
            </div>
        </div>
        <div v-if="!title && hasTitleSlot" class="vt-title-border tw-border-b tw-my-3">
            <slot name="title" />
        </div>
        <div class="vt-table-header tw-flex tw-flex-wrap tw-mx-4 tw-my-3 tw-gap-2 tw-justify-start">
            <input
                v-if="enableSearch"
                name="search"
                :placeholder="searchPlaceholder"
                :id="filterInputId"
                @input="filterData"
                :class="searchInputClassList"
            />
            <dropdown-component
                class="tw-flex"
                v-model="pageSize"
                :options="[5, 10, 25, 50, 100]"
                :default-item="5"
                :button-class-list="pageSizeButtonClassList"
            >
                <template #toggle-label="{ currentItem }">
                    <slot name="page-size-label" v-bind="{ pageSize: currentItem }"></slot>
                </template>
            </dropdown-component>
            <slot
                name="table-top-controls"
                :data="tableData"
                :top-rows="topRows"
                :fields="fields"
            ></slot>
        </div>
        <div class="tw-mt-2 tw-pb-2 tw-border-t dark:tw-border-moon-700 tw-overflow-x-auto">
            <table class="tw-w-full dark:tw-text-gray-100" :class="{ 'tw-table-fixed tw-whitespace-normal tw-break-words': fixed }">
                <thead
                    class="tw-bg-slate-100 dark:tw-bg-moon-900 tw-font-semibold tw-text-[0.625rem] tw-text-slate-500"
                    v-if="tableData.length || topRows.length"
                >
                    <th
                        v-for="(col, index) in visibleFields"
                        :key="index"
                        @click="sortTable(col)"
                        :class="[col.thClassList, leftPadFirstCol(index), rightPadLastCol(index)]"
                        class="hover:tw-cursor-pointer tw-p-2 first:tw-ps-6 last:tw-pe-6 tw-uppercase"
                    >
                    <slot 
                        :name="`th(${col.key})`"
                        :field="col">
                        <div class="">
                            {{ underscoresToSpaces(col.key) }}
                            <div
                                class="tw-inline-block"
                                :class="{
                                    'i-tabler-arrows-sort': col.key !== sortColumnKey,
                                    'i-tabler-sort-ascending': col.key === sortColumnKey && ascending,
                                    'i-tabler-sort-descending': col.key === sortColumnKey && !ascending
                                }"
                            ></div>
                        </div>
                    </slot>
                    </th>
                </thead>
                <tbody v-if="topRows.length">
                    <tr
                        :data-top-row="rowIndex"
                        v-for="(item, rowIndex) in getRows(topRows, false)"
                        :key="`top_row_${rowIndex}`"
                        class=""
                    >
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="`top_row_column_${fieldIndex}`"
                            class="tw-p-2 first:tw-ps-6 last:tw-pe-6"
                            :class="[getTopRowClassList(column)]"
                        >
                            <slot
                                :name="`cell(${column.key})`"
                                :value="getValue(item, column)"
                                :unformatted="getUnformattedValue(item, column)"
                                :item="item"
                                :field="column"
                            >
                                {{ getValue(item, column) }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-for="(item, rowIndex) in getRows()" :key="rowIndex" class="tw-border-y dark:tw-border-moon-700">
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="fieldIndex"
                            class="tw-p-2 first:tw-ps-6 last:tw-pe-6"
                            :class="[getClassList(column)]"
                        >
                            <slot
                                :name="`cell(${column.key})`"
                                :value="getValue(item, column)"
                                :unformatted="getUnformattedValue(item, column)"
                                :item="item"
                                :field="column"
                            >
                                {{ getValue(item, column) }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="bottomRows.length" class="">
                    <tr
                        v-for="(item, rowIndex) in getRows(bottomRows, false)"
                        :key="rowIndex"
                        class="tw-border-t dark:tw-border-moon-700"
                    >
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="fieldIndex"
                            class="tw-p-2 first:tw-ps-6 last:tw-pe-6"
                            :class="[getBottomRowClassList(column)]"
                        >
                            <slot
                                :name="`cell(${column.key})`"
                                :value="getValue(item, column)"
                                :unformatted="getUnformattedValue(item, column)"
                                :item="item"
                                :field="column"
                            >
                                {{ getValue(item, column) }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="vt-table-footer tw-flex tw-flex-wrap tw-gap-2 tw-mx-4 tw-my-2">
            <pagination-component
                v-if="paginate"
                :per-page="itemsPerPage"
                :current-page="currentPage"
                :total-pages="Math.round(tableData.length / itemsPerPage)"
                :total-entries="tableData.length"
                :previous-label="paginationPreviousLabel"
                :next-label="paginationNextLabel"
                @page-changed="changePage"
                class="dark:tw-text-gray-400"
            >
                <template #pagination-label="{ data }">
                    <slot name="pagination-label" v-bind="data"></slot>
                </template>
            </pagination-component>
            <slot
                name="table-bottom-controls"
                :fields="fields"
                :data="tableData"
                :summary-rows="bottomRows"
            ></slot>
        </div>
    </div>
</template>
<script>
import PaginationComponent from '@/components/pagination/PaginationComponent.vue'
import DropdownComponent from '@/components/dropdown/DropdownComponent.vue'
import { joinLines } from '@/utils/string-join-lines.js'
import 'virtual:uno.css'
function numSort(a, b, ascending) {
    return ascending ? a - b : b - a
}

function alnumSort(a, b, ascending) {
    const direction = ascending ? 1 : -1
    const comparison = a.localeCompare(b, undefined, {
        sensitivity: 'base'
    })
    return comparison * direction
}

function textMatch(needle, haystack) {
    const lowerCasedNeedle = needle.toLowerCase()
    return haystack.toLowerCase().indexOf(lowerCasedNeedle) !== -1
}

function toSearchableRow(row) {
    const normalized = Object.values(row).join('') + ' ' + Object.values(row).join(' ')
    return {
        row,
        normalized
    }
}
export default {
    name: 'table-component',
    components: {
        PaginationComponent,
        DropdownComponent
    },
    props: {
        title: {
            type: String,
            required: false
        },
        items: {
            type: Array,
            required: true
        },
        topRows: {
            type: Array,
            default: () => []
        },
        bottomRows: {
            type: Array,
            default: () => []
        },
        fields: {
            type: Array,
            default: () => [],
            validator: v => v.every(e => e.key)
        },
        perPage: {
            type: Number,
            default: 5
        },
        configurablePageSize: {
            type: Boolean,
            default: true
        },
        pageSizeButtonClassList: {
            type: String,
            default: joinLines(`tw-border 
                                tw-border-slate-200 
                                dark:tw-border-moon-700 
                                hover:tw-border-slate-100
                                dark:hover:tw-border-moon-600  
                                tw-bg-slate-50 
                                dark:tw-bg-moon-800 
                                hover:tw-bg-gray-200
                                dark:hover:tw-bg-moon-700
                                dark:tw-text-gray-100   
                                hover:tw-cursor-pointer 
                                tw-rounded-sm 
                                tw-text-sm 
                                tw-px-4
                                tw-h-[100%]
                                tw-inline-flex 
                                tw-items-center`)
        },
        searchInputClassList: {
            type: String,
            default: joinLines(`tw-border 
                                dark:tw-border-moon-700
                                dark:tw-bg-moon-900 
                                tw-rounded-sm
                                dark:focus:tw-outline-none
                                dark:focus:tw-ring-1
                                dark:focus:tw-ring-moon-500
                                dark:focus:tw-border-moon-300
                                tw-px-2 
                                tw-text-sm 
                                tw-flex 
                                tw-h-auto`)
        },
        paginate: {
            type: Boolean,
            default: true
        },
        enableSearch: {
            type: Boolean,
            default: true
        },
        searchPlaceholder: {
            type: String,
            default: 'Search'
        },
        paginationPreviousLabel: {
            type: String,
            required: false
        },
        paginationNextLabel: {
            type: String,
            required: false
        },
        fixed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ascending: false,
            sortColumnKey: '',
            tableData: [...this.items],
            currentPage: 1,
            filterInputId: `filter_input_${this._uid}`,
            filterInputSelector: `#filter_input_${this._uid}`,
            pageSize: this.perPage,
            componentValidation: false
        }
    },
    computed: {
        visibleFields: {
            get() {
                return this.fields.map(f => ({ visible: true, ...f })).filter(e => e.visible)
            },
            set(value) {
                return value
            }
        },
        itemsPerPage() {
            return this.pageSize - this.topRows.length
        },
        underscoresToSpaces() {
            return v => (v ? v.replaceAll('_', ' ') : v)
        },
        hasTitleSlot() {
            return !!this.$slots.title
        }
    },
    watch: {
        items: function (newItems) {
            this.tableData = newItems
        }
    },
    methods: {
        validateProps() {
            if (this.pageSize <= this.topRows.length) {
                this.componentValidation = false
                console.error("'pageSize' must be higher than length of 'topRows'.")
                return false
            } else {
                this.componentValidation = true
                return true
            }
        },
        getValue(record, column) {
            if (!record) return ''
            const value = record[column.key]
            if (column.formatter) {
                return column.formatter(value)
            } else {
                return value
            }
        },
        getUnformattedValue(record, column) {
            if (!record) return ''
            return record[column.key]
        },
        sortTable(col) {
            if (this.sortColumnKey === col.key) {
                this.ascending = !this.ascending
            } else {
                this.ascending = true
                this.sortColumnKey = col.key
            }

            this.tableData.sort((a, b) => {
                const aVal = a[col.key]
                const bVal = b[col.key]
                if (Number.isNaN(+aVal) && Number.isNaN(+bVal)) {
                    return alnumSort(aVal, bVal, this.ascending)
                } else if ([aVal, bVal].every(n => !Number.isNaN(+n))) {
                    return numSort(aVal, bVal, this.ascending)
                } else {
                    return 0
                }
            })
            this.$emit('after-sort', { column: col, ascending: this.ascending })
            if (this.paginate) {
                this.changePage(1)
            }
        },
        numberOfPages() {
            return Math.ceil(this.tableData.length / this.itemsPerPage)
        },
        changePage(page) {
            if (page === this.currentPage) return
            const oldPage = this.currentPage
            this.currentPage = page
            this.$emit('after-page-change', { oldPage, newPage: this.currentPage })
        },
        getRows(data = this.tableData, paginate = this.paginate) {
            if (paginate) {
                const start = (this.currentPage - 1) * this.itemsPerPage
                const end = start + this.itemsPerPage
                return data.slice(start, end)
            } else {
                return data
            }
        },
        findItems(searchableRow) {
            const needle = this.$el.querySelector(this.filterInputSelector).value
            return textMatch(needle, searchableRow.normalized)
        },
        filterData(event) {
            if (this.paginate) this.changePage(1)
            const searchableData = this.items.map(toSearchableRow)
            const filteredData = searchableData.filter(this.findItems)
            this.tableData = filteredData.map(e => (e ? e.row : []))
            this.$emit('after-filter', { searchTerm: event.target.value })
        },
        getClassList(column) {
            return column.tdClassList || ''
        },
        getTopRowClassList(column) {
            return column.tdTopRowClassList || this.getClassList(column)
        },
        getBottomRowClassList(column) {
            return column.tdBottomRowClassList || this.getClassList(column)
        },
        setPageSize(size) {
            this.pageSize = size
        },
        leftPadFirstCol(index) {
            return index === 0 ? 'tw-pe-6' : ''
        },
        rightPadLastCol(index) {
            return index === this.visibleFields.length - 1 ? 'tw-pe-6' : ''
        }
    },
    mounted() {
        this.validateProps()
    }
}
</script>
