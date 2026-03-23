<template>
    <div class="card">
        {{ title }}
        <div class="card-content">
            {{ content }}
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
});

const refreshContent = () => {
    // Implementation for refreshing content

};

refreshContent();

</script>

<style scoped>
.card {
    background-color: var(--background-color);
    border-radius: 8px;
    box-shadow: 0 2px 4px var(--shadow-color);
    padding: 16px;
    margin: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>