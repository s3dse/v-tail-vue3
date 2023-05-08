<template>
    <div>
        <div v-if="title" class="vt-title-border tw-border-b tw-my-3">
            <div class="vt-title tw-text-lg tw-mx-4 tw-text-slate-600 tw-font-semibold tw-my-3">
                {{ title }}
            </div>
        </div>
        <div
            class="vt-table-header tw-flex tw-flex-wrap tw-align-baseline tw-mx-4 tw-my-3 tw-gap-2"
        >
            <input
                v-if="enableSearch"
                name="search"
                :placeholder="searchPlaceholder"
                :id="filterInputId"
                @input="filterData"
                class="tw-border tw-rounded-sm tw-px-2 tw-text-sm"
            />
            <dropdown-component
                v-model="pageSize"
                :options="[5, 10, 25, 50, 100]"
                :default-item="5"
                button-class-list="tw-border tw-bg-slate-100 hover:tw-bg-slate-200 hover:tw-cursor-pointer tw-rounded-sm tw-px-2 tw-text-sm tw-text-center tw-align-baseline"
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
        <div class="tw-mt-2 tw-pb-2 tw-border-b tw-border-1 tw-overflow-x-auto">
            <table class="tw-w-[100%]">
                <thead
                    class="tw-border-t tw-border-solid tw-border-1 tw-bg-slate-100 tw-uppercase tw-font-semibold tw-text-[0.625rem] tw-text-slate-500"
                    v-if="tableData.length || topRows.length"
                >
                    <th
                        v-for="(col, index) in visibleFields"
                        :key="index"
                        @click="sortTable(col)"
                        :class="[col.thClassList, leftPadFirstCol(index), rightPadLastCol(index)]"
                        class="hover:tw-cursor-pointer tw-p-2 first:tw-ps-6 last:tw-pe-6 tw-uppercase"
                    >
                        {{ underscoresToSpaces(col.key) }}
                        <div
                            class="arrow tw-ms-2"
                            v-if="col.key === sortColumnKey"
                            :class="ascending ? 'chevron_up' : 'chevron_down'"
                        ></div>
                    </th>
                </thead>
                <tbody v-if="topRows.length">
                    <tr
                        :data-top-row="rowIndex"
                        v-for="(item, rowIndex) in getRows(topRows, false)"
                        :key="`top_row_${rowIndex}`"
                        class="tw-border-y"
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
                                :item="item"
                                :field="column"
                            >
                                {{ getValue(item, column) }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-for="(item, rowIndex) in getRows()" :key="rowIndex" class="tw-border-y">
                        <td
                            v-for="(column, fieldIndex) in visibleFields"
                            :key="fieldIndex"
                            class="tw-p-2 first:tw-ps-6 last:tw-pe-6"
                            :class="[getClassList(column)]"
                        >
                            <slot
                                :name="`cell(${column.key})`"
                                :value="getValue(item, column)"
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
                        class="tw-border-t"
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
import '@/assets/index.css'
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

function buildSearchIndex(acc, curr) {
    return acc + curr + (acc + ' ' + curr)
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
            return v => v ? v.replaceAll('_', ' ') : v
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
                console.error('\'pageSize\' must be higher than length of \'topRows\'.')
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
<style scoped>
.chevron_down {
    background-image: url('data:image/svg+xml;uft8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /> </svg> ');
}
.chevron_up {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /> </svg> ');
}
.arrow_down {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC');
}
.arrow_up {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=');
}
.arrow {
    float: right;
    width: 12px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position-y: bottom;
}
</style>
