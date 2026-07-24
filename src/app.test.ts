// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { default: App } = await import('./app.vue')
const { default: CursorFollower } =
  await import('./components/CursorFollower.vue')

// All other Nuxt-provided globals/components used by app.vue are stubbed out
// so this test can focus purely on the changes introduced by this PR: the
// `cursor-none` class on the body wrapper and the new `CursorFollower` child.
const globalStubs = {
  Body: { template: '<div class="body-stub"><slot /></div>' },
  SeoDefault: true,
  NuxtRouteAnnouncer: true,
  NuxtLoadingIndicator: true,
  TheNavber: true,
  NuxtPage: true,
  TheFooter: true,
}

describe('app.vue', () => {
  beforeEach(() => {
    // `useWebsite` and `useHead` are Nuxt auto-imported composables. Outside
    // of the Nuxt runtime they aren't injected automatically, so lightweight
    // stand-ins are provided on the global object, mirroring what Nuxt's
    // build-time auto-import transform would otherwise do.
    vi.stubGlobal(
      'useWebsite',
      vi.fn(() => ({ themeColor: '#ff69b4' })),
    )
    vi.stubGlobal('useHead', vi.fn())

    // Prevent CursorFollower's real animation loop from scheduling actual
    // frames while we mount the whole app tree.
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 0),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('applies the cursor-none utility class alongside the existing body classes', () => {
    const wrapper = mount(App, { global: { stubs: globalStubs } })

    const body = wrapper.find('.body-stub')
    expect(body.exists()).toBe(true)
    expect(body.classes()).toEqual(
      expect.arrayContaining([
        'body',
        'min-h-screen',
        'cursor-none',
        'bg-white',
        'text-slate-800',
        'antialiased',
        'dark:bg-slate-900',
        'dark:text-slate-100',
      ]),
    )

    wrapper.unmount()
  })

  it('renders the CursorFollower component inside the body', () => {
    const wrapper = mount(App, { global: { stubs: globalStubs } })

    const follower = wrapper.findComponent(CursorFollower)
    expect(follower.exists()).toBe(true)

    wrapper.unmount()
  })
})
