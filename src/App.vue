<script setup>
import { computed } from 'vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const error = computed(() => playerStore.error);
const currentTrack = computed(() => playerStore.currentTrack);
const currentTrackIndex = computed(() => playerStore.currentTrackIndex);
const trackList = computed(() => playerStore.trackList);
const progress = computed(() => playerStore.progress);
const isPlaying = computed(() => playerStore.isPlaying);

const togglePlay = () => playerStore.togglePlay();
const playPrevious = () => playerStore.playPrevious();
const playNext = () => playerStore.playNext();
const seek = (event) => playerStore.seek(event.target.value);
const selectTrack = (index) => playerStore.selectTrack(index);
</script>


<template>
  <div class="w-full h-screen flex flex-col items-center justify-center p-6 bg-gray-800 text-white">
    <h1 class="text-3xl font-bold mb-8">Music Player</h1>

    <!-- Error Message -->
    <div v-if="error" class="bg-red-500 p-4 mb-4 rounded w-full max-w-md">
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="font-bold">Error</h4>
          <p>{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Current Track -->
    <div class="text-center mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold">{{ currentTrack?.title || 'No Track Playing' }}</h2>
      <p class="text-gray-400">{{ currentTrack?.artist || 'Unknown Artist' }}</p>
    </div>

    <!-- Custom Slider -->
    <div class="relative mb-4 w-full max-w-md">
      <input
        type="range"
        min="0"
        :max="currentTrack?.duration || 100"
        :value="progress"
        @input="seek"
        class="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
      />
    </div>

    <!-- Player Controls -->
    <div class="flex justify-center space-x-4 mb-6 w-full max-w-md">
      <button @click="playPrevious" class="btn">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <button @click="togglePlay" class="btn">
        <svg v-if="!isPlaying" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-5.197-3.034A1 1 0 008 8.944v6.112a1 1 0 001.555.832l5.197-3.034a1 1 0 000-1.664z" />
        </svg>
        <svg v-else class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
        </svg>
      </button>
      <button @click="playNext" class="btn">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>

    <!-- Track List -->
    <h3 class="text-xl font-semibold mb-2">Track List</h3>
    <div class="h-[200px] w-full max-w-md rounded-md border border-gray-700 p-4 overflow-y-auto">
      <div
        v-for="(track, index) in trackList"
        :key="index"
        class="p-2 cursor-pointer hover:bg-gray-700 rounded-md"
        :class="{ 'bg-gray-700': index === currentTrackIndex }"
        @click="selectTrack(index)"
      >
        <p class="font-medium">{{ track.title }}</p>
        <p class="text-sm text-gray-400">{{ track.artist }}</p>
      </div>

      <p v-if="!trackList.length" class="text-gray-400">No tracks found</p>
    </div>
  </div>
</template>

<style scoped>
.btn {
  background-color: #374151;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #4b5563;
}
</style>
