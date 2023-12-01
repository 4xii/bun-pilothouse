<template>
  <DayNightBackGround />
  <div class="scrollElement"></div>

  <div
    class="flex items-start justify-between w-full h-full overflow-auto fixed"
  >
    <div class="mt-20px ml-40px">
      <div class="glassmorphism-lg w-70vw flex flex-col p-40px">
        <div class="flex justify-between">
          <ProfileCard />
          <div class="flex flex-col flex-center">
            <div
              class="glassmorphism h-100px flex flex-center w-260px mt-20px mr-20px p-10px rounded-40px"
            >
              <DayNightSwitch @click="switchDayNight" :model-value="isDay" />
            </div>
            <div class="w-220px h-400px relative">
              <Pink3DButton
                @clickButton="toMenu"
                class="absolute left-50% top-50% -translate-x-50% -translate-y-50%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import DayNightSwitch from '@/components/switch/day-night-switch.vue'
import { useDebounceFn } from '@vueuse/core'
import Pink3DButton from '@/components/button/pink-3d-button.vue'
import ProfileCard from '@/components/profile-card/profile-card.vue'
//@ts-ignore svg
import DayNightBackGround from './components/day-night-bg/day-night.vue'
import {
  createBatsAnimation,
  createBirdAnimation,
  createCloudsAnimation,
  createFallingStarAnimation,
  createScene1Animation,
  createScene2Animation,
  createScene3Animation,
  createSceneTransition,
  createSunAnimation,
  createSunIncreaseAnimation,
  dayNightSwitch,
} from './gsap'
import { useGoto } from '@/hooks/goto'

const { gotoMenu } = useGoto()

const isDay = ref(true)

const switchDayNight = useDebounceFn(() => {
  isDay.value = !isDay.value
  // 只有在不是通过按钮触发滚动时才执行滚动逻辑
  dayNightSwitch(isDay.value)
})

// 初始化滚动触发器
function initScrollTriggers() {
  createScene1Animation()
  createBirdAnimation()
  createCloudsAnimation()
  createSunAnimation()
  createScene2Animation()
  createBatsAnimation()
  createSunIncreaseAnimation()
  createSceneTransition()
  createScene3Animation()
  createFallingStarAnimation()
}

// 设置滚动监听
function setupScrollListener() {
  window.addEventListener('scroll', handleScroll)
}

// 处理滚动事件
function handleScroll() {
  if (window.scrollY === 0) {
    isDay.value = true
  } else if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 100
  ) {
    isDay.value = false
  }
}

onMounted(() => {
  initScrollTriggers()
  setupScrollListener()
})

const toMenu = () => {
  gotoMenu()
}
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
