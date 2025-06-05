<template>
    <div class="card" :class="classes">
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
            default: 'dark:bg-moon-800 dark:border-moon-700'
        }
    },
    name: 'card-component'
}
</script>
