<template>
  <div class="member-description">
    <img :src="member.avatar" alt="Member Avatar" class="avatar">
    <div>
        <h2>{{ member.name }}</h2>
        <p>{{ member.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
  member: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.member-description {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 10%;
  margin-bottom: 1rem;
}
</style>