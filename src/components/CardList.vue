<template>
    <div class="card-list">
        <Card
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :content="card.content"
        />
    </div>
</template>

<script setup>
    import Card from './Card.vue';
    import { defineProps, ref } from 'vue';

    const props = defineProps({
        cards: {
            type: Array,
            required: true,
            default: () => []
        }
    });
</script>

<style>

</style>