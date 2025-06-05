<script setup>
defineProps({
    message: {
        type: String
    }
})
</script>
<template><div class="text-gray-900 dark:text-gray-100">{{ message }}</div></template>