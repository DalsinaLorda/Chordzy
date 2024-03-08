/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'

const Notify = ({ children, show, close }) => {
  if (!show) return null

  return (
    <div className="Modal" css={CSS}>
     
        <h3>Loading.....</h3>
     
    </div>
  )
}

const CSS = css`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;



  h3 {
    position: absolute;
    top: 10px;
    cursor: pointer;
    color: black;
  }
`

export default Notify