<template>
  <div v-if="post" class="post-container">
    <h1 class="post-title">{{ post.title }}</h1>
    <article class="post-body" v-html="post.body"></article>
  </div>

  <div v-else class="loading">
    <p>Loading post...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${route.params.id}`, {
      credentials: 'include'
    })
    const data = await res.json()
    post.value = data.data
  } catch (err) {
    console.error('Failed to fetch post:', err)
  }
})
</script>

<style scoped>
.post-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(25, 25, 45, 0.95);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.post-container:hover {
  box-shadow: 0 0 15px var(--neon-blue),
              0 0 25px var(--neon-pink);
  transform: translateY(-3px);
}

/* Title centered */
.post-title {
  font-family: 'Orbitron', sans-serif;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 8px var(--neon-blue),
               0 0 15px var(--neon-pink);
}

/* Content body */
.post-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #ddd;
  text-align: justify;
  text-indent: 2em;
  white-space: pre-line;
}

/* Loading state */
.loading {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #aaa;
}
</style>
