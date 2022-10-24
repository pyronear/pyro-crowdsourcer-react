import React, { useEffect, useState } from 'react'
import './Picture.css'

export default function Picture(
  {
    path,
    index,
    widthPixels,
    speedPixelsPerSecond,
    offsetPixel,
    reverseDirection
  }: {
    path: string,
    index: number,
    widthPixels: number,
    speedPixelsPerSecond: number,
    offsetPixel: number,
    reverseDirection: boolean // LTR by default, switch to RTL by setting this to true
  }
) {
  const [ready, setReady] = useState(false);

  const uniqueClassName = `pic-${index}`

  const getTransitionTimeInSecondsFromSpeed = (pixelPerSecondSpeed: number) => {
    // Pictures will try to travel to -1000 pixels
    // speed = distance / time ==> time = distance / speed
    return 5000 / pixelPerSecondSpeed
  }

  useEffect(() => {
    // Workaround to trigger browser reflow before applying transition effect
    // https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
    // If you still wondering if this is useful or not, try removing it and increasing pictures spawn rate :)
    // Some pictures should appear at the end of their transition as the painting of elements get optimized
    // eslint-disable-next-line
    const _ =(document.getElementsByClassName(uniqueClassName)[0] as HTMLElement)?.offsetWidth
    setReady(true)
  }, [uniqueClassName])

  const getSlidingClass: () => string = () => {
    if (!ready) {
      return "static"
    }
    if (reverseDirection) {
      return "sliding slidingLeft"
    }
    return "sliding slidingRight"
  }

  return (
    <img src={path} alt="no" key={index}
    className={`pic ${uniqueClassName} ${getSlidingClass()}`}
    style={{
      transition: `all ${getTransitionTimeInSecondsFromSpeed(speedPixelsPerSecond)}s linear, opacity 1s`,
      ...(reverseDirection ? {
        right: `${offsetPixel - 7 * widthPixels}px`,
      } :{
        left: `${offsetPixel - 7 * widthPixels}px`
      }),
      width: widthPixels
    }}></img>
  )
}
