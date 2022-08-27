import React from 'react'
import styled from 'styled-components'
import FoundationIcon from '@mui/icons-material/Foundation';


const Outer = styled.div`
  padding: 3rem 0;
  color: #5F5F5F;
`

const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;

  .coming-soon {
    margin-top: 5rem;
    text-align: center;

    h4 {
      font-size: 32px;
    }
  }
`

const CityQuickSearch = () => {
  return (
    <Outer>
      <Container>
        <h3>縣市快搜</h3>
        <p>等你探索 各縣市的讚讚工作咖啡店</p>
        <div className='coming-soon'>
          <FoundationIcon sx={{fontSize: 128 }}/>
          <h4>Coming Soon...</h4>
        </div>
      </Container>
    </Outer>
  )
}

export default CityQuickSearch
