import { describe, it, expect } from 'vitest'
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
    const items = [...Array(100).keys()].map(k => ({ name: `item-${k}`, value: k }))
    const shuffledItems = [...items].sort(() => 0.5 - Math.random())
    const props = {
        perPage: 10,
        topRows: [],
        items: shuffledItems,
        fields: [{ key: 'name' }, { key: 'value' }]
    }
    const intValuesOfColumn = (wrapper, column) =>
        wrapper
            .findAll(`td:nth-child(${column})`)
            .map(domWrapper => domWrapper.text())
            .map(value => parseInt(value))
    it('should sort ascendingly on first column-click', async () => {
        const wrapper = shallowMount(TableComponent, { props })
        const el = wrapper.findAll('th')[1]
        await el.find('.i-tabler-arrows-sort').trigger('click')
        expect(wrapper.vm.tableData.map(td => td.value)).toStrictEqual([...Array(100).keys()])
        const values = intValuesOfColumn(wrapper, 2)
        expect(values).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    it('should sort descendingly on second column-click', async () => {
        const wrapper = shallowMount(TableComponent, { props })
        const el = wrapper.findAll('th')[1]
        await el.find('.i-tabler-arrows-sort').trigger('click')
        await wrapper.findAll('th')[1].find('.i-tabler-sort-ascending').trigger('click')
        expect(wrapper.vm.tableData.map(td => td.value)).toStrictEqual(
            [...Array(100).keys()].reverse()
        )
        const values = intValuesOfColumn(wrapper, 2)
        expect(values).toStrictEqual([99, 98, 97, 96, 95, 94, 93, 92, 91, 90])
    })
    it('should filter data', async () => {
        const wrapper = shallowMount(TableComponent, { props: { ...props, items } })
        const filterInput = wrapper.find('input')
        await filterInput.setValue('1')
        expect(wrapper.vm.tableData.map(td => td.value).sort()).toStrictEqual([
            1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31, 41, 51, 61, 71, 81, 91
        ])
        const values = intValuesOfColumn(wrapper, 2)
        expect(values).toStrictEqual([1, 10, 11, 12, 13, 14, 15, 16, 17, 18])
    })
    it('should filter an empty result when no match', async () => {
        const wrapper = shallowMount(TableComponent, { props })
        const input = wrapper.find('input')
        await input.setValue('test')
        expect(wrapper.vm.tableData).toStrictEqual(new Array())
        expect(wrapper.findAll('td')).toStrictEqual(new Array())
    })
})
