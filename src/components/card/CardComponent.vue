<template>
    <div class="tw-card" :class="classes">
        <slot></slot>
    </div>
</template>
<script>
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
export default {
    props: {
        classes: {
            type: String,
            default: 'dark:tw-bg-moon-800 dark:tw-border-moon-700'
        }
    },
    name: 'card-component'
}
</script>
