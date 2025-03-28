<template>
    <Story title="ListSelect" :layout="{ type: 'grid', width: '75%' }">
        <Variant title="default" :init-state="initState('default')" :meta="{ wrapper: true }">
            <template #default="{ state }">
                <div class="un-h-600px un-w-600px">
                    <ListSelect
                        class="un-w-fit"
                        :options="state.options"
                        :dropdownClasses="state.dropdownClasses"
                        :multiple="state.multiple"
                        :label-fn="state.labelFn"
                        :truncate-items="state.truncateItems"
                        v-model="selection"
                        @update:modelValue="e => console.log(e)"
                    ></ListSelect>
                </div>
            </template>
        </Variant>
    </Story>
</template>
<docs lang="md">
# ListItemLabel

## Props

-   `label` - String: The label to display
-   `selected` - Boolean: Whether the item is selected
-   `truncate` - Boolean: Whether to truncate the label
</docs>
<script setup>
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import { ListSelect } from '..'
import { ref } from 'vue'

const vBusy = {
  mounted: (el, { value }) => {
    el.setAttribute('title', value)
  },
}

function initState(variant) {
    const state = {
        default: {
            options: [...new Array(90).keys()].map(k => ({ id: k + 1, name: `option ${k + 1}` })),
            dropdownClasses: 'un-right-0 un-min-w-50 un-w-fit',
            multiple: true,
            labelFn: option => option.name,
            truncateItems: false
        }
    }
    return () => state[variant]
}

const selection = ref([])
</script>