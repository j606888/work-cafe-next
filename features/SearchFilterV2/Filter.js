import { Button, ButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Filter = ({ onClose }) => {
  const router = useRouter()
  const storedFilters = JSON.parse(localStorage.getItem("filters"))
  const [wakeUp, setWakeUp] = useState(storedFilters?.wakeUp || false)

  useEffect(() => {
    const query = { wakeUp }
    localStorage.setItem("filters", JSON.stringify({ wakeUp }))
    const pathWithoutQuery = router.asPath.split('?')[0]
    router.push({ pathname: pathWithoutQuery, query }, undefined, {
      shallow: true,
    })

  }, [wakeUp])

  return (
    <Container>
      <h3>篩選條件</h3>
      <label>
        <input
          type="checkbox"
          checked={wakeUp}
          onChange={() => setWakeUp(!wakeUp)}
        />
        只顯示有評論的店家
      </label>
      <br />
      <ButtonGroup>
        <Button>儲存</Button>
        <Button onClick={onClose}>關閉</Button>
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.div`
  width: 640px;
  padding: 24px;
`

export default Filter
