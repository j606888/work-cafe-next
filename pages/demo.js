import { Button } from '@mui/material'
import DemoButton from 'components/DemoButton'
import React from 'react'

const DemoPage = () => {
  return (
    <>
      <Button variant='contained'>MUI Button</Button>
      <DemoButton>Demo Button</DemoButton>
    </>
  )
}

export default DemoPage

// build 出來的靜態檔案會比較大
// 套版，還是 bootstrap
