<template>
    <div class="text-h4" :class="{'mb-5': hasMargin}">{{ text }}</div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        hasMargin: {
            type: Boolean,
            default: true
        }
    }
}
</script>