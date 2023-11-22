<template>
  <div class="pink-3d-button-container">
    <a id="pink-button" href="#">
      <span>Let's go!</span>
    </a>
    <span class="ok">Let's go!</span>
  </div>
</template>

<script setup lang="ts" >
import { onMounted } from 'vue';
import { Experience } from './experience';
onMounted(() => {
  const container = document.querySelector('.pink-3d-button-container')
  if (!container) {
    return
  }
  new Experience(container, container.clientWidth, container.clientHeight )
})
</script>
<style lang="scss">
@font-face {
  font-family: "bw";
  src: url("@/assets/woff/pink-button.woff") format("woff");
}
.pink-3d-button-container {
  position: relative;
  width: 500px;
  height: 400px;
  
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4 !important;
    pointer-events: none;
  }

  span {
    position: relative;
    z-index: 2;
    font-family: "bw";
    text-decoration: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    font-size: 36px;
    color: #fff;
    pointer-events: none;
  }

  #pink-button {
    font-family: "bw";
    text-decoration: none;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    font-size: 3rem;
    color: #fff;
    background-color: #acc7ed;
    border-radius: 10rem;
    padding: 1rem 4rem 1rem;

    transform-style: preserve-3d;
    transition: all 0.6s ease;

    span {
      position: relative;
      opacity: 0;
    }

    &:after {
      content: "";
      background: linear-gradient(56deg, #61dafb 0%, #d6cbf6 46%, #f2056f 100%);
      width: 80%;
      height: 20%;
      position: absolute;
      bottom: -4px;
      left: 10%;
      opacity: 0;
      filter: blur(15px);
      border-radius: 10rem;
      transform: translateZ(-1px);
      transition: opacity 0.6s ease;
    }

    &:before {
      content: "";
      background: linear-gradient(56deg, #61dafb 0%, #d6cbf6 46%, #f2056f 100%);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      border-radius: 10rem;
      transition: opacity 0.4s ease;
    }

    &:hover {
      transition: all 0.6s ease;
      transform: translate(-50%, -50%) scale(1.35);
      transform-origin: center;

      &:after {
        opacity: 1;
        transition: opacity 0.6s ease;
      }

      &:before {
        opacity: 1;
        transition: opacity 0.6s linear;
      }
    }
  }
}
</style>
