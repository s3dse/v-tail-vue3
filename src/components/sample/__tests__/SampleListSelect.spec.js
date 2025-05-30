import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { ref } from 'vue'
import SampleListSelect from '../SampleListSelect.vue'

// const initMocksForVirtualList = () => {
//     const options = {
//         width: 100,
//         height: 50,
//         top: 0,
//         left: 0,
//         bottom: 50,
//         right: 100,
//         x: 0,
//         y: 0
//     }
//     window.HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
//         ...options,
//         toJSON: () => JSON.stringify(options)
//     }))
//     window.HTMLElement.prototype.scrollIntoView = vi.fn()
// }

describe('SampleListSelect', () => {
    window.HTMLElement.prototype.releasePointerCapture = vi.fn()
    window.HTMLElement.prototype.hasPointerCapture = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
    // initMocksForVirtualList()

    const mountListSelect = props => {
        const modelValue = ref([])
        const wrapper = mount(SampleListSelect, {
            global: {},
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
            },
            attachTo: document.body
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
        const options = wrapper.findAll('.listselect__option')
        console.log(document.body.innerHTML)
        expect(options.length).toBe(3)
        wrapper.unmount()
    })
})
