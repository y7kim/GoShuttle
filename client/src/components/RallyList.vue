<script setup lang="ts">
import { useRallyStore } from '../stores/rally';

const store = useRallyStore();

</script>

<template>
  <ul v-if="store.rallies.length" role="list" class="divide-y divide-gray-100 sm:w-1/4 w-full">
    <li v-for="rally in store.rallies" class="flex justify-between gap-x-6 p-5">
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">{{ rally.username }}</p>
          <p class="mt-1 text-xs leading-5 text-gray-500">{{ rally.skillLevel }}</p>
        </div>
      </div>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
        <p v-if="rally.free" class="text-sm leading-6 text-green-900">Free</p>
        <p v-if="!rally.free" class="text-sm leading-6 text-red-900">${{ rally.cost }}</p>
        <p class="text-sm leading-6 text-gray-900">Capacity: {{ rally.capacity }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">created {{ rally.diffMin }}m ago</p>
      </div>
    </li>
  </ul>
  <p class="sm:w-1/4 w-full text-center" v-if="!store.rallies.length">No Rallies found.</p>
</template>

<style scoped></style>
