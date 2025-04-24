<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { rallyAPI } from '../helpers/Rally.api';
import { useRallyStore } from '../stores/rally';

let capacity = ref<number>(1);
let skillLevel = ref<string>('BEGINNER');
let free = ref<boolean>(true);
let cost = ref<number>();
let vehicle = ref<{
  make: string,
  color: string
}>({
  make: '',
  color: ''
});
let username = ref<string>();

const store = useRallyStore();

async function createRally(): Promise<void> {
  const [error, rally] = await rallyAPI.saveRally({
    location: {
      coordinates: [
        store.currentLocation?.lng,
        store.currentLocation?.lat
      ]
    },
    capacity: capacity.value,
    skillLevel: skillLevel.value,
    time: new Date(),
    free: free.value,
    cost: cost.value,
    vehicle: vehicle.value,
    username: username.value
  });
}

</script>

<template>
  <form>
    <p>Capacity</p>
    <input v-model="capacity" type="text" />
    <p>Skill Level</p>
    <select v-model="skillLevel">
      <option selected value="BEGINNER">Beginner</option>
      <option value="INTERMEDIATE">Intermediate</option>
      <option value="ADVANCED">Advanced</option>
    </select>
    <p>Free</p>
    <input type="checkbox" v-model="free" />
    <p v-if="free === false">Cost</p>
    <input v-if="free === false" v-model="cost" type="text"></input>
    <p>Vehicle Make</p>
    <input v-model="vehicle.make" type="text" />
    <p>Vehicle Color</p>
    <input v-model="vehicle.color" type="text" />
    <p>Username</p>
    <input v-model="username" type="text" />
    <p>
      <button type="button" @click="createRally()">Create Rally</button>
    </p>
  </form>
</template>

<style scoped></style>
