<template>
    <div>
        <div v-if="title && !hasTitleSlot" class="vt-title-border un-border-b dark:un-border-moon-700 dark:un-bg-moon-800 un-my-3">
            <div class="vt-title un-card-title un-mx-4 un-my-3">
                {{ title }}
            </div>
        </div>
        <div v-if="!title && hasTitleSlot" class="vt-title-border un-border-b dark:un-border-moon-700 un-my-3">
            <slot name="title" />
        </div>
        <div class="vt-table-header un-flex un-flex-wrap un-mx-4 un-my-3 un-gap-2 un-justify-start">
            <input
                v-if="enableSearch"
                name="search"
                :placeholder="searchPlaceholder"
                :id="filterInputId"
                @input="filterData"
                :class="searchInputClassList"
            />
            <dropdown-component
                class="un-flex"
                v-model="pageSize"
                :options="pageSizes.filter(e => e > topRows.length)"
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
        <div class="un-mt-2 un-pb-2 un-border-t dark:un-border-moon-700 un-overflow-x-auto 
        un-scrollbar
        un-scrollbar-rounded
        un-scrollbar-track-radius-0
        un-scrollbar-thumb-radius-2px 
        un-scrollbar-thumb-color-slate-200 dark:un-scrollbar-thumb-color-moon-700
        hover:un-scrollbar-thumb-color-slate-300 dark:hover:un-scrollbar-thumb-color-moon-600
        un-scrollbar-track-color-inherit dark:un-scrollbar-track-color-inherit">
            <table class="un-w-full dark:un-text-gray-100" :class="{ 'un-table-fixed un-whitespace-normal un-break-words': fixed }">
                <thead
                    class="un-bg-slate-100 dark:un-bg-moon-900 un-font-semibold un-text-[0.625rem] un-text-slate-500"
                    v-if="tableData.length || topRows.length"
                >
                    <th
                        v-for="(col, index) in visibleFields"
                        :key="index"
                        @click="sortTable(col)"
                        :class="[col.thClassList, leftPadFirstCol(index), rightPadLastCol(index)]"
                        class="hover:un-cursor-pointer un-p-2 first:un-ps-6 last:un-pe-6 un-uppercase"
                    >
                    <slot 
                        :name="`th(${col.key})`"
                        :field="col">
                        <div class="">
                            {{ underscoresToSpaces(getColumnLabel(col)) }}
                            <div
                                class="un-inline-block"
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
                            class="un-p-2 first:un-ps-6 last:un-pe-6"
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
                    <tr v-for="(item, rowIndex) in getRows()" :key="rowIndex" class="un-border-y dark:un-border-moon-700">
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="fieldIndex"
                            class="un-p-2 first:un-ps-6 last:un-pe-6"
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
                        class="un-border-t dark:un-border-moon-700"
                    >
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="fieldIndex"
                            class="un-p-2 first:un-ps-6 last:un-pe-6"
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
        <div class="vt-table-footer un-flex un-flex-wrap un-gap-2 un-mx-4 un-my-2">
            <pagination-component
                v-if="paginate"
                :per-page="itemsPerPage"
                :current-page="currentPage"
                :total-pages="Math.round(tableData.length / itemsPerPage)"
                :total-entries="tableData.length"
                :previous-label="paginationPreviousLabel"
                :next-label="paginationNextLabel"
                @page-changed="changePage"
                class="dark:un-text-gray-400"
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
        pageSizes: {
            type: Array,
            default: () => [5, 10, 25, 50]
        },
        pageSizeButtonClassList: {
            type: String,
            default: joinLines(`un-border 
                                un-border-slate-200 
                                dark:un-border-moon-700 
                                hover:un-border-slate-100
                                dark:hover:un-border-moon-600  
                                un-bg-slate-50 
                                dark:un-bg-moon-800 
                                hover:un-bg-gray-200
                                dark:hover:un-bg-moon-700
                                dark:un-text-gray-100   
                                hover:un-cursor-pointer 
                                un-rounded-sm 
                                un-text-sm 
                                un-px-4
                                un-h-[100%]
                                un-inline-flex 
                                un-items-center`)
        },
        searchInputClassList: {
            type: String,
            default: joinLines(`un-border 
                                dark:un-border-moon-700
                                dark:un-bg-moon-900 
                                dark:un-text-gray-100 
                                un-rounded-sm 
                                dark:focus:un-outline-none
                                dark:focus:un-ring-1
                                dark:focus:un-ring-moon-500
                                dark:focus:un-border-moon-300
                                un-px-2 
                                un-text-sm 
                                un-flex 
                                un-h-auto`)
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
            thePageSize: this.perPage > this.topRows.length ? this.perPage : this.pageSizes.find(e => e > this.topRows.length),
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
        pageSize: {
            get() {
                return this.thePageSize > this.topRows.length 
                    ? this.thePageSize 
                    : this.pageSizes.find(e => e > this.topRows.length)
            },
            set(v) {
                const alternative = v > this.topRows.length 
                    ? v 
                    : this.pageSizes.find(e => e > this.topRows.length)
                this.thePageSize = alternative
                return this.thePageSize
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
            return index === 0 ? 'un-pe-6' : ''
        },
        rightPadLastCol(index) {
            return index === this.visibleFields.length - 1 ? 'un-pe-6' : ''
        },
        getColumnLabel(column) {
            return column.label ? column.label : column.key
        }
    },
    mounted() {
        this.validateProps()
    }
}
</script>
