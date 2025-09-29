<template>
  <div>
    <div class="author">
      <h1 class="author__heading">Search Results</h1>
    </div>

    <section class="articles">
      <ul class="article-ul">
        <li v-for="post in results" :key="post._id">
          <RouterLink :to="`/post/${post._id}`">
            <span>{{ post.title }}</span>
            <span class="article-list__date">
              {{ new Date(post.createdAt).toDateString() }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <p v-if="results.length === 0">No results found.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const results = ref([])
const route = useRoute()

async function fetchResults(term) {
  if (!term) {
    results.value = []
    return
  }
  try {
    const res = await fetch(`http://localhost:5000/api/search?term=${encodeURIComponent(term)}`)
    const data = await res.json()
    results.value = data.data  
  } catch (err) {
    console.error('Error fetching search results:', err)
  }
}

// fetch whenever query changes
watch(() => route.query.q, (newTerm) => {
  fetchResults(newTerm)
}, { immediate: true })
</script>


