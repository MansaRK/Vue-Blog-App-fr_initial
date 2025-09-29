<template>
  <div class="about-container">
    <div class="about">
      <h1 class="about-title">About</h1>
    </div>

    <div class="about-paragraphs">
      <p>
        Welcome to <span class="highlight">Bit by Bit</span> — more than just a blog, it’s a
        journey of discovery. Here, technology meets creativity, and every post
        is a small step toward learning, building, and growing.
      </p>

      <p>
        From <span class="highlight">coding insights</span> and <span class="highlight">tech experiments</span>
        to <span class="highlight">personal reflections</span>, this space is designed to inspire
        curiosity and spark ideas. Each story is a byte of experience worth
        sharing, written with both passion and purpose.
      </p>

      <p>
        But beyond codes and projects, Bit by Bit is also a personal corner —
        where thoughts turn into words, and moments find meaning. It’s about
        connecting ideas, embracing challenges, and sharing the ups and downs
        that shape the person behind the screen.
      </p>

      <p>
        Whether you’re here to <span class="highlight">learn something new</span>, stay
        <span class="highlight">inspired</span>, or simply take a moment to reflect, you’re part of this
        growing community. Together, we move forward — bit by bit.
      </p>

      <p class="closing">~The Bit by Bit Team ♡</p>
    </div>
  </div>
</template>

<script setup>
// static content only
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 3rem 2rem;
  color: var(--gray-light);
  font-family: 'Poppins', sans-serif;
  line-height: 1.7;
  background-color: rgba(20, 20, 40, 0.9); 
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  transition: all 0.4s ease-in-out;
}

.about-container:hover {
  box-shadow: 
    0 0 10px var(--neon-blue),
    0 0 20px var(--neon-pink),
    0 0 40px var(--neon-blue);
  transform: translateY(-8px);
}

/* Title styling */
.about-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 0 8px var(--neon-blue), 0 0 15px var(--neon-pink);
}

/* Paragraphs */
.about-paragraphs p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  text-indent: 2em; 
  text-align: justify; 
}

.about-paragraphs p:hover {
  color: var(--neon-pink);
}


.highlight {
  color: var(--neon-blue);
  font-weight: 600;
  text-shadow: 0 0 5px var(--neon-blue);
}

/* Closing signature */
.closing {
  text-align: right;
  margin-top: 2rem;
  font-style: italic;
  font-weight: 600;
  color: #00d9ff;
  
}
</style>


