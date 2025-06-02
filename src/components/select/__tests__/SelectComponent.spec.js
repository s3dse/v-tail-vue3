import { describe, it, expect, afterEach } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import { ref } from 'vue'
import SelectComponent from '../SelectComponent.vue'

const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
    { id: 4, name: 'Option 4' },
    { id: 5, name: 'All Options' }
]

const defaultProps = (mergeProps = {}) => ({
    props: {
        options: options,
        modelValue: [],
        labelFunction: x => x.name,
        idFunction: x => x.id,
        isDefaultOption: () => false,
        multiple: true,
        ...mergeProps
    }
})

enableAutoUnmount(afterEach)

describe('SelectComponent', () => {
    it('should render properly', () => {
        const wrapper = mount(SelectComponent, defaultProps())
        expect(wrapper.exists('.selectcomponent__label')).toBe(true)
    })

    describe('in single mode', () => {
        it('should allow only one selected option', async () => {
            const modelRef = ref([])
            const wrapper = mount(
                SelectComponent,
                defaultProps({
                    'onUpdate:modelValue': v => (modelRef.value = v),
                    multiple: false
                })
            )
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(1).trigger('click')
            expect(modelRef.value).toEqual([options[1]])
            await wrapper.findAll('[role=option]').at(2).trigger('click')
            expect(modelRef.value).toEqual([options[2]])
        })

        it('should be initialized with a default option, if provided', async () => {
            const modelRef = ref([options[4]])
            const wrapper = mount(
                SelectComponent,
                defaultProps({
                    modelValue: modelRef.value,
                    'onUpdate:modelValue': v => (modelRef.value = v),
                    isDefaultOption: x => x.id === 5,
                    multiple: false
                })
            )
            await wrapper.vm.$nextTick()
            expect(modelRef.value).toEqual([options[4]])
            await wrapper.vm.toggleOpen()
            expect(wrapper.find('[role=option][aria-selected="true"]').text()).toBe('All Options')
        })
    })

    describe('in multiple mode', () => {
        it('should allow multiple selections', async () => {
            const props = {
                modelValue: [],
                'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v })
            }
            const wrapper = mount(SelectComponent, defaultProps(props))
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(1).trigger('click')
            expect(wrapper.props('modelValue')).toEqual([options[1]])
            await wrapper.findAll('[role=option]').at(2).trigger('click')
            expect(wrapper.props('modelValue')).toEqual([options[1], options[2]])
        })

        it('should not allow deselection if selection length is 1', async () => {
            const props = {
                modelValue: [options[1]],
                'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v })
            }
            const wrapper = mount(SelectComponent, defaultProps(props))
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(1).trigger('click') // Deselect Option 2
            expect(wrapper.props('modelValue')).toEqual([{ id: 2, name: 'Option 2' }]) // Should remain selected
        })

        it('should toggle selection of options', async () => {
            const props = {
                modelValue: [
                    { id: 2, name: 'Option 2' },
                    { id: 3, name: 'Option 3' }
                ],
                'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v })
            }
            const wrapper = mount(SelectComponent, defaultProps(props))
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(2).trigger('click') // Deselect Option 2

            expect(wrapper.props('modelValue')).toEqual([{ id: 2, name: 'Option 2' }])
        })

        it('should switch to default option when all options are selected', async () => {
            const wrapper = mount(
                SelectComponent,
                defaultProps({
                    'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v }),
                    isDefaultOption: x => x.id === 5
                })
            )
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(0).trigger('click')
            await wrapper.findAll('[role=option]').at(1).trigger('click')
            await wrapper.findAll('[role=option]').at(2).trigger('click')
            expect(wrapper.props('modelValue')).toEqual([options[0], options[1], options[2]])
            await wrapper.findAll('[role=option]').at(3).trigger('click') // Select Option 4
            expect(wrapper.props('modelValue')).toEqual([options[4]]) // Should switch to default option
        })

        it('should deselect default option when not all other options are selected', async () => {
            const wrapper = mount(
                SelectComponent,
                defaultProps({
                    modelValue: [options[4]], // Start with default option selected
                    'onUpdate:modelValue': v => wrapper.setProps({ modelValue: v }),
                    isDefaultOption: x => x.id === 5
                })
            )
            await wrapper.vm.toggleOpen()
            await wrapper.findAll('[role=option]').at(0).trigger('click') // Select Option 1
            expect(wrapper.props('modelValue')).toEqual([options[0]])
        })
    })
})
