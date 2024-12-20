<template>
    <div v-if="movieStore.loading">Carregando filmes...</div>
    <div class="hero-carousel" v-else>
      <div
        class="carousel-container"
        :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/w1280' + images[currentIndex] + ')' }"
      ></div>
  
      <div class="carousel-overlay">
        <div class="carousel-content">
          <h1>{{ movieStore.movies[currentIndex]?.title }}</h1>
          <p class="release-year">
            {{ movieStore.movies[currentIndex]?.release_date?.slice(0, 4) }}
          </p>
          <div class="buttons">
            <button @click="watchMovie" class="green">Assistir</button>
            <button @click="toggleFavorite(movieStore.movies[currentIndex])" :class="{'favorite': isFavorite(movieStore.movies[currentIndex])}" class="trans">
              {{ isFavorite(movieStore.movies[currentIndex]) ? 'Remover dos favoritos' : 'Adicionar à Lista' }}
            </button>
          </div>
        </div>
      </div>
  
      <button @click="prevImage" class="carousel-button prev">←</button>
      <button @click="nextImage" class="carousel-button next">→</button>
  
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="['carousel-dot', { active: index === currentIndex }]"
          @click="goToImage(index)"
        ></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useMovieStore } from '@/stores/movies'
  
  const movieStore = useMovieStore()
  const currentIndex = ref(0)
  
  const images = computed(() => {
    return movieStore.movies.map(movie => movie.backdrop_path)
  })
  
  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }
  
  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
  }
  
  const goToImage = (index) => {
    currentIndex.value = index
  }
  
  const watchMovie = () => {
    console.log("Assistir filme:", movieStore.movies[currentIndex.value].title)
  }
  
  const toggleFavorite = (movie) => {
    if (isFavorite(movie)) {
      movieStore.unfavoriteMovie(movie)
    } else {
      movieStore.favoriteMovie(movie)
    }
  }
  
  const isFavorite = (movie) => {
    return movieStore.isFavorite(movie)
  }
  
  onMounted(async () => {
    await movieStore.getMoreMovies()
  })
  </script>
  
<style scoped>
*,
*::before,
*::after {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}

.hero-carousel {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.carousel-container {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.5s ease-in-out;
}

.carousel-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel-content {
    color: white;
    text-align: center;
    max-width: 70%;
}

h1 {
    font-size: 3rem;
    margin: 0;
}

.release-year {
    font-size: 1.2rem;
    margin: 10px 0;
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.green {
    background-color: #4caf50;
    color: white;
    border: none;
    transition: 0.3s ease-in-out;
}

.green:hover {
    background-color: #409444;
}

.trans {
    background-color: #070707;
    color: #c1c1c1;
    border: none;
    border: 1px solid #c1c1c1;
    transition: 0.3s ease-in-out;
}

.trans:hover {
    background-color: #c1c1c1;
    color: black;
}

.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2rem;
    border: none;
    padding: 15px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
}

.carousel-button.prev {
    left: 20px;
}

.carousel-button.next {
    right: 20px;
}

.carousel-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
}

.carousel-dot {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    cursor: pointer;
}

.carousel-dot.active {
    background-color: #fff;
}
</style>
