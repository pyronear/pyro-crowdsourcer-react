import React from 'react'
import './Navbar.css';

const logoUrl = 'https://pyronear.org/img/logo_letters.png'

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
