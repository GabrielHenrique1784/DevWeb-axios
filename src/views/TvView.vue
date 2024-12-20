<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useGenreStore } from '@/stores/genre'
import { useMovieStore } from '@/stores/movies'

const genreStore = useGenreStore()
const movieStore = useMovieStore()

const tvs = ref([])
const isLoading = ref(false)

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listTvs = async (genreId) => {
  isLoading.value = true
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  })
  tvs.value = response.data.results
  isLoading.value = false
}

const addToFavorites = (tv) => {
  if (movieStore.isFavorite(tv)) {
    movieStore.unfavoriteMovie(tv)
  } else {
    movieStore.favoriteMovie(tv)
  }
}

const watchTv = (tv) => {
  console.log(`Assistindo ${tv.name}`)
}

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      class="genre-item"
      @click="listTvs(genre.id)"
    >
      {{ genre.name }}
    </li>
  </ul>

  <div class="tv-list">
    <div v-for="tv in tvs" :key="tv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name" />
      <div class="tv-details">
        <p class="tv-title">{{ tv.name }}</p>
        <p class="tv-release-date">{{ formatDate(tv.first_air_date) }}</p>
        <p class="tv-genres">
          <span
            v-for="genre_id in tv.genre_ids"
            :key="genre_id"
            @click="listTvs(genre_id)"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
        <div class="tv-buttons">
          <button @click="watchTv(tv)" class="tv-button watch-button">Assistir</button>
          <button 
            @click="addToFavorites(tv)" 
            class="tv-button favorite-button" 
            :class="{ 'favorited': movieStore.isFavorite(tv) }"
          >
            {{ movieStore.isFavorite(tv) ? 'Remover dos Favoritos' : 'Favoritar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #070707;
  color: #fff;
}

h1 {
  text-align: center;
  color: #fff;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #131819;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.genre-item:hover {
  background-color: #3b4448;
  box-shadow: 0 0 0.5rem #131819;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 0 1rem;
}

.tv-card {
  width: 100%;
  max-width: 15rem;
  height: 38rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #131819;
  color: white;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0.5rem;
  text-align: center;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-release-date {
  margin: 0.5rem 0;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.tv-genres span:hover {
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.tv-buttons {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tv-button {
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

.favorite-button {
  background-color: #ff9900; 
}

.favorite-button:hover {
  background-color: #cc7a00;
  box-shadow: 0 0 0.5rem #ff9900;
}

.favorite-button.favorited {
  background-color: #ff6600;
}

.favorite-button.favorited:hover {
  background-color: #cc5200; 
}
</style>
