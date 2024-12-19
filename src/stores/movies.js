import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movies: [],
    filmesacao: [],
    filmesaventura: [],
    filmescomedia: [],
    filmesdocumentario: [],
    series: [],
    tvshows: [],
    currentMovie: null,
  })

  const movies = computed(() => state.movies)

  const listMovies = async (genreId) => {
    for (let i = 1; i <= 5; i++) {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: genreId,
          language: 'pt-BR',
          page: i,
        },
      })
      console.log(response)
      state.movies = [...state.movies, ...response.data.results]
    }
  }

  const getMoreMovies = async () => {
    const genres = [
      { id: 35, name: 'comedia' },
      { id: 12, name: 'aventura' },
      { id: 28, name: 'acção' },
      { id: 99, name: 'documento' },
    ]
    for (let i = 1; i <= genres.length; i++) {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: genres[i - 1],
          language: 'pt-BR',
          page: i,
        },
      })
      switch (genres[i - 1].name) {
        case 'acção':
          state.filmesacao = [...state.filmesacao, response.data.results]
          break

        case 'aventura':
          state.filmesaventura = [...state.filmesaventura, response.data.results]
          break

        case 'documento':
          state.filmesdocumentario = [...state.filmesdocumentario, response.data.results]
          break

        case 'comedia':
          state.filmescomedia = [...state.filmescomedia, response.data.results]
          break
      }
    }
  }

  return { movies, listMovies, getMoreMovies }
})
