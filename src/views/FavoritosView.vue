<script setup>
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()

const favorites = computed(() => movieStore.favorites) // Lista de favoritos

const removeFromFavorites = (item) => {
  movieStore.unfavoriteMovie(item)
}

const getItemTitle = (item) => {
  return item.title || item.name || 'Sem título'
}
</script>

<template>
  <div>
    <h1>Favoritos</h1>
    <div v-if="favorites.length === 0">
      <p>Você ainda não tem favoritos.</p>
    </div>
    <div v-else class="movie-list">
      <div v-for="item in favorites" :key="item.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" :alt="getItemTitle(item)" />
        <div class="movie-details">
          <p class="movie-title">{{ getItemTitle(item) }}</p>
          <p class="movie-release-date">{{ item.release_date || item.first_air_date || 'Data desconhecida' }}</p>
          <div class="movie-buttons">
            <button @click="watchMovie(item)" class="movie-button watch-button">Assistir</button>
            <button @click="removeFromFavorites(item)" class="movie-button remove-from-favorites-button">Remover dos Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 0 1rem;
}

.movie-card {
  width: 100%;
  max-width: 15rem;
  height: 36rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #131819;
  color: white;
}

h1 {
  text-align: center;
  color: #070707;
  font-size: 2rem;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0.5rem;
  text-align: center;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-buttons {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.movie-button {
  padding: 0.6rem;
  border-radius: 0.5rem;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.watch-button {
  background-color: #387250;
}

.watch-button:hover {
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.remove-from-favorites-button {
  background-color: #d32f2f;
}

.remove-from-favorites-button:hover {
  background-color: #e57373;
  box-shadow: 0 0 0.5rem #d32f2f;
}
</style>
