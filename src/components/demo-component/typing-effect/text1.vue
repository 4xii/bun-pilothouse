<template>
  <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
    <text x="30" y="35" class="heavy">所以枪打出头鸟</text>
    <text x="150" y="35" class="m3">M3</text>
    <text x="30" y="50" class="Rrrrr">我去美国的话</text>
    <text x="50" y="70" class="Rrrrr">他们会ganggang我的!</text>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

// Make sure to register the TextPlugin
gsap.registerPlugin(TextPlugin)

export default defineComponent({
  name: 'TypingEffectText1',
  props: {
    speed: {
      type: Number,
      default: 0.1, // 默认值，可以根据需要调整
    },
  },
  setup(props) {
    onMounted(() => {
      let words = gsap.utils.toArray('svg text'),
        tl = gsap.timeline({ delay: 0.5 })

      words.forEach((el: any) => {
        tl.from(el, {
          text: '',
          duration: el.innerHTML.length * props.speed,
          ease: 'none',
        })
      })
    })
  },
})
</script>

<style scoped>
.small {
  font: italic 13px sans-serif;
}
.m3 {
  font: italic 40px serif;
  fill: red;
}

.Rrrrr {
  font: italic 20px serif;
  fill: red;
}
</style>
