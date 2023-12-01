<template>
  <ProfileContainer>
    <div class="h-500px w-40vw">
      <div v-if="activeSection === 1" class="">
        <div class="flex flex justify-between">
          <div class="flex">
            <div class="w-180px mr-20px">
              <Avatar />
            </div>
            <div class="text-80px">4XI</div>
          </div>

          <div class="flex">
            <LogoWall />
          </div>
        </div>
        <TestList />
      </div>
    </div>
    <AnimationTab class="w-full" v-model="activeSection" />
  </ProfileContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProfileContainer from './profile-container.vue'
import AnimationTab from '../tabs/animation-tab.vue'
import TestList from '@/components/test-list/test-list.vue'
import Avatar from '@/components/avatar/avatar.vue'
import LogoWall from '@/components/logo-wall/logo-wall.vue'
const activeSection = ref(1)
// const sections = [
//   { id: '#about', name: 'ABOUT' },
//   { id: '#experience', name: 'EXPERIENCE' },
//   { id: '#contact', name: 'CONTACT' }
// ];

// const handleButtonClick = (event: MouseEvent) => {
//   const button = event.target as HTMLButtonElement;
//   activeSection.value = button.getAttribute('data-section') || '#about';
// };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=DM+Sans:400,500|Jost:400,500,600&display=swap');
</style>
