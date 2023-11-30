<template>
  <ul class="tabs flex flex-center" ref="tabsRef">
    <div class="indicator" ref="sliderIndicatorRef" :style="{ left: `${initialSliderPos}px` }"></div>
    <li class="tab-item" v-for="(link) in links" :key="link.id" ref="menuItemRefs" @click="sliderToPosition(link.id)">
      <div class="tab-link" :class="[
        link.id == 3 ? 'center' : null,
        link.id === selectedIndex ? 'active' : null
      ]">
        <div :key="link.iconClass" class="icon" :class="`${link.iconClass}`" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watch(value, (newVal) => {
  if (newVal!== undefined) {
    selectedIndex.value = newVal;
  }
});

const menuItemRefs = ref<HTMLElement[]>([]);
const sliderIndicatorRef = ref<HTMLElement>();
const tabsRef = ref<HTMLElement>();
const isMounted = ref(false);
const isPlaying = ref(false);
const selectedIndex = ref(value.value || 1);
const sliderLeftPos = ref(0);
const sliderRightPos = ref(0);
const links = [
  {
    id: 1,
    iconClass: "i-carbon-location-person"
  },
  {
    id: 2,
    iconClass: "i-carbon-book"
  },
  {
    id: 3,
    iconClass: "i-carbon-play-filled"
  },
  {
    id: 4,
    iconClass: "i-carbon-apps"
  },
  {
    id: 5,
    iconClass: "i-carbon-contour-finding"
  }
];

const initialSliderPos = computed(() => {
  if (!isMounted.value) return;
  let element = menuItemRefs.value[selectedIndex.value - 1];
  return element.offsetLeft + element.offsetWidth / 2;
});

watch(initialSliderPos, (newVal) => {
  if (sliderLeftPos.value === 0 && newVal !== undefined) {
    sliderLeftPos.value = newVal;
  }
});

watch(selectedIndex, (newIndex, oldIndex) => {
  animateSlider(newIndex, oldIndex);
});

onMounted(() => {
  isMounted.value = true;
});

const sliderToPosition = (id: number) => {
  if (!isPlaying.value) {
    selectedIndex.value = id;
    // animate timeline
    setTimeout(() => {
      value.value = id
    }, 800);
  }
};

const animateSlider = (newIndex: number, oldIndex: number) => {
  let prevElement = menuItemRefs.value[oldIndex - 1];
  let nextElement = menuItemRefs.value[newIndex - 1];
  let sliderElement = sliderIndicatorRef.value!;
  let parentTabs = tabsRef.value!;
  let distanceBetweenElements = Math.abs(
    prevElement.offsetLeft - nextElement.offsetLeft
  );

  if (newIndex > oldIndex) {
    isPlaying.value = true;
    let forwardTimeline = gsap.timeline({ paused: true });
    forwardTimeline.set(sliderElement, { clearProps: "right" });
    forwardTimeline.set(sliderElement, {
      left: sliderLeftPos.value
    });
    forwardTimeline
      .to(sliderElement, {
        duration: 0.75,
        width: distanceBetweenElements
      })
      .to(sliderElement, {
        duration: 0.25,
        width: "0.6rem",
        left: nextElement.offsetLeft + nextElement.offsetWidth / 2,
        onComplete: () => {
          sliderLeftPos.value =
            nextElement.offsetLeft + nextElement.offsetWidth / 2;
          sliderRightPos.value = parentTabs.offsetWidth - sliderLeftPos.value;
          isPlaying.value = false;
        }
      });
    forwardTimeline.play();
  } else {
    isPlaying.value = true;
    let rightOldPosition =
      parentTabs.offsetWidth -
      prevElement.offsetLeft -
      prevElement.offsetWidth / 2 -
      sliderElement.offsetWidth;

    let rightNewPostion =
      parentTabs.offsetWidth -
      nextElement.offsetLeft -
      nextElement.offsetWidth / 2 -
      sliderElement.offsetWidth;

    let reverseTimeline = gsap.timeline({ paused: true });
    reverseTimeline.set(sliderElement, {
      clearProps: "left",
      right: rightOldPosition
    });
    reverseTimeline
      .to(sliderElement, {
        duration: 0.75,
        width: distanceBetweenElements
      })
      .to(sliderElement, {
        duration: 0.25,
        width: "0.6rem",
        right: rightNewPostion,
        onComplete: () => {
          sliderRightPos.value = rightNewPostion;
          sliderLeftPos.value = sliderElement.offsetLeft;
          isPlaying.value = false;
        }
      });
    reverseTimeline.play();
  }

};


</script>

<style lang="scss" >
:root {
  --bg-color: #c7d2fd;
  --active-color: #5f57b6;
  --inactive-color: #c4c6ca;
  --hover-color: #8e78f7;
  --white: #ffffff;
  --icon-container-size: 3rem;
  --icon-size: 2rem;
}

.tabs {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  background-color: var(--white);
  border-radius: 0.5rem;
  position: relative;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);

  .tab-item {
    display: inline-flex;
    padding-bottom: calc(var(--icon-container-size) * 0.05);
  }

  .tab-link {
    display: inline-flex;
    color: var(--inactive-color);
    font-size: var(--icon-size);
    padding: calc(var(--icon-size) * 0.4);
    text-decoration: none;
    transition: all ease 0.5s;

    &:hover {
      color: var(--hover-color);
    }

    &.active {
      color: var(--active-color);
    }

    &.center {
      font-size: calc(var(--icon-size) + 0.5rem);
      background-color: var(--white);
      position: relative;
      top: calc(var(--icon-container-size) / -2);
      border-radius: calc(var(--icon-container-size));

      .icon {
        height: calc(var(--icon-container-size) + 0.5rem);
        width: calc(var(--icon-container-size) + 0.5rem);
        background-color: var(--active-color);
        color: var(--white);
        border-radius: calc(var(--icon-container-size));
      }
    }

    .icon {
      height: var(--icon-container-size);
      width: var(--icon-container-size);
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }

  .indicator {
    --slider-size: 0.6rem;
    position: absolute;
    bottom: 4px;
    height: var(--slider-size);
    width: var(--slider-size);
    background-color: var(--active-color);
    border-radius: 500px;
    transform: translateX(calc(var(--slider-size) / -2));
  }
}
</style>
