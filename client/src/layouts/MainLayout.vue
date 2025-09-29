<template>
  <div>
    <!-- Search -->
    <SearchBar />

    <div class="container">
      <!-- Header -->
      <Header />

      <!-- Page content -->
      <main class="main">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import SearchBar from '../components/SearchBar.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<!-- CSS + JS -->
<!-- You can still keep global CSS in /public/css/style.css and load it in index.html -->
