import { useRouter } from 'vue-router'
import { RouteNames } from '@/router/const'

export function useGoto() {
  const router = useRouter()

  function gotoMain() {
    router.push({
      name: RouteNames.MAIN,
    })
  }

  function gotoMenu() {
    router.push({
      name: RouteNames.MENU,
    })
  }

  return {
    gotoMain,
    gotoMenu
  }
}
