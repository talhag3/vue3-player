import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const usePlayerStore = defineStore('player', () => {
  // State
  const trackList = ref([
    {
      title: 'Serenity',
      artist: 'Piano and Strings',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      title: 'Energetic Beats',
      artist: 'Drum and Bass Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      title: 'Smooth Jazz',
      artist: 'Sax and Keys',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
      title: 'Classical Symphony',
      artist: 'Orchestra Ensemble',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
      title: 'Electronic Dreams',
      artist: 'Synthwave Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
    {
      title: 'Ambient Relaxation',
      artist: 'Chillout Lounge',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    },
    {
      title: 'Country Folk',
      artist: 'Acoustic Guitar Trio',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    },
    {
      title: 'Rocking Blues',
      artist: 'Electric Guitar Band',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    },
    {
      title: 'Hip Hop Beats',
      artist: 'Rap Collective',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    },
    {
      title: 'Reggae Vibes',
      artist: 'Island Rhythms',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    },
  ]);

  const currentTrackIndex = ref(0);
  const progress = ref(0);
  const isPlaying = ref(false);
  const audio = ref(null);
  const error = ref(null);

  // Getters
  const currentTrack = computed(() => trackList.value[currentTrackIndex.value] || null);

  // Watchers
  watch(currentTrack, () => {
    if (audio.value) {
      audio.value.pause(); // Stop previous track
    }
    if (currentTrack.value) {
      audio.value = new Audio(currentTrack.value.url);
      audio.value.ontimeupdate = () => {
        progress.value = audio.value.currentTime;
      };
      audio.value.onended = playNext; // Auto-play next track when current finishes
    }
  });

  // Actions
  const togglePlay = () => {
    if (!currentTrack.value) {
      error.value = 'No track available to play.';
      return;
    }
    if (isPlaying.value) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
    isPlaying.value = !isPlaying.value;
    error.value = null; // Clear any existing errors
  };

  const playPrevious = () => {
    if (currentTrackIndex.value > 0) {
      currentTrackIndex.value -= 1;
      progress.value = 0;
      isPlaying.value = false;
      togglePlay(); // Automatically play the previous track
    } else {
      error.value = 'This is the first track.';
    }
  };

  const playNext = () => {
    if (currentTrackIndex.value < trackList.value.length - 1) {
      currentTrackIndex.value += 1;
      progress.value = 0;
      isPlaying.value = false;
      togglePlay(); // Automatically play the next track
    } else {
      error.value = 'This is the last track.';
    }
  };

  const seek = (newProgress) => {
    if (audio.value && currentTrack.value) {
      audio.value.currentTime = newProgress;
      progress.value = newProgress;
    }
  };

  const selectTrack = (index) => {
    if (index >= 0 && index < trackList.value.length) {
      currentTrackIndex.value = index;
      progress.value = 0;
      isPlaying.value = false;
      togglePlay(); // Automatically play the selected track
    }
  };

  return {
    trackList,
    currentTrackIndex,
    progress,
    isPlaying,
    error,
    currentTrack,
    togglePlay,
    playPrevious,
    playNext,
    seek,
    selectTrack,
  };
});
