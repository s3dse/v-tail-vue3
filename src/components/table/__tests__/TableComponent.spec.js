import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import TableComponent from '@/components/table/TableComponent.vue'
describe('TableComponent', () => {
    const props = {
        perPage: 5,
        topRows: [{ a: 11 }, { a: 12 }, { a: 13 }, { a: 14 }, { a: 15 }],
        items: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
        fields: [{ key: 'a' }]
    }
    it('should return error', async () => {
        const wrapper = shallowMount(TableComponent, {
            props
        })
        expect(wrapper.vm.componentValidation).toBe(false)
    })
    it('should return no error', () => {
        const wrapper = shallowMount(TableComponent, {
            props: { ...props, perPage: 7 }
        })
        expect(wrapper.vm.componentValidation).toBe(true)
    })
})
