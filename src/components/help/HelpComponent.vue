<template>
    <Popper arrow open-delay="100" close-delay="100">
        <template #content="props">
            <slot name="content" v-bind="props"/>
        </template>
        <span class="un-form-help">?</span>
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
    --at-apply: "un-p-4!";
    --at-apply: "un-bg-white!";
    --at-apply: "un-border! un-border-solid! un-rounded!";
    --at-apply: "un-border-gray-300!";
    --at-apply: "un-text-gray-900! dark:un-text-gray-100!";
    --at-apply: "dark:un-bg-moon-700! dark:un-border! dark:un-border-moon-600!";
    --at-apply: "un-transition-none!";
}
:deep(.popper[data-popper-placement^='bottom'] [data-popper-arrow]::before) {
    --at-apply: "un-border-t! un-border-l! un-border-r-none! un-border-b-none!";
    --at-apply: "un-border-t-solid!";
    --at-apply: "un-border-l-solid! un-bg-white! dark:un-bg-moon-700!";
    --at-apply: "un-border-t-gray-300! dark:un-border-t-moon-600! un-border-l-gray-300! dark:un-border-l-moon-600!";
    --at-apply: "un-transition-none!";
}

:deep(.popper[data-popper-placement^='top'] [data-popper-arrow]::before) {
    --at-apply: "un-border-b! un-border-r! un-border-l-none! un-border-t-none!";
    --at-apply: "un-border-b-solid!";
    --at-apply: "un-border-r-solid! un-bg-white! dark:un-bg-moon-700!";
    --at-apply: "un-border-b-gray-300! dark:un-border-b-moon-600! un-border-r-gray-300! dark:un-border-r-moon-600!";
    --at-apply: "un-transition-none!";
}

</style>
