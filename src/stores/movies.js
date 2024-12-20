import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movies: [],  
    favorites: [], 
    loading: false, 
    error: null,  
  })

  const movies = computed(() => state.movies)
  const favorites = computed(() => state.favorites)

  const listMovies = async (genreId) => {
    state.loading = true
    state.error = null
    state.movies = []  

    try {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: genreId,
          language: 'pt-BR',
          page: 1,
        },
      })
      state.movies = response.data.results
    } catch (err) {
      state.error = 'Erro ao carregar filmes'
    } finally {
      state.loading = false
    }
  }

  const getMoreMovies = async () => {
    state.loading = true
    state.error = null

    try {
      const genres = [
        { id: 35, name: 'comedia' },
        { id: 12, name: 'aventura' },
        { id: 28, name: 'acção' },
        { id: 99, name: 'documento' },
      ]
      let allMovies = []
      
      for (let i = 1; i <= genres.length; i++) {
        const response = await api.get('discover/movie', {
          params: {
            with_genres: genres[i - 1].id,
            language: 'pt-BR',
            page: i,
          },
        })
        allMovies = [...allMovies, ...response.data.results]
      }

      state.movies = allMovies.slice(0, 30)  
    } catch (err) {
      state.error = 'Erro ao carregar filmes'
    } finally {
      state.loading = false
    }
  }

  const favoriteMovie = (movie) => {
    if (!state.favorites.find(fav => fav.id === movie.id)) {
      state.favorites.push(movie)
      alert(`Filme "${movie.title}" adicionado aos favoritos!`)
    } else {
      alert(`O filme "${movie.title}" já está nos favoritos!`)
    }
  }

  const unfavoriteMovie = (movie) => {
    const index = state.favorites.findIndex(fav => fav.id === movie.id)
    if (index !== -1) {
      state.favorites.splice(index, 1)
      alert(`Filme "${movie.title}" removido dos favoritos!`)
    } else {
      alert(`O filme "${movie.title}" não está nos favoritos!`)
    }
  }

  const isFavorite = (movie) => {
    return state.favorites.some(fav => fav.id === movie.id)
  }

  return { 
    movies, 
    favorites, 
    listMovies, 
    getMoreMovies, 
    favoriteMovie, 
    unfavoriteMovie, 
    isFavorite 
  }
})
