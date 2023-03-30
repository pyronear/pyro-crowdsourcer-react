/* eslint-disable no-return-assign */
import { useEffect, useRef, useState } from 'react'
import Carousel from './Carousel'

const MobileCarousel = [
  { directionLeftToRight: true },
  { directionLeftToRight: false }
]

const LargeCarousel = [
  { directionLeftToRight: true },
  { directionLeftToRight: false },
  { directionLeftToRight: true }
]

export const Carousels = ({ isMobile, animate }: { isMobile: boolean, animate: boolean }): JSX.Element => {
  // const [refs, setRefs] = useState<Array<MutableRefObject<Carousel | null>>>([])
  const [isReady] = useState<boolean>(true)
  const carouselsRef = useRef<Array<Carousel | null>>([])

  // useEffect(
  //   () => {
  //     const carousel = isMobile ? MobileCarousel : LargeCarousel
  //     if (carousel.length === carouselsRef.current.length) return
  //     carouselsRef.current = []
  //   }, [isMobile]
  // )

  useEffect(
    () => {
      for (const carouselRef of carouselsRef.current) {
        if (animate) {
          carouselRef?.startSpawn()
        } else carouselRef?.stopSpawn()
      }
    }, [animate]
  )

  return (
    <div id="straightCarouselContainer" className={isMobile ? 'mobile' : ''}>
      {isReady
        ? (isMobile
            ? <div id="smallCarouselContainer">
            {MobileCarousel.map((carousel, index) => <>
              <Carousel key={index} directionLeftToRight={carousel.directionLeftToRight} ref={el => carouselsRef.current[index] = el}/>
            </>)}
          </div>
            : <div id="wideCarouselContainer">
            {LargeCarousel.map((carousel, index) => <>
              <Carousel key={index} directionLeftToRight={carousel.directionLeftToRight} ref={el => carouselsRef.current[index] = el}/>
            </>)}
          </div>
          )
        : <></>
    }
    </div>
  )
}
