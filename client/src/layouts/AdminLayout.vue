<template>
  <div>
    <div class="container">
      <!-- Admin Header -->
      <HeaderAdmin />

      <!-- Admin Page content -->
      <main class="main">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import HeaderAdmin from '../components/HeaderAdmin.vue'
import Footer from '../components/Footer.vue'
</script>
