// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CursorFollower from './CursorFollower.vue'

/**
 * Extracts the numeric `opacity` and `translate3d(x, y, z)` values from the
 * inline style string rendered on the follower ball element.
 */
const parseBallStyle = (style: string | undefined) => {
  const opacityMatch = style?.match(/opacity:\s*([\d.]+)/)
  const transformMatch = style?.match(
    /translate3d\(\s*([-\d.]+)px,\s*([-\d.]+)px,\s*0(?:px)?\s*\)/,
  )

  return {
    opacity: opacityMatch ? Number.parseFloat(opacityMatch[1]) : undefined,
    x: transformMatch ? Number.parseFloat(transformMatch[1]) : undefined,
    y: transformMatch ? Number.parseFloat(transformMatch[2]) : undefined,
  }
}

describe('CursorFollower', () => {
  let rafCallbacks: FrameRequestCallback[]
  let rafHandle: number

  beforeEach(() => {
    rafCallbacks = []
    rafHandle = 0

    // requestAnimationFrame is mocked so the animation loop can be advanced
    // deterministically instead of relying on real timers.
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback: FrameRequestCallback) => {
        rafCallbacks.push(callback)
        return ++rafHandle
      }),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  /** Runs every animation frame callback currently queued, exactly once. */
  const flushFrame = (time = 0) => {
    const callbacks = rafCallbacks
    rafCallbacks = []
    for (const callback of callbacks) callback(time)
  }

  it('renders the fixed, pointer-events-none overlay and ball elements', () => {
    const wrapper = mount(CursorFollower)

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['pointer-events-none', 'fixed', 'inset-0', 'z-[1200]']),
    )

    const ball = wrapper.find('.rounded-full')
    expect(ball.exists()).toBe(true)
    expect(ball.classes()).toEqual(
      expect.arrayContaining([
        'pointer-events-none',
        'absolute',
        'h-3.5',
        'w-3.5',
        'rounded-full',
        'bg-slate-900/90',
        'shadow-xl',
        'shadow-slate-900/40',
        'dark:bg-slate-100/90',
      ]),
    )

    wrapper.unmount()
  })

  it('is invisible and positioned off the initial cursor origin before any mouse movement', () => {
    const wrapper = mount(CursorFollower)

    const { opacity, x, y } = parseBallStyle(wrapper.find('.rounded-full').attributes('style'))
    expect(opacity).toBe(0)
    expect(x).toBeCloseTo(-7.5)
    expect(y).toBeCloseTo(-7.5)

    wrapper.unmount()
  })

  it('adds a mousemove listener and schedules an animation frame on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    mount(CursorFollower)

    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(rafCallbacks).toHaveLength(1)
  })

  it('removes the mousemove listener and cancels the animation frame on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const cancelAnimationFrameSpy = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameSpy)

    const wrapper = mount(CursorFollower)
    wrapper.unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    expect(cancelAnimationFrameSpy).toHaveBeenCalled()
  })

  it('becomes visible after a mousemove event, but only moves the ball once an animation frame runs', async () => {
    const wrapper = mount(CursorFollower)

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }))
    await wrapper.vm.$nextTick()

    // Opacity flips immediately (driven by `hasMoved`), but the position is
    // still untouched because `animate()` has not run yet.
    let style = parseBallStyle(wrapper.find('.rounded-full').attributes('style'))
    expect(style.opacity).toBe(1)
    expect(style.x).toBeCloseTo(-7.5)
    expect(style.y).toBeCloseTo(-7.5)

    flushFrame()
    await wrapper.vm.$nextTick()

    // First frame moves 16% of the remaining distance toward the target.
    style = parseBallStyle(wrapper.find('.rounded-full').attributes('style'))
    expect(style.x).toBeCloseTo(100 * 0.16 - 7.5)
    expect(style.y).toBeCloseTo(50 * 0.16 - 7.5)

    wrapper.unmount()
  })

  it('re-schedules a new animation frame after each frame runs', () => {
    mount(CursorFollower)
    expect(rafCallbacks).toHaveLength(1)

    flushFrame()
    expect(rafCallbacks).toHaveLength(1)

    flushFrame()
    expect(rafCallbacks).toHaveLength(1)
  })

  it('only follows the most recent mousemove target when several fire before a frame runs', async () => {
    const wrapper = mount(CursorFollower)

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 400 }))
    await wrapper.vm.$nextTick()

    flushFrame()
    await wrapper.vm.$nextTick()

    const { x, y } = parseBallStyle(wrapper.find('.rounded-full').attributes('style'))
    expect(x).toBeCloseTo(300 * 0.16 - 7.5)
    expect(y).toBeCloseTo(400 * 0.16 - 7.5)

    wrapper.unmount()
  })

  it('converges toward the cursor position as more animation frames run', async () => {
    const wrapper = mount(CursorFollower)

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 200 }))
    await wrapper.vm.$nextTick()

    for (let i = 0; i < 100; i++) {
      flushFrame()
    }
    await wrapper.vm.$nextTick()

    const { x, y } = parseBallStyle(wrapper.find('.rounded-full').attributes('style'))
    expect(x).toBeCloseTo(200 - 7.5, 1)
    expect(y).toBeCloseTo(200 - 7.5, 1)

    wrapper.unmount()
  })

  it('does not throw when unmounted before any animation frame has fired', () => {
    const wrapper = mount(CursorFollower)
    expect(() => wrapper.unmount()).not.toThrow()
  })
})