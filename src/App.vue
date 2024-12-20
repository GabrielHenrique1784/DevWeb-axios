<template>
  <main>
    <aside>
      <h1>MED</h1>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/filmes">Movies</router-link></li>
        <li><router-link to="/favoritos">Favoritos</router-link></li>
        <li><router-link to="/tv">Tv</router-link></li>
      </ul>
      <button>Logout</button>
    </aside>
    <section>
      <RouterView />
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex; 
}

aside {
  background-color: #161718;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
  position: fixed; 
  top: 0;
  left: 0;
  height: 100vh; 
  width: 20%; 
  z-index: 10; 
}

h1 {
  color: #fff;
  margin-bottom: 2rem;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  width: 100%;
  padding: 1rem;
  transition: 0.5s ease-in-out;
  text-align: center;
}

li:hover {
  background-color: #fff;
  color: #161718;
}

li:hover a {
  background-color: #fff;
  color: #161718;
}

a {
  text-decoration: none;
  color: #fff;
  display: block;
  width: 100%;
  height: 100%;
  transition: 0.5s ease-in-out;
}

a:hover {
  background-color: #131718;
  color: #fff;
}

button {
  background-color: #161718;
  color: #fff;
  border: 1px solid #fff;
  padding: 1rem;
  width: 100%;
  transition: 0.5s ease-in-out;
  margin-top: auto;
}

button:hover {
  background-color: #fff;
  color: #161718;
  cursor: pointer;
}

section {
  margin-left: 20%; 
  width: 80%; 
  height: 100vh;
  overflow-y: auto; 
}
</style>
