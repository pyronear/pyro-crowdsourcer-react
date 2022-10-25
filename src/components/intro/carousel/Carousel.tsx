import { Component, ReactElement } from 'react';
import './Carousel.css';
import Picture from './picture/Picture';
import { pickOne } from './pictures';


interface IProps {
  pictureWidthPixel: number,
  pictureHeightPixel: number,
  picturePaddingPixel: number,
  speedPixelPerSecond: number,
  directionLeftToRight: boolean
  totalWidthPixel: number
}

interface IState {
  pictures: Array<ReactElement>,
  nextIndex: number
}
export default class Carousel extends Component<IProps, IState> {
  first = false;
  maxArraySize: number;

  constructor (props: IProps) {
    super(props);
    this.state = {
      pictures: [],
      nextIndex: 0,
    }
    this.maxArraySize = Math.ceil(this.props.totalWidthPixel / (this.props.pictureWidthPixel + this.props.picturePaddingPixel) + 2) // Last item is discarded, first item is appearing
    console.log(this.maxArraySize)
  }

  static defaultProps = {
    pictureWidthPixel: 192,
    pictureHeightPixel: 108,
    picturePaddingPixel: 10,
    speedPixelPerSecond: 30,
    directionLeftToRight: true,
    totalWidthPixel: 2560,
  }

  useEffect() {
  }

  calculateNextIndex(previousIndex: number) {
    if (previousIndex === this.maxArraySize - 1) {
      return 0
    }
    return previousIndex + 1
  }

  // speed = pixels / duration
  // Duration between two spawns = (width of picture + padding between pictures) /speed of picture
  PICTURE_SPAWN_INTERVAL_MILISECONDS=  (this.props.pictureWidthPixel + this.props.picturePaddingPixel) / (this.props.speedPixelPerSecond/1000);

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
        offsetPixel={imagePosition * (this.props.pictureWidthPixel + this.props.picturePaddingPixel)}
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
    for (let i = this.maxArraySize - 1; i >= 0 ; i--) {
      this.appendNewImage(i)
    }

    setInterval(() => {
      return this.appendNewImage();
    }, this.PICTURE_SPAWN_INTERVAL_MILISECONDS)
  }



  render() {
    return (
      <div id="carousel"  style={{
        height: `${this.props.pictureHeightPixel}px`,
        ...(this.props.directionLeftToRight? {
          right: `-${this.props.pictureWidthPixel + this.props.picturePaddingPixel}px`
        }: {
          left: `-${this.props.pictureWidthPixel + this.props.picturePaddingPixel}px`
        })
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
