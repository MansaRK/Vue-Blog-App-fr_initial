<template>
  <div class="add-post">
    <RouterLink to="/admin/dashboard" class="back-link">&larr; Back</RouterLink>

    <div class="admin-title">
      <h2>Add New Post</h2>
    </div>

    <form @submit.prevent="submitPost">
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
        ref="textarea"
        placeholder="Write your post content..."
        required
      ></textarea>

      <input type="submit" value="Add" class="btn" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const body = ref('')
const textarea = ref(null)
const router = useRouter()

// Auto-expand textarea until max height
watch(body, () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto'
    textarea.value.style.height =
      Math.min(textarea.value.scrollHeight, 300) + 'px'
  }
})

async function submitPost() {
  try {
    const res = await fetch('/api/admin/add-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.value, body: body.value }),
      credentials: 'include'
    })

    if (res.ok) {
      router.push('/admin/dashboard') // redirect after success
    } else {
      console.error('Failed to add post')
    }
  } catch (err) {
    console.error('Error submitting post:', err)
  }
}
</script>

<style scoped>
.add-post {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(25, 25, 45, 0.9);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}

.add-post:hover {
  box-shadow: 0 0 10px var(--neon-blue),
    0 0 20px var(--neon-pink),
    0 0 40px var(--neon-blue);
  transform: translateY(-6px);
}

.back-link {
  display: inline-block;
  margin-bottom: 1rem;
  color: var(--neon-blue);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--neon-pink);
}

.admin-title h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 8px var(--neon-blue), 0 0 15px var(--neon-pink);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 1rem;
  color: var(--neon-blue);
  font-weight: 600;
}

input,
textarea {
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

/* Auto-expand textarea */
textarea {
  min-height: 150px;
  max-height: 150px;
  resize: none;
  overflow-y: auto;
  line-height: 1.5;
}

/* Custom scrollbar */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb {
  background: var(--neon-blue);
  border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: var(--neon-pink);
}

input:focus,
textarea:focus {
  box-shadow: 0 0 8px var(--neon-blue),
    0 0 12px var(--neon-pink);
  transform: scale(1.02);
}

.btn {
  margin-top: 1.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: var(--neon-blue);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background: var(--neon-pink);
  box-shadow: 0 0 8px var(--neon-pink),
    0 0 15px var(--neon-blue);
  transform: scale(1.05);
}
</style>
