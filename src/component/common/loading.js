import React from 'react'
// import { css } from '@emotion/react'
import GridLoader from 'react-spinners/GridLoader'

// const override = css`
//   display: block;
//   margin: auto;
//   border-color: red;
// `

function App({ loading }) {
  return (
    <div className="d-flex justify-content-around align-content-center w-100 h-100 align-items-center">
      <GridLoader
        color={'#111e6c'}
        loading={loading}
        // css={override}
        size={15}
        speedMultiplier={1}
      />
    </div>
  )
}

export default App
