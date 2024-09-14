<template>
    <Story title="Table" :layout="{ type: 'grid', width: '75%', height: '100%' }">
        <Variant title="default" :meta="{ wrapper: true }">
            <Remote-Wrapper>
                <TableComponent
                    :items="state.items"
                    :totalItems="state.totalItems"
                    :fields="state.fields"
                    :top-rows="topRows"
                    title="Test"
                    class="un-w-[100%] dark:un-bg-moon-800"
                    remote-pagination
                    @remote-page-change="updateItems"
                >
                    <template #table-top-controls>
                        <div
                            class="un-border dark:un-border-moon-700 dark:un-text-gray-100 un-px-4 un-ms-auto"
                        >
                            some control
                        </div>
                    </template>
                    <template #page-size-label="{ pageSize }">
                        Einträge pro Seite: {{ pageSize }}
                    </template>
                    <template #cell(share)="data">
                        <div :title="data.unformatted">
                            {{ data.value }}
                        </div>
                    </template>
                </TableComponent>
            </Remote-Wrapper>
        </Variant>
    </Story>
</template>
<script setup>
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import { TableComponent } from '..'
import { ref, reactive } from 'vue'
import data from '../../../assets/MOCK_DATA-2.json'
const fields = [
    {
        key: 'id',
        thClassList: 'un-text-right un-px-1 un-w-18',
        tdClassList: 'un-text-right un-px-1 un-font-mono',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'first_name',
        label: 'the first name',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'last_name',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'email',
        thClassList: 'un-text-left un-px-1',
        tdClassList: 'un-text-left un-px-1 un-w-15',
        tdTopRowClassList: 'un-text-left un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    },
    {
        key: 'share',
        thClassList: 'un-text-right un-px-1 un-w-15',
        tdClassList: 'un-text-right un-px-1 un-font-mono un-w-15',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold',
        formatter: number =>
            number
                ? (parseFloat(number) * 100).toLocaleString(navigator.language, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                  }) + '%'
                : number
    },
    {
        key: 'ip_address',
        thClassList: 'un-text-right un-px-1 un-w-45',
        tdClassList: 'un-text-right un-px-1 un-font-mono',
        tdTopRowClassList: 'un-text-right un-px-1 un-italic',
        tdBottomRowClassList: 'un-text-right un-px-1 un-font-semibold'
    }
]

const items = ref([...getItems({ page: 1, pageSize: 5 })])
const state = reactive({
    fields,
    items,
    totalItems: getTotalItems()
})

function getItems({ page = 1, pageSize = 5 }) {
    return data.slice((page - 1) * pageSize, page * pageSize)
}

function updateItems({ page, pageSize }) {
    items.value = [...getItems({ page, pageSize })]
}

function getTotalItems() {
    return data.length
}



const selection = ref([])
</script>
