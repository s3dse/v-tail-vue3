import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'

import { shallowMount } from '@vue/test-utils'
import TableComponent from '@/components/table/TableComponent.vue'
describe('TableComponent with perPage setting', () => {
    const props = {
        perPage: 5,
        topRows: [{ a: 11 }, { a: 12 }, { a: 13 }, { a: 14 }, { a: 15 }],
        items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
        fields: [{ key: 'a' }]
    }
    it('page size should be greater than top-rows, 5 => 10', async () => {
        const wrapper = shallowMount(TableComponent, {
            props
        })
        expect(wrapper.vm.thePageSize).toBe(10)
    })
    it('page size should be greater than top-rows, 7 => 7', () => {
        const wrapper = shallowMount(TableComponent, {
            props: { ...props, perPage: 7 }
        })
        expect(wrapper.vm.thePageSize).toBe(7)
    })
    it('page size should be greater than top-rows, 0 => 10', () => {
        const wrapper = shallowMount(TableComponent, { props: { ...props, perPage: 0 } })
        expect(wrapper.vm.thePageSize).toBe(10)
    })
})

describe('TableComponent without top rows', () => {
    it('page size should not be zero', () => {
        const wrapper = shallowMount(TableComponent, {
            props: {
                perPage: 0,
                topRows: [],
                items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
                fields: [{ key: 'a' }]
            }
        })
        expect(wrapper.vm.thePageSize).toBe(5)
    })
})

describe('TableComponent', async () => {
    const items = [...Array(100).keys()]
        .map(k => ({ name: `item-${k}`, value: k }))
    const shuffledItems = items.sort(() => 0.5 - Math.random())
    const props = {
        perPage: 10,
        topRows: [],
        items: shuffledItems,
        fields: [{ key: 'name' }, { key: 'value' }]
    }
    it('should sort ascendingly on first column-click', async () => {
        const wrapper = shallowMount(TableComponent, { props })
        const el = wrapper.findAll('th')[1]
        await el.find('.i-tabler-arrows-sort').trigger('click')
        await nextTick()
        expect(wrapper.vm.tableData.map(td => td.value)).toStrictEqual([...Array(100).keys()])
    })
    it('should sort descendingly on second column-click', async() => {
        const wrapper = shallowMount(TableComponent, { props })
        const el = wrapper.findAll('th')[1]
        await el.find('.i-tabler-arrows-sort').trigger('click')
        await nextTick()
        await wrapper.findAll('th')[1].find('.i-tabler-sort-ascending').trigger('click')
        await nextTick()
        expect(wrapper.vm.tableData.map(td => td.value)).toStrictEqual([...Array(100).keys()].reverse())
    })
})
