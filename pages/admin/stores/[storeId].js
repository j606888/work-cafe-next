import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/AdminLayout'

const Container = styled.div`
`

const Store = () => {
  const router = useRouter()
  const { storeId } = router.query
  return (
    <AdminLayout>
      <Container>
        <div className="basic-info">
          <div className="imgBox">
            <img
              src="https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJ329cT56rQjQRvOWUDdzYG1E.jpeg"
              alt="store"
            />
          </div>
          <div className="store-info">
            <h2>龍華眷村麵食館咖啡</h2>
            <h4>台北市</h4>
            <h4>南港區</h4>
            <h4>115台灣台北市南港區中坡北路74號No</h4>
            <p>Phone: 0911233123</p>
            <p>CreatedAt: 2022-08-11T15:24:18.771Z</p>
            <p>UpdatedAt: 2022-08-11T15:24:18.771Z</p>
          </div>
          <div>
            <button>Go to GoogleMap</button>
            <p>placeId: ChIJ329cT56rQjQRvOWUDdzYG1E</p>
            <p>website: https://google.com</p>
          </div>
        </div>
        <div>
          <p>Total Ratings: 6</p>
          <p>Rating: 3.3</p>
          <p>some reviews2</p>
          <p>Some reviews2</p>
        </div>
        <div>
          <p>Opening Hour</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
          <p>週一 10:00am ~ 8:30pm</p>
        </div>
      </Container>
    </AdminLayout>
  )
}

export default Store
