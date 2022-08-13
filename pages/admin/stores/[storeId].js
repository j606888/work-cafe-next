import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/AdminLayout'
import StoreDetail from '@/components/StoreDetail'
import StoreOpeningHours from '@/components/StoreOpeningHours'
import { getStore } from '@/api/index'

const Container = styled.div`
`

const DEFAULT_VALUE = {
  imgUrl:
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJ329cT56rQjQRvOWUDdzYG1E.jpeg",
  name: "龍華眷村麵食館咖啡",
  tags: ["永久歇業", "隱藏中"],
  rating: 3.5,
  ratingAmount: 223,
  address: "115台灣台北市南港區中坡北路74號No",
  phone: "0976226552",
  googleUrl: "https://maps.google.com/?cid=361587838149290455",
}

const DEFAULT_OPEN = {
  isOpen: false,
  openHours: [
    build_intervals("星期日", []),
    build_intervals("星期一", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期二", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期三", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期四", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期五", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期六", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
  ],
}
function build_intervals(label, intervalHours) {
  return {
    label,
    intervals: intervalHours.map((hours) => ({
      start: hours[0],
      end: hours[1],
    })),
  }
}

const Store = () => {
  const router = useRouter()
  const { storeId } = router.query
  const [store, setStore] = useState(null)

  useEffect(() => {
    async function callAPI() {
      const res = await getStore(storeId)
      setStore(res)
    }

    if (storeId) callAPI()
  }, [storeId])

  return (
    <AdminLayout>
      <Container>
        {store && (
          <>
            <StoreDetail {...store} />
            <br />
            <StoreOpeningHours opening_hours={store.opening_hours} />
          </>
        )}
      </Container>
    </AdminLayout>
  )
}

export default Store
