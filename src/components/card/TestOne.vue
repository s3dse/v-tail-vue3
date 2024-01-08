<script setup>
defineProps({
    message: {
        type: String
    }
})
</script>
<template><div class="un-text-gray-900 dark:un-text-gray-100">{{ message }}</div></template>