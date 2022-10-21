import { Component } from 'react';
import './Carousel.css';
import Picture from './picture/Picture';
import { images } from './pictures';

console.log(images)

type CarouselConfig = {
  pictures: Array<string>
  offset: Number
}

export default class Carousel extends Component {

  constructor (props: any) {
    super(props);
    this.state = {
      carousel1: {
        pictures: [],
        offset: 0,
      },
      carousel2: {
        pictures: [],
        offset: 0,
      },
      carousel3: {
        pictures: [],
        offset: 0,
      }
    }
  }

  render() {
    return (
      <div id="carousel">
        <div id="verticalContainer">
          <div className="horizontalContainer c1" >
            <img src={images[1] as string} alt="" />
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
          </div>
          <div className="horizontalContainer c2" >
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
          </div>
          <div className="horizontalContainer c3" >
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
            <img src={images[0] as string} alt="" />
          </div>
        </div>
        <Picture path={images[0]}/>
      </div>
    )
  }
}
