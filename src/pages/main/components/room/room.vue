<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { createCamera, createControls, createRenderer, createScene } from './service';

const angle = ref(0); // 初始角度
const ANGLE_SPEED = 0.01; // 速度因子

function handleWheel(camera: THREE.OrthographicCamera, event: WheelEvent) {
  const delta = event.deltaY;

  // 更新角度
  angle.value += delta * ANGLE_SPEED;

  // 计算新的相机位置
  const radius = 100; // 半径，即相机到目标点（0,0,0）的距离
  const x = radius * Math.sin(angle.value);
  const z = radius * Math.cos(angle.value);

  // 设置新的相机位置
  camera.position.set(x, camera.position.y, z);

  // 让相机朝向场景中心
  camera.lookAt(0, 0, 0);
}

onMounted(() => {
  const camera = createCamera();
  const scene = createScene();
  const renderer = createRenderer();
  const controls = createControls(camera, renderer);
  // 设置渲染器大小和挂载点
  const container = document.querySelector('.bg-room') as Element;
  console.log('container.clientWidth :>> ', container.clientWidth,container.clientHeight);
  if (container) {
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  }

  // scene settings
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  scene.background = new THREE.Color('#ebbab1');
  renderer.setClearAlpha(1);

  scene.fog = new THREE.Fog('#ebbab1', 1152.44, 2000);

  controls.enableDamping = true;
  controls.enableZoom = false; // 禁用缩放
  controls.enableRotate = false;
  controls.dampingFactor = 0.125;
  
  // 监听窗口大小变化和滚轮事件
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('wheel', (e) => handleWheel(camera, e));

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate() {
    controls.update();
    renderer.render(scene, camera);
  }

  // 开始渲染循环
  renderer.setAnimationLoop(animate);
})
</script>

<template>
  <div class="bg-room h-100vh "></div>
</template>
