<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import Map from './components/Map.vue'
import RallyList from './components/RallyList.vue';
</script>

<template>
  <AppHeader />
  <div class="sm:flex sm:justify-between items-center h-screen p-16 pt-32">
    <Map />
    <RallyList />
  </div>
</template>

<style scoped>
</style>
