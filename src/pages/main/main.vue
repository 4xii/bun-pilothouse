<template>
  <DayNightBackGround />
  <div class="scrollElement">
  </div>

  <div class="flex  items-start justify-between w-full h-full overflow-auto fixed ">
    <div class="mt-20px ml-40px">

      <div class="glassmorphism-lg w-60vw  flex flex-col p-40px">
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="w-180px mr-20px">
              <Avatar />
            </div>
            <div class="text-80px">4XI</div>
          </div>
          <LogoWall />
        </div>
        <TestList />
      </div>
    </div>


    <div class="glassmorphism h-100px flex flex-center w-260px mt-20px mr-20px p-10px rounded-40px">
      <DayNightSwitch @click="switchDayNight" :model-value="isDay" />
      <div class="w-300px h-300px">
        <Pink3DButton />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DayNightSwitch from '@/components/switch/day-night-switch.vue';
import { useDebounceFn } from '@vueuse/core'
import TestList from '@/components/test-list/test-list.vue';
import Pink3DButton from '@/components/button/pink-3d-button.vue'
import LogoWall from './components/logo-wall/logo-wall.vue'
import Avatar from '@/components/avatar/avatar.vue'

//@ts-ignore svg
import DayNightBackGround from './components/day-night-bg/day-night.vue'
import { createBatsAnimation, createBirdAnimation, createCloudsAnimation, createFallingStarAnimation, createScene1Animation, createScene2Animation, createScene3Animation, createSceneTransition, createSunAnimation, createSunIncreaseAnimation, dayNightSwitch } from './gsap';
const isDay = ref(true)

const switchDayNight = useDebounceFn(() => {
  isDay.value = !isDay.value
  // 只有在不是通过按钮触发滚动时才执行滚动逻辑
  dayNightSwitch(isDay.value)
})

// 初始化滚动触发器
function initScrollTriggers() {
  createScene1Animation();
  createBirdAnimation();
  createCloudsAnimation();
  createSunAnimation();
  createScene2Animation();
  createBatsAnimation();
  createSunIncreaseAnimation();
  createSceneTransition();
  createScene3Animation();
  createFallingStarAnimation();
}

// 设置滚动监听
function setupScrollListener() {
  window.addEventListener('scroll', handleScroll);
}

// 处理滚动事件
function handleScroll() {
  if (window.scrollY === 0) {
    isDay.value = true;
  } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    isDay.value = false;
  }
}
onMounted(() => {
  initScrollTriggers();
  setupScrollListener();
});


</script>

<style scoped>
/* body::-webkit-scrollbar {
  display: none;
} */


.scrollElement {
  position: absolute;
  height: 6000px;
  width: 100px;
  top: 0;
  z-index: 0;
}
</style>
