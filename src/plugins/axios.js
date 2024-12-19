import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MTA5YzkwYTUzYjg0YzUwMzNmNGNlOWM5YjZiNDNjYSIsIm5iZiI6MTczMjQwODk1Ny41MTQ5NDQ2LCJzdWIiOiI2NjA1ZjU5YmUxZmFlZDAxN2RmOTdkYTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U0jeqQOjREBywRMBJdLHRGdwyTOpWB-cWTj4mRZKiiw',
  },
})

export default api
