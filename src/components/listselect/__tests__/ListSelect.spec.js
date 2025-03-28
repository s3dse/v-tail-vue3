import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref } from 'vue'
import ListSelect from '@/components/listselect/ListSelect.vue'
import { busy } from '@/directives/busy/busy'

const initMocksForVirtualList = () => {
    window.HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
        width: 100,
        height: 50,
        top: 0,
        left: 0,
        bottom: 50,
        right: 100,
        x: 0,
        y: 0,
        toJSON: () => {}
    }))
}

describe('ListSelect', () => {
    initMocksForVirtualList()

    const mountListSelect = props => {
        const modelValue = ref([])
        const wrapper = mount(ListSelect, {
            global: {
                directives: {
                    busy
                }
            },
            props: {
                options: [
                    { id: '1', label: 'option1' },
                    { id: '2', label: 'option2' },
                    { id: '3', label: 'option3' }
                ],
                multiple: false,
                modelValue,
                'onUpdate:modelValue': e => {
                    modelValue.value = e
                },
                ...props
            }
        })
        return { wrapper, modelValue }
    }

    it('renders properly', () => {
        const { wrapper } = mountListSelect()
        expect(wrapper.exists()).toBe(true)
        wrapper.unmount()
    })

    it('renders the correct number of options', async () => {
        const { wrapper } = mountListSelect()
        const toggle = wrapper.find('.listselect--dropdown-toggle')
        await toggle.trigger('click')
        const options = wrapper.findAll('.listselect__option')
        expect(options.length).toBe(3)
        wrapper.unmount()
    })

    it('renders a placeholder when provided', () => {
        const wrapper = mountListSelect({ inputPlaceholder: 'Select an option' }).wrapper
        const input = wrapper.find('input')
        expect(input.exists()).toBe(true)
        expect(input.element.placeholder).toBe('Select an option')
        wrapper.unmount()
    })

    it('renders no options when options prop is empty', () => {
        const { wrapper } = mountListSelect({ options: [] })
        const options = wrapper.findAll('option')
        expect(options.length).toBe(0)
    })

    describe('in single mode', () => {
        it('updates modelValue when an option is selected', async () => {
            const { wrapper, modelValue } = mountListSelect()
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            const option = wrapper.findAll('.listselect__option').at(1)
            await option.trigger('click')
            expect(modelValue.value).toStrictEqual([{ id: '2', label: 'option2' }])
            wrapper.unmount()
        })

        it('emits an update event when the value changes', async () => {
            const { wrapper, modelValue } = mountListSelect({ multiple: false })
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            // expect(wrapper.emitted('update:modelValue')[0]).toEqual([[{ id: '2', label: 'option2' }]])
            expect(modelValue.value).toStrictEqual([{ id: '2', label: 'option2' }])

            await wrapper.findAll('.listselect__option').at(2).trigger('click')
            expect(wrapper.emitted('update:modelValue').length).toBe(2)
            // expect(wrapper.emitted('update:modelValue')).toEqual([[{ id: '3', label: 'option3' }]])
            expect(modelValue.value).toStrictEqual([{ id: '3', label: 'option3' }])
            wrapper.unmount()
        })
    })

    describe('in multiple mode', () => {
        it('supports multiple selection when multiple is true', async () => {
            const { wrapper, modelValue } = mountListSelect({ multiple: true })
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            await wrapper.findAll('.listselect__option').at(2).trigger('click')

            expect(modelValue.value).toStrictEqual([
                { id: '2', label: 'option2' },
                { id: '3', label: 'option3' }
            ])
            wrapper.unmount()
        })

        it('supports deselect when multiple is true', async () => {
            const { wrapper, modelValue } = mountListSelect({ multiple: true })
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            expect(modelValue.value).toStrictEqual([{ id: '2', label: 'option2' }])
            await wrapper.findAll('.listselect__option').at(2).trigger('click')
            expect(modelValue.value).toStrictEqual([
                { id: '2', label: 'option2' },
                { id: '3', label: 'option3' }
            ])
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            expect(modelValue.value).toStrictEqual([{ id: '3', label: 'option3' }])
            wrapper.unmount()
        })

        it('handles list length excess', async () => {
            const { wrapper, modelValue } = mountListSelect({
                multiple: true,
                maxSelectionLength: 2
            })
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            await wrapper.findAll('.listselect__option').at(2).trigger('click')
            await wrapper.findAll('.listselect__option').at(0).trigger('click')

            expect(modelValue.value).toStrictEqual([
                { id: '2', label: 'option2' },
                { id: '3', label: 'option3' }
            ])
            wrapper.unmount()
        })

        it('can remove an option via taglist remove buttons', async () => {
            const { wrapper, modelValue } = mountListSelect({
                multiple: true,
                maxSelectionLength: 2
            })
            await wrapper.find('.listselect--dropdown-toggle').trigger('click')
            await wrapper.findAll('.listselect__option').at(1).trigger('click')
            await wrapper.findAll('.listselect__option').at(2).trigger('click')
            expect(modelValue.value).toStrictEqual([
                { id: '2', label: 'option2' },
                { id: '3', label: 'option3' }
            ])

            await wrapper.find('.remove-option-0').trigger('click')
            expect(modelValue.value).toStrictEqual([{ id: '3', label: 'option3' }])

            console.log(wrapper.html())
        })
    })
})
