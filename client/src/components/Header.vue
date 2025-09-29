<template>
  <header class="header">
    <!-- Logo + Text Container -->
    <RouterLink to="/" class="header__logo">
      <div class="logo-container">
        <img :src="logo" alt="UmaBlog Logo" class="logo-img" />
        <span class="logo-text">Bit by  Bit</span>
      </div>
    </RouterLink>

    <nav class="header__nav">
      <ul>
        <li>
          <RouterLink to="/" :class="{ active: route.path === '/' }">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" :class="{ active: route.path === '/about' }">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" :class="{ active: route.path === '/contact' }">Contact</RouterLink>
        </li>
      </ul>
    </nav>

    <div class="header__button">
      <button class="searchBtn" aria-expanded="false">
        <i class="fas fa-search"></i> Search
      </button>
    </div>

  </header>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'
// Import logo using relative path
import logo from '../assets/Bit by Bit_logo.png'

const route = useRoute()
</script>

<style scoped>
.active {
  font-weight: bold;
  text-decoration: none;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 8px; /* space between image and text */
}

.logo-img {
  height: 50px; /* adjust as needed */
  width: auto;
}

.logo-text {
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
}
</style>
