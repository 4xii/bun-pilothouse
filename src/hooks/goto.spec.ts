import { describe, expect, it } from 'vitest'
import { useGoto } from './goto'
import { useSetup } from '@/tests/helper'
import { RouteNames } from '@/router/const'

describe('goto', () => {
  it('should be go to Main', () => {
    const { router } = useSetup(() => {
      const { gotoMain } = useGoto()
      gotoMain()
    })

    expect(router.push).toBeCalledWith({ name: RouteNames.MAIN })
  })
})
