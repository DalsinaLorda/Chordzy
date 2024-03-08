import React from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Global, css, jsx } from '@emotion/core'
import Main from './index'

/**
 * @function App
 */
const App = () => (
  <>
  <MemoryRouter>
    <Global styles={GlobalCSS} />
    <Main />
  </MemoryRouter>
  </>
)

const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: 'Signika', sans-serif;
  }

  html,
  body,
  .app {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
`

export default App
