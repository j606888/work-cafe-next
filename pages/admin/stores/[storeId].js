import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import AdminLayout from "components/AdminLayout"
import StoreDetail from "components/StoreDetail"
import StoreOpeningHours from "components/StoreOpeningHours"
import { getStore, syncStorePhotos } from "api/stores"
import { ImageListItem, ImageList, Button } from "@mui/material"

const Container = styled.div``

const Control = styled.div`
  margin-bottom: 1rem;
`

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
  const [isLoading, setIsLoading] = useState(false)

  async function callAPI() {
    const res = await getStore(storeId)
    setStore(res)
  }

  useEffect(() => {
    if (storeId) callAPI()
  }, [storeId])

  async function handleSyncPhoto() {
    setIsLoading(true)
    await syncStorePhotos(store.placeId)
    callAPI()
    setIsLoading(false)
  }

  return (
    <AdminLayout>
      <Container>
        {store && (
          <>
            <Control>
              <Button
                variant="contained"
                onClick={handleSyncPhoto}
                disabled={isLoading}
              >
                Sync Photo
              </Button>
            </Control>
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
