<template>
    <h1>Map</h1>
    <div :id="mapView"></div>
</template>

<style scoped>

</style>

<script>
import { ref } from 'vue';
import MapView from '../components/MapView.vue';

const mapView = ref('map-view');

export default {
    components: {
        MapView
    }
}

</script>
