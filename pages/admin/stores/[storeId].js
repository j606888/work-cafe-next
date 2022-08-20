import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import AdminLayout from "components/AdminLayout"
import StoreDetail from "components/StoreDetail"
import StoreOpeningHours from "components/StoreOpeningHours"
import { getStore } from "api/stores"
import { ImageListItem, ImageList } from "@mui/material"

const Container = styled.div``

const StandardImageList = ({ photos }) => {
  if (!photos) return null
  return (
    <ImageList sx={{ width: "100%" }} cols={5} variant="woven">
      {photos.map((item) => (
        <ImageListItem key={item}>
          <img src={item} srcSet={item} alt={"oops"} />
        </ImageListItem>
      ))}
    </ImageList>
  )
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
            <StoreOpeningHours
              openingHours={store.openingHours}
              isOpen={store.isOpenNow}
            />
            <StandardImageList photos={store.photos} />
          </>
        )}
      </Container>
    </AdminLayout>
  )
}

export default Store
