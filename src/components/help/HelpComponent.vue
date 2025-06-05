<template>
    <Popper arrow open-delay="100" close-delay="100">
        <template #content="props">
            <slot name="content" v-bind="props"/>
        </template>
        <span class="form-help">?</span>
    </Popper>
</template>

<script>
import { defineComponent } from 'vue'
import Popper from 'vue3-popper'

export default defineComponent({
    components: {
        Popper
    }
})
</script>
<style scoped>
:deep(.popper) {
    --at-apply: "p-4!";
    --at-apply: "bg-white!";
    --at-apply: "border! border-solid! rounded!";
    --at-apply: "border-gray-300!";
    --at-apply: "text-gray-900! dark:text-gray-100!";
    --at-apply: "dark:bg-moon-700! dark:border! dark:border-moon-600!";
    --at-apply: "transition-none!";
}
:deep(.popper[data-popper-placement^='bottom'] [data-popper-arrow]::before) {
    --at-apply: "border-t! border-l! border-r-none! border-b-none!";
    --at-apply: "border-t-solid!";
    --at-apply: "border-l-solid! bg-white! dark:bg-moon-700!";
    --at-apply: "border-t-gray-300! dark:border-t-moon-600! border-l-gray-300! dark:border-l-moon-600!";
    --at-apply: "transition-none!";
}

:deep(.popper[data-popper-placement^='top'] [data-popper-arrow]::before) {
    --at-apply: "border-b! border-r! border-l-none! border-t-none!";
    --at-apply: "border-b-solid!";
    --at-apply: "border-r-solid! bg-white! dark:bg-moon-700!";
    --at-apply: "border-b-gray-300! dark:border-b-moon-600! border-r-gray-300! dark:border-r-moon-600!";
    --at-apply: "transition-none!";
}

</style>
