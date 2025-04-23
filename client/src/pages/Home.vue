<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import Map from '../components/Map.vue'
import RallyList from '../components/RallyList.vue';
</script>

<template>
    <AppHeader />
    <div class="flex flex-wrap h-screen pt-32 justify-center">
        <Map />
        <RallyList />
    </div>
</template>

<style scoped></style>
