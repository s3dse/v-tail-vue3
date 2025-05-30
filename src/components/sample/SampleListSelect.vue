<script setup>
import { ListboxContent, ListboxItem, ListboxRoot, ListboxVirtualizer } from 'reka-ui'
import { computed } from 'vue'

const people = computed(() => [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' }
])

const modelValue = defineModel({
    type: Array,
    default: () => []
})
</script>

<template>
    <ListboxRoot
        class="un-flex un-flex-col un-text-nowrap un-relative"
        v-model="modelValue"
        multiple="true"
    >
        <ListboxContent class="un-h-50 un-overflow-y-auto">
            <ListboxVirtualizer v-slot="{ option }" :options="people" :text-content="o => o.name">
                <ListboxItem
                    :value="option"
                    class="listselect__option un-flex un-items-center un-justify-start un-w-full un-min-h-[38px] un-max-h-[38px] p-0"
                >
                    {{ option.name }}
                </ListboxItem>
            </ListboxVirtualizer>
        </ListboxContent>
    </ListboxRoot>
</template>
