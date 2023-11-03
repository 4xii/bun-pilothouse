<script setup lang="ts">

</script>

<template>
  <div id="vue-logo">
    <div id="back" class="front"></div>
    <div id="front" class="front"></div>
    <div class="side big"></div>
    <div class="side big left"></div>
    <div class="side small"></div>
    <div class="side small left"></div>
  </div>
</template>
<style scoped>

@keyframes rotateLogo {
  100% { transform: rotate3d(0, 1, 0, 360deg) }
}

#vue-logo {
  --dark: #34485e;
  --light: #41b883;
  --shadow1: #203040;
  --shadow2: #30a070;
  --focus: #eeffee;
  --depth: 65em;
  --animationTime: 5s;
  font-size: 0.1vmin;
  width: 462em;
  height: 400em;
  animation: rotateLogo var(--animationTime) linear infinite;
  transform-style: preserve-3d;
}

#vue-logo div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#vue-logo .front {
  background: var(--light);
  clip-path: polygon(0% 0%, 50% 100%, 100% 0%, 61.5% 0%, 50% 23%, 38.5% 0%);
  background-image: conic-gradient(at 50% 60%, var(--dark) 30deg, transparent 0 330deg, var(--dark) 0);
}

#vue-logo #front {
  transform: translate3d(0, 0, var(--depth));
}

#vue-logo #back {
  transform: translate3d(0, 0, calc(-1 * var(--depth)));
}

@keyframes moveLight {
  0% { tranform: translate(100%, 0); }
  100% { transform: translate(-100%, 0); }
}

#vue-logo .front::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  left: 50%;
  background-image: radial-gradient(circle, white 5%, transparent 60%);
  animation: moveLight var(--animationTime) linear infinite;
  animation-delay: calc(-0.5 * var(--animationTime));
}

#vue-logo #back::before {
  animation-direction: reverse;
  animation-delay: calc(-1 * var(--animationTime));
}

#vue-logo .side.big {
  left: 50%;
  bottom: 0;
  width: calc(2 * var(--depth));
  height: 462em;
  background: var(--shadow2);
  transform-origin: left bottom;
  transform: translate3d(0, -62em, var(--depth)) rotate(-30deg) rotate3d(0, 1, 0, 90deg);
}

#vue-logo .side.big.left {
  transform: translate3d(0, -62em, var(--depth)) rotate(30deg) rotate3d(0, 1, 0, 90deg);
}

#vue-logo .side.small {
  background: var(--shadow1);
  left: 50%;
  top: 23%;
  width: calc(2 * var(--depth));
  height: 106em;
  transform-origin: bottom left;
  transform: translate3d(0, -100%, var(--depth)) rotate(-30deg) rotate3d(0, 1, 0, 90deg);
}

#vue-logo .side.small.left {
  transform: translate3d(0, -100%, var(--depth)) rotate(30deg) rotate3d(0, 1, 0, 90deg);
}
</style>
