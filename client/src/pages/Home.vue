<template>
  <div>
    <!-- Author intro -->
    <div class="author">
      <h1 class="author__heading">˙⋆✮ Bits of thoughts, bytes of stories ✮⋆˙</h1>
      <p class="author__body">“A space where technology meets creativity — sharing insights, experiences, and innovations one bit at a time.”</p>
    </div>

    <img
      src="https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg"
      alt="oguri"
      class="hero-image"
      width="981"
      height="528"
    />

    <!-- Articles section -->
    <section class="articles">
      <h2 class="articles__heading">Latest Posts</h2>

      <ul class="article-ul">
        <li v-for="post in posts" :key="post._id">
          <RouterLink :to="`/post/${post._id}`">
            <span>{{ post.title }}</span>
            <span class="article-list__date">
              {{ new Date(post.createdAt).toDateString() }}
            </span>
          </RouterLink>
        </li>
      </ul>

      <!-- Pagination -->
      <div class="pagination-wrapper">
        <div class="pagination-slot">
          <RouterLink
            v-if="nextPage"
            :to="`/?page=${nextPage}`"
            class="pagination"
          >
            &lt; Older Posts 
          </RouterLink>
        </div>
        <div class="pagination-slot"></div>
        <div class="pagination-slot">
          <RouterLink
            v-if="prevPage"
            :to="`/?page=${prevPage}`"
            class="pagination"
          >
            Newer Posts &gt;
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const posts = ref([])
const nextPage = ref(null)
const route = useRoute()
const prevPage = ref(null)
const API_URL = import.meta.env.VITE_API_URL

async function fetchPosts(page) {
  try {
    const res = await fetch(`${API_URL}/api/posts?page=${page}`, {
      credentials: 'include'
    })
    const data = await res.json()
    console.log('Fetched posts:', data)

    posts.value = data.data
    nextPage.value = data.nextPage
    prevPage.value = data.prevPage
  } catch (err) {
    console.error('Failed to fetch posts:', err)
  }
}

onMounted(() => {
  fetchPosts(route.query.page || 1)
})


watch(
  () => route.query.page,
  (newPage) => {
    fetchPosts(newPage || 1)
  }
)
</script>

<style scoped>
/* --- Author Section --- */
.author {
  text-align: center;
  margin: 2rem 0;
}

.author__heading {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #fff;
  text-shadow: 0 0 6px var(--neon-blue), 0 0 12px var(--neon-pink);
}

.author__body {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #bbb;
  font-style: italic;
}

/* --- Hero Image --- */
.hero-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  margin: 1rem auto 2rem auto;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.hero-image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
}

/* --- Articles Section --- */
.articles {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}

.articles__heading {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* --- Article List --- */
.article-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-ul li {
  margin-bottom: 1.2rem;
}

.article-ul li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  text-decoration: none;
  font-size: 1.05rem;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.article-ul li a:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
}

.article-list__date {
  font-size: 0.9rem;
  color: #aaa;
  margin-left: 1rem;
}

/* --- Pagination --- */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.pagination {
  color: var(--neon-blue);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.pagination:hover {
  color: var(--neon-pink);
}
</style>


