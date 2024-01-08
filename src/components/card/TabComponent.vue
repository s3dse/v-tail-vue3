<template>
    <li class="">
        {{ title }}
    </li>
</template>
<script setup>
defineProps({
    title: {
        type: String
    }
})
</script>
