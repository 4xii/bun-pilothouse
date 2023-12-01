<template>
  <div class="card-container w-100% h-100vh flex flex-center">
    <div class="carousel">
    <button v-if="active > 0" class="nav left" @click="setActive(active - 1)">
      <div class="i-carbon-chevron-left"></div>
    </button>
    <div v-for="(item, i) in items" :key="i" class="card-container" :style="cardContainerStyle(i)">
      <div class="card">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </div>
    </div>
    <button v-if="active < count - 1" class="nav right" @click="setActive(active + 1)">
      <div class="i-carbon-chevron-right"></div>
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, StyleValue } from 'vue';
const active = ref(2);
const items = ref([
  {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }, {
    title: '施工中🚧',
    content: 'wait a m'
  }
]);


const count = computed(() => items.value.length);
const MAX_VISIBILITY = 3;

const setActive = (newActive: number) => {
  active.value = newActive;
};

const cardContainerStyle = (i: number):StyleValue => ({
  '--active': i === active.value ? 1 : 0,
  '--offset': (active.value - i) / 3,
  '--direction': Math.sign(active.value - i),
  '--abs-offset': Math.abs(active.value - i) / 3,
  'pointer-events': active.value === i ? 'auto' : 'none',
  'opacity': Math.abs(active.value - i) >= MAX_VISIBILITY ? '0' : '1',
  'display': Math.abs(active.value - i) > MAX_VISIBILITY ? 'none' : 'block',
});

</script>

<style lang="scss" scoped>
$color-purple: #8B5CF6;
$color-pink: #EC4899;
$color-gray: #9CA3AF;
$color-black: #1F2937;
$card-size: 23rem;

.card-container {
  background-image: linear-gradient(45deg, $color-purple, $color-pink);
  font-family: 'Montserrat', sans-serif;
}

.carousel {
  position: relative;
  width: $card-size;
  height: $card-size;
  perspective: 500px;
  transform-style: preserve-3d;
}

.card-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: 
    rotateY(calc(var(--offset) * 50deg)) 
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -30rem))
    translateX(calc(var(--direction) * -5rem));
  filter: blur(calc(var(--abs-offset) * 1rem));
  transition: all 0.3s ease-out;
}

.card {
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: hsl(280deg, 40%, calc(100% - var(--abs-offset) * 50%));
  border-radius: 1rem;
  color: $color-gray;
  text-align: justify;
  transition: all 0.3s ease-out;
  
  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 0 0.7em;
    color: $color-black;
  }
  
  p, h2 {
    transition: all 0.3s ease-out;
    opacity: var(--active);
  }
}

.nav {
  color: white;
  font-size: 5rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  z-index: 2;
  cursor: pointer;
  user-select: none;
  background: unset;
  border: unset;
  
  &.left {
    transform: translateX(-100%) translatey(-50%);
  }
  
  &.right {
    right: 0;
    transform: translateX(100%) translatey(-50%);
  }
}
</style>
