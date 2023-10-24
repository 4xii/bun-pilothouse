export function getVideoUrl(name:string) {
  return new URL(`../assets/video/${name}.mp4`, import.meta.url).href
}
