<template>
    <div class="un-card" :class="classes">
        <slot name="title">
            <div class="un-py-3 un-flex un-flex-col un-gap-1 un-border-b dark:un-border-moon-700">
                <div class="un-flex un-flex-col un-gap-1 un-ms-4 un-me-1">
                    <div class="un-flex un-gap-1 un-items-baseline">
                        <div class="un-card-title">
                        {{ title }}
                        </div>
                    </div>
                </div>
            </div>
        </slot>
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
            default: 'dark:un-bg-moon-800 dark:un-border-moon-700'
        },
        title: {
            type: String,
            default: null
        }
    },
    name: 'card-component'
}
</script>
