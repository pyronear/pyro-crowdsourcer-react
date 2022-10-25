import { Component, ReactElement } from 'react';
import './Carousel.css';
import Picture from './picture/Picture';
import { pickOne } from './pictures';

const MAX_ARRAY_SIZE = 10



const PICTURE_WIDTH_PIXELS = 192;
const PICTURE_HEIGHT_PIXELS = PICTURE_WIDTH_PIXELS * (1080/1920) // TODO: Do not hard code this
const PICTURE_PADDING_PIXELS =  10; // Only horizontal padding
const SPEED_PIXELS_PER_SECOND = 30;
const PREFILLED_IMAGES = MAX_ARRAY_SIZE; // Prefill array completely

//debug
const MAX_TRAIN_WIDTH = (MAX_ARRAY_SIZE - 1 ) * (PICTURE_PADDING_PIXELS + PICTURE_WIDTH_PIXELS)
console.log(MAX_TRAIN_WIDTH)

interface IProps {
  pictureWidthPixel: number,
  picturePaddingPixel: number,
  speedPixelPerSecond: number,
  directionLeftToRight: boolean
}

interface IState {
  pictures: Array<ReactElement>,
  nextIndex: number
}
export default class Carousel extends Component<IProps, IState> {
  first = false;


  constructor (props: IProps) {
    super(props);
    this.state = {
      pictures: [],
      nextIndex: 0,
    }
  }

  static defaultProps = {
    pictureWidthPixel: 192,
    picturePaddingPixel: 10,
    speedPixelPerSecond: 30,
    directionLeftToRight: true,
  }

  useEffect() {
  }

  calculateNextIndex(previousIndex: number) {
    if (previousIndex === MAX_ARRAY_SIZE - 1) {
      return 0
    }
    return previousIndex + 1
  }

  // speed = pixels / duration
  // Duration between two spawns = (width of picture + padding between pictures) /speed of picture
  PICTURE_SPAWN_INTERVAL_MILISECONDS=  (PICTURE_WIDTH_PIXELS + PICTURE_PADDING_PIXELS) / (SPEED_PIXELS_PER_SECOND/1000);

  appendNewImage(imagePosition=0) {
    this.setState((prevState) => {
      const previousPictures = prevState.pictures
      // Append an image
      previousPictures[prevState.nextIndex] = <Picture
        index={prevState.nextIndex}
        key={prevState.nextIndex}
        path={pickOne()}
        widthPixels={this.props.pictureWidthPixel}
        speedPixelsPerSecond={this.props.speedPixelPerSecond}
        offsetPixel={imagePosition * (PICTURE_WIDTH_PIXELS + PICTURE_PADDING_PIXELS)}
        reverseDirection={this.props.directionLeftToRight}
      />
      const nextIndex = this.calculateNextIndex(prevState.nextIndex)
      // Delete next image
      previousPictures[nextIndex] = <></>
      return {
        pictures: previousPictures,
        nextIndex
      }
    })
  }

  componentDidMount(): void {
    if (this.first) return; this.first = true;
    for (let i = PREFILLED_IMAGES - 1; i >= 0 ; i--) {
      this.appendNewImage(i)
    }

    setInterval(() => {
      return this.appendNewImage();
    }, this.PICTURE_SPAWN_INTERVAL_MILISECONDS)
  }



  render() {
    return (
      <div id="carousel" style={{
        height: `${PICTURE_HEIGHT_PIXELS}px`
      }}>
          {this.state.pictures}
        {/* <div className="horizontalContainer c2" >
          <img src={images[0] as string} alt="" />
          <img src={images[0] as string} alt="" />
          <img src={images[0] as string} alt="" />
          <img src={images[0] as string} alt="" />
        </div>
        <div className="horizontalContainer c3" >
          <img src={images[0] as string} alt="" />
          <img src={images[0] as string} alt="" />
          <img src={images[0] as string} alt="" />
        </div> */}
      </div>
    )
  }
}
