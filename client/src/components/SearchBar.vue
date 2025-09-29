<template>
  <div class="searchBar">
    <div class="container">
      <form @submit.prevent="onSearch" class="search__form" role="search">
        <input
          type="search"
          aria-label="Search"
          id="searchInput"
          name="searchTerm"
          placeholder="Search the site..."
          v-model="searchTerm"
        />
      </form>
      <div id="searchClose">Close</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchTerm = ref('')
const router = useRouter()

function onSearch() {
  if (searchTerm.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchTerm.value)}`)
  }
}
</script>
