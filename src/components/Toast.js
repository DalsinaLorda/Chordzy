// @ts-nocheck
/** @jsx jsx */
import React, { useEffect } from 'react'
import { css, jsx } from '@emotion/core'

const Toast = ({ toast, close, end}) => {
  useEffect(() => {
    if (!toast) return

    const closeToast = () => {
      setTimeout(() => {
       close()
      }, 2500)
    }

    closeToast();
    

    return () => clearTimeout(closeToast)
  }, [toast])

  if (!toast) return null

  return (
    <div className="toast" css={CSS}>
      {toast}
    </div>
  )
}

const CSS = css`
  -webkit-animation: toast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: toast 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  position: absolute;
  top: 5px;
  left: calc(50% - 175px);
  background: rgba(245, 237, 237, 0.86);
  color: black;
  width: 350px;
  border-radius: 10px;
  padding: 25px;
  text-align: center;

  @-webkit-keyframes toast {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }

  @keyframes toast {
    0% {
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
    100% {
      -webkit-transform: translateY(75px);
      transform: translateY(75px);
    }
  }
`

export default Toast
