<template>
   <perfect-scrollbar ref="scroll">
     <router-view></router-view>
   </perfect-scrollbar>
 </template>
 
 <script setup lang="ts" >
 import { ComponentPublicInstance, ref, watch } from 'vue'
 import { useRoute } from 'vue-router'
 
 const scroll = ref<ComponentPublicInstance>()
 const route = useRoute()
 
 watch(route, () => {
   if (scroll.value) {
     scroll.value.$el.scrollTop = 0
   }
 })
 </script>
 