import React from 'react'
import './Navbar.css';

const logoUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpyronear.org%2Fimg%2Flogo_letters.png&f=1&nofb=1&ipt=0a5ac424775cff0f11232ce1be8ab954ec884c37fbd6f9ccba374557b7505be3&ipo=images'

export default function Navbar() {
  return (
    <>
      <nav>
        <img id="logo" src={logoUrl} alt="" />
        <a id="about" href="https://pyronear.org/">À propos de Pyronear</a>
      </nav>
      <div id="headerBg"></div>
    </>
  )
}
