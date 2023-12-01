<template>
  <div class="profile-container">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.profile-container {
  z-index: 1;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  transition: 0.3s;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.2);
  padding: 20px;
}
</style>
