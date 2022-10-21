import React from 'react'

export default function Picture(
  {path}: {path: string}
) {
  return (
    <img src={path} alt="no"></img>
  )
}
