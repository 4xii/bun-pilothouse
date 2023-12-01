import * as THREE from 'three'
import SplineLoader from '@splinetool/loader'
import { getSplinecodeUrl } from '@/utils/source'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function createScene() {
  const scene = new THREE.Scene()
  const loader = new SplineLoader()
  console.log(' getSplineco', getSplinecodeUrl('scene'))
  loader.load(getSplinecodeUrl('scene'), (splineScene) => {
    scene.add(splineScene)
  })
  return scene
}

export function createCamera() {
  const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -50000,
    10000
  )
  camera.position.set(30, 50, 100)
  camera.lookAt(0, 0, 0)
  camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0))
  return camera
}

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  return renderer
}

export function createControls(
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = false
  controls.enableRotate = false
  controls.dampingFactor = 0.125
  return controls
}
