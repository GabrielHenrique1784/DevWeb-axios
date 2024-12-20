<script setup>
import { ref, onMounted } from 'vue'
import { useGenreStore } from '@/stores/genre'
import { useMovieStore } from '@/stores/movies'

const genreStore = useGenreStore()
const movieStore = useMovieStore()
const isLoading = ref(false)

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
  await movieStore.getMoreMovies()
})

const addToFavorites = (movie) => {
  if (movieStore.isFavorite(movie)) {
    movieStore.unfavoriteMovie(movie)
  } else {
    movieStore.favoriteMovie(movie)
  }
}

const watchMovie = (movie) => {
  console.log(`Assistindo ${movie.title}`);
}
</script>

<template>
  <h1>Filmes</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      class="genre-item"
      @click="movieStore.listMovies(genre.id)"
    >
      {{ genre.name }}
    </li>
  </ul>

  <div class="movie-list">
    <div v-for="movie in movieStore.movies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="movieStore.listMovies(genre_id)"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
        <div class="movie-buttons">
          <button @click="watchMovie(movie)" class="movie-button watch-button">Assistir</button>
          <button 
            @click="addToFavorites(movie)" 
            class="movie-button favorite-button" 
            :class="{ 'favorited': movieStore.isFavorite(movie) }"
          >
            {{ movieStore.isFavorite(movie) ? 'Remover dos Favoritos' : 'Favoritar' }}
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
  gap: .75rem;
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

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.movie-genres span:hover {
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
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
