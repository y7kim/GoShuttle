<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import Map from './components/Map.vue'
import RallyList from './components/RallyList.vue';
</script>

<template>
  <AppHeader />
  <div class="sm:flex sm:justify-between p-10 flex-row-reverse">
    <RallyList />
    <Map />
  </div>
</template>

<style scoped>
</style>
