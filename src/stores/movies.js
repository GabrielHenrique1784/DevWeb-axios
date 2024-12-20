import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movies: [],  // Lista de filmes para o gênero selecionado
    favorites: [],  // Lista de filmes favoritos
    loading: false,  // Estado para controlar o carregamento
    error: null,  // Mensagem de erro
  })

  const movies = computed(() => state.movies)
  const favorites = computed(() => state.favorites)

  // Função para listar filmes por gênero
  const listMovies = async (genreId) => {
    state.loading = true
    state.error = null
    state.movies = []  // Limpa a lista de filmes antes de buscar

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

  // Função para buscar mais filmes por gênero
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
      
      // Busca filmes por gênero
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

      state.movies = allMovies.slice(0, 30)  // Limita a 30 filmes
    } catch (err) {
      state.error = 'Erro ao carregar filmes'
    } finally {
      state.loading = false
    }
  }

  // Função para favoritar um filme
  const favoriteMovie = (movie) => {
    if (!state.favorites.find(fav => fav.id === movie.id)) {
      state.favorites.push(movie)
      alert(`Filme "${movie.title}" adicionado aos favoritos!`)
    } else {
      alert(`O filme "${movie.title}" já está nos favoritos!`)
    }
  }

  // Função para desfavoritar um filme
  const unfavoriteMovie = (movie) => {
    const index = state.favorites.findIndex(fav => fav.id === movie.id)
    if (index !== -1) {
      state.favorites.splice(index, 1)
      alert(`Filme "${movie.title}" removido dos favoritos!`)
    } else {
      alert(`O filme "${movie.title}" não está nos favoritos!`)
    }
  }

  // Função para verificar se um filme está nos favoritos
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
