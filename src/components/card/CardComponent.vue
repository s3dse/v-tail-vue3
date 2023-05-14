<template>
    <div class="tw-card">
        <slot></slot>
    </div>
</template>
<script>
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
export default {
    name: 'card-component'
}
</script>
