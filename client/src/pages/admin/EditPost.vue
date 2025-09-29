<template>
  <div class="edit-container">
    <RouterLink to="/admin/dashboard" class="back-link">
      <i class="fas fa-arrow-left"></i> Back
    </RouterLink>

    <div class="admin-title">
      <h2>View / Edit Post</h2>

      <!-- Delete Post -->
      <form @submit.prevent="deletePost">
        <button type="submit" class="btn-action btn-delete">
          <i class="fas fa-trash-alt"></i>
        </button>
      </form>
    </div>

    <!-- Edit Post -->
    <form @submit.prevent="updatePost" class="edit-form">
      <label for="title"><b>Title</b></label>
      <input
        type="text"
        id="title"
        v-model="title"
        placeholder="Post Title"
        required
      />

      <label for="body"><b>Content</b></label>
      <textarea
        id="body"
        v-model="body"
        placeholder="Write your content here..."
        required
      ></textarea>

      <!-- Update aligned left -->
      <div class="update-container">
        <button type="submit" class="btn-action btn-update">
          <i class="fas fa-save"></i> Update
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const title = ref('')
const body = ref('')
const route = useRoute()
const router = useRouter()
const postId = route.params.id

onMounted(async () => {
  try {
    const res = await fetch(`/api/admin/posts/${postId}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    const json = await res.json()

    title.value = json.title || json.data?.title || ''
    body.value = json.body || json.data?.body || ''
  } catch (err) {
    console.error('Error loading post:', err)
  }
})

async function updatePost() {
  try {
    const res = await fetch(`/api/admin/edit-post/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.value, body: body.value }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      console.error('Failed to update post')
    }
  } catch (err) {
    console.error('Error updating post:', err)
  }
}

async function deletePost() {
  if (!confirm('Are you sure you want to delete this post?')) return
  try {
    const res = await fetch(`/api/admin/delete-post/${postId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      console.error('Failed to delete post')
    }
  } catch (err) {
    console.error('Error deleting post:', err)
  }
}
</script>

<style scoped>
.edit-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(25, 25, 45, 0.95);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}

.edit-container:hover {
  box-shadow: 0 0 15px var(--neon-blue),
              0 0 25px var(--neon-pink);
  transform: translateY(-4px);
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  color: var(--neon-blue);
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--neon-pink);
}

.admin-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-title h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #fff;
  text-shadow: 0 0 8px var(--neon-blue),
               0 0 15px var(--neon-pink);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

label {
  font-weight: 600;
  color: #ddd;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
textarea:focus {
  box-shadow: 0 0 6px var(--neon-blue),
              0 0 12px var(--neon-pink);
}

/* Fixed textarea */
textarea {
  height: 150px;
  resize: none;
  overflow-y: auto;
}

/* Custom Scrollbar */
textarea::-webkit-scrollbar {
  width: 8px;
}
textarea::-webkit-scrollbar-thumb {
  background: var(--neon-blue);
  border-radius: 4px;
}
textarea::-webkit-scrollbar-thumb:hover {
  background: var(--neon-pink);
}

/* Buttons */
.btn-action {
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

/* Update button (small, left-aligned) */
.update-container {
  display: flex;
  justify-content: flex-start;
}
.btn-update {
  background: var(--neon-blue);
  color: #fff;
}
.btn-update:hover {
  background: var(--neon-pink);
  box-shadow: 0 0 8px var(--neon-pink),
              0 0 15px var(--neon-blue);
}

/* Delete button (icon only, top-right) */
.btn-delete {
  background: #f44336;
  color: #fff;
  padding: 0.6rem 0.8rem;
}
.btn-delete:hover {
  background: #ff1a1a;
  box-shadow: 0 0 6px #f44336;
}
</style>
