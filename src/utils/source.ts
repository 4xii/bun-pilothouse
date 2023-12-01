export function getVideoUrl(name: string) {
  return new URL(`../assets/video/${name}.mp4`, import.meta.url).href
}

export function getSplinecodeUrl(name: string) {
  return new URL(`../assets/splinecode/${name}.splinecode`, import.meta.url)
    .href
}
