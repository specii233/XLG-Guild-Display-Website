<template>
    <div class="autoTurnBar" ref="autoTurnBar">
        <div 
        class="autoTurnPage" 
        v-for="(page, pageIndex) in paginatedData" 
        :key="pageIndex"
        >
            <div class="item-grid">
                <div
                v-for="(item, itemIndex) in page"
                :key="itemIndex"
                class="item-card"
                >
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                </div>
            </div>
        </div>

        <button @click="prevPage" :disabled="currentPage === 0">Prev</button>
        <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPage - 1">Next</button>
    </div>
</template>

<script setup>
    import { ref, reactive } from "vue";

    class AutoTurn {
        constructor(content) {
            this.content = content;
            this.layout();
            this.$ref.autoTurnBar = ref(null);
        }

        layout() {
            
        }
    }
</script>
