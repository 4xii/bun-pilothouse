import { gsap } from 'gsap'
import * as THREE from 'three'
export class Experience {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  raycaster: THREE.Raycaster
  mouse: THREE.Vector2
  renderer: THREE.WebGLRenderer

  then: number
  fpsInterval: number
  _pos: {
    x: number
  }
  _meshes: THREE.Mesh[] = []
  _lights: THREE.Light[] = []
  _sphere!: THREE.Mesh
  _cube!: THREE.Mesh
  _plane!: THREE.Mesh
  _cylinder!: THREE.Mesh
  _cone!: THREE.Mesh
  _torus!: THREE.Mesh
  _sphere2!: THREE.Mesh
  _cube2!: THREE.Mesh
  _plane2!: THREE.Mesh
  _cylinder2!: THREE.Mesh
  _cone2!: THREE.Mesh
  _clock = new THREE.Clock()
  innerWidth!: number
  innerHeight!: number
  raf?: number
  container: Element
  constructor(container: Element, width: number, height: number) {
    console.clear()
    this.container = container
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2(0, 0)
    this._pos = {
      x: 0,
    }

    this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
    this.camera.position.z = 30

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xffffff, 0.0)
    this.renderer.setPixelRatio(1.6)
    container.appendChild(this.renderer.domElement)
    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.scene = new THREE.Scene()

    this.resize()
    this.bind()
    this.loop()

    this._addLights()
    this._addMeshes()
  }

  _addLights() {
    const light = new THREE.AmbientLight(0x0)
    this.scene.add(light)

    const spotLight = new THREE.SpotLight(0xf2056f, 0.68, 0)
    spotLight.position.set(150, 150, 0)
    this.scene.add(spotLight)

    const hemlight = new THREE.HemisphereLight(0xd8c7f3, 0x61dafb, 0.3)
    this.scene.add(hemlight)
  }

  _addMeshes() {
    const _prefix = 'https://robindelaporte.fr/codepen/play/'
    const urls = [
      _prefix + 'nx.jpg',
      _prefix + 'ny.jpg',
      _prefix + 'nz.jpg',
      _prefix + 'px.jpg',
      _prefix + 'py.jpg',
      _prefix + 'pz.jpg',
    ]

    const cubemap = new THREE.CubeTextureLoader().load(urls)
    cubemap.format = THREE.RGBAFormat

    const geometry = new THREE.SphereGeometry(4, 16, 16)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      reflectivity: 0.56,
      envMap: cubemap,
    })

    this._sphere = new THREE.Mesh(geometry, material)
    this._sphere.position.y = -5
    this._sphere.position.x = -10
    this.scene.add(this._sphere)

    const geometryTorus = new THREE.TorusGeometry(4, 2, 16, 100)
    this._torus = new THREE.Mesh(geometryTorus, material)
    this._torus.position.y = 5
    this._torus.position.x = 10
    this._torus.rotation.x = 2.3
    this._torus.rotation.y = 0.3
    this.scene.add(this._torus)

    const geometryCone = new THREE.ConeGeometry(2, 8, 32)
    this._cone = new THREE.Mesh(geometryCone, material)
    this._cone.position.y = 6
    this._cone.position.x = -10
    this._cone.position.z = 3
    this._cone.rotation.x = -0.3
    this._cone.rotation.z = 0.7
    this.scene.add(this._cone)
    if (!Array.isArray(this._torus.material)) {
      this._torus.material.opacity = 0
    }
  }

  animateIn() {
    gsap.to(this._torus.material, { opacity: 1 })

    gsap.fromTo(
      this._torus.scale,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.35, y: 1.35, z: 1.35 }
    )
    gsap.fromTo(this._torus.position, { x: 5, y: 10 }, { x: 5, y: 10, z: 2 })
    gsap.fromTo(this._torus.rotation, { x: 2.0, y: -0.3 }, { x: 2.3, y: 0.3 })

    gsap.fromTo(
      this._sphere.scale,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.15, y: 1.15, z: 1.15 }
    )
    gsap.fromTo(this._sphere.position, { x: -10, y: -10 }, { x: -10, y: -10 })

    gsap.fromTo(
      this._cone.scale,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1.35, y: 1.35, z: 1.35 }
    )
    gsap.fromTo(
      this._cone.position,
      { x: -10, y: 2, z: 3 },
      { x: -20, y: 10, z: 3 }
    )

    gsap.fromTo(this._cone.rotation, { x: -0.2, z: 0.0 }, { x: -0.3, z: 0.7 })
  }

  animateOut() {
    gsap.to(this._torus.material, { opacity: 0 })

    gsap.to(this._torus.scale, { x: 0.8, y: 0.8, z: 0.8 })
    gsap.to(this._torus.position, { x: 10, y: 20 })
    gsap.to(this._torus.rotation, { x: 2.0, y: -0.3 })

    gsap.to(this._sphere.scale, { x: 0.8, y: 0.8, z: 0.8 })
    gsap.to(this._sphere.position, { x: -10, y: -10 })

    gsap.to(this._cone.scale, { x: 0.8, y: 0.8, z: 0.8 })
    gsap.to(this._cone.position, { x: -30, y: 2, z: 3 })
    gsap.to(this._cone.rotation, { x: -0.2, z: 0.0 })
  }

  bind() {
    window.addEventListener('resize', this.resize.bind(this), false)
    document
      .getElementById('pink-button')!
      .addEventListener('mouseenter', () => {
        gsap.to('.ok', { scale: 1.35 })
        this.animateIn()
      })

    document
      .getElementById('pink-button')!
      .addEventListener('mouseleave', () => {
        gsap.to('.ok', { scale: 1.0 })
        this.animateOut()
      })
  }

  onMouseMove(event: THREE.Event) {
    this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1
    this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1
  }

  loop() {
    this.raf = window.requestAnimationFrame(this.loop.bind(this))

    const now = Date.now()
    const delta = now - this.then

    if (delta > this.fpsInterval) {
      // this.scene.update()
      this.camera.position.x +=
        this.mouse.x * (this.container.clientWidth * 0.02) -
        this.camera.position.x * 0.03
      this.camera.position.y +=
        -(this.mouse.y * (this.container.clientHeight * 0.02)) -
        this.camera.position.y * 0.03
      this.camera.lookAt(this.scene.position)

      this.renderer.render(this.scene, this.camera)
      this.then = now
    }
  }

  resize() {}
}
