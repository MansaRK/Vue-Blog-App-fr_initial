<template>
  <div class="posts-container">
    <div class="admin-title">
      <h2>Posts</h2>

      <!-- Show + Add New button only if logged in -->
      <RouterLink 
        v-if="isLoggedIn" 
        to="/admin/add-post" 
        class="btn add-btn">
        + Add New
      </RouterLink>

      <!-- Show message if not logged in -->
      <p v-else class="login-required-message">
        You must be logged in to see posts.
      </p>
    </div>

    <!-- Show posts only if logged in and there are posts -->
    <ul class="admin-posts" v-if="isLoggedIn && posts.length">
      <li v-for="post in posts" :key="post._id" class="post-item">
        <RouterLink :to="`/post/${post._id}`" class="post-link">
          {{ post.title }} &nearr;
        </RouterLink>

        <div class="admin-post-controls">
          <RouterLink :to="`/admin/edit-post/${post._id}`" class="icon-btn edit-btn" title="Edit Post">
            <i class="fas fa-edit"></i>
          </RouterLink>

          <button @click="deletePost(post._id)" class="icon-btn delete-btn" title="Delete Post">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </li>
    </ul>

    <!-- Show a placeholder if no posts -->
    <p v-if="isLoggedIn && posts.length === 0" class="no-posts">No posts available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const posts = ref([])
const isLoggedIn = ref(false)
const router = useRouter()

onMounted(async () => {
  await checkAuthStatus()
  if (isLoggedIn.value) {
    await fetchPosts()
  }
})

async function checkAuthStatus() {
  try {
    const res = await fetch('/api/admin/check-auth', {
      method: 'GET',
      credentials: 'include',
    })
    const json = await res.json()
    isLoggedIn.value = json.loggedIn
  } catch (err) {
    console.error('Auth check failed:', err)
    isLoggedIn.value = false
  }
}

async function fetchPosts() {
  try {
    const res = await fetch('/api/admin/dashboard', {
      credentials: 'include',
    })
    const json = await res.json()
    posts.value = json.posts
  } catch (err) {
    console.error('Error loading posts:', err)
  }
}

async function deletePost(id) {
  if (!confirm('Are you sure you want to delete this post?')) return
  try {
    const res = await fetch(`/api/admin/delete-post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) {
      posts.value = posts.value.filter(p => p._id !== id)
    } else {
      console.error('Delete failed')
    }
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}
</script>

<style scoped>
.posts-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(25, 25, 45, 0.9);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}

.posts-container:hover {
  box-shadow: 0 0 10px var(--neon-blue),
              0 0 20px var(--neon-pink),
              0 0 40px var(--neon-blue);
  transform: translateY(-6px);
}

.admin-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-title h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 8px var(--neon-blue),
               0 0 15px var(--neon-pink);
}

.login-required-message {
  color: #f44336;
  font-weight: bold;
  margin-top: 10px;
}

.admin-posts {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.post-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
  box-shadow: 0 0 8px var(--neon-blue),
              0 0 12px var(--neon-pink);
}

.post-link {
  color: var(--neon-blue);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-link:hover {
  color: var(--neon-pink);
}

.admin-post-controls {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.add-btn {
  background: var(--neon-blue);
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
}

.add-btn:hover {
  background: var(--neon-pink);
  box-shadow: 0 0 8px var(--neon-pink),
              0 0 15px var(--neon-blue);
}

.edit-btn {
  background: var(--neon-blue);
  color: #fff;
}

.edit-btn:hover {
  background: var(--neon-pink);
  box-shadow: 0 0 6px var(--neon-pink);
}

.delete-btn {
  background: #f44336;
  color: #fff;
}

.delete-btn:hover {
  background: #ff1a1a;
  box-shadow: 0 0 6px #f44336;
}

.no-posts {
  text-align: center;
  color: var(--gray-light);
  margin-top: 1rem;
}
</style>
