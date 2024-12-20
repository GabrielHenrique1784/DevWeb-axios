<script setup>
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'

const movieStore = useMovieStore()

const favorites = computed(() => movieStore.favorites) // Lista de filmes favoritos

const removeFromFavorites = (movie) => {
  movieStore.unfavoriteMovie(movie)
}
</script>

<template>
  <div>
    <h1>Filmes Favoritos</h1>
    <div v-if="favorites.length === 0">
      <p>Você ainda não tem filmes favoritados.</p>
    </div>
    <div v-else class="movie-list">
      <div v-for="movie in favorites" :key="movie.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ movie.release_date }}</p>
          <div class="movie-buttons">
            <button @click="watchMovie(movie)" class="movie-button watch-button">Assistir</button>
            <button @click="removeFromFavorites(movie)" class="movie-button remove-from-favorites-button">Remover dos Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>
/* Similar ao estilo do componente de filmes, mas com ajustes para a lista de favoritos */
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
