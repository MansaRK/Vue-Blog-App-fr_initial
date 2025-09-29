<template>
  <div class="contact">
    <h1>Contact</h1>
    <p>Send us a message and we’ll get back to you.</p>

    <form @submit.prevent="submitForm">
      <label for="name"><b>Name</b></label>
      <input
        type="text"
        id="name"
        v-model="name"
        placeholder="Enter your name"
        required
      />

      <label for="email"><b>Email</b></label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />

      <label for="message"><b>Message</b></label>
      <textarea
        id="message"
        v-model="message"
        cols="50"
        rows="5"
        placeholder="Write your message"
        required
      ></textarea>

      <input type="submit" value="Send" class="btn" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

async function submitForm() {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })

    if (res.ok) {
      alert('Message sent successfully!')
      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      alert('Failed to send message')
    }
  } catch (err) {
    console.error('Error submitting form:', err)
  }
}
</script>

<style scoped>
.contact {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: rgba(25, 25, 45, 0.9); 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}

.contact:hover {
  box-shadow: 
    0 0 10px var(--neon-blue),
    0 0 20px var(--neon-pink),
    0 0 40px var(--neon-blue);
  transform: translateY(-6px);
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 0 8px var(--neon-blue), 0 0 15px var(--neon-pink);
}

p {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--gray-light);
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

textarea {
  resize: none;      
  height: 150px;     
  overflow-y: auto;   
  line-height: 1.5;
}

textarea::-webkit-scrollbar {
  width: 10px; 
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05); 
  border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb {
  background: var(--neon-blue);
  border-radius: 8px;
  box-shadow: 0 0 6px var(--neon-pink);
}

textarea::-webkit-scrollbar-thumb:hover {
  background: var(--neon-pink);
  box-shadow: 0 0 8px var(--neon-blue);
}


input:focus,
textarea:focus {
  box-shadow: 0 0 8px var(--neon-blue), 0 0 12px var(--neon-pink);
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
  box-shadow: 0 0 8px var(--neon-pink), 0 0 15px var(--neon-blue);
  transform: scale(1.05);
}
</style>

