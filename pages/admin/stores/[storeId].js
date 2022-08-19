import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import AdminLayout from 'components/AdminLayout'
import StoreDetail from 'components/StoreDetail'
import StoreOpeningHours from 'components/StoreOpeningHours'
import { getStore } from 'api/stores'

const Container = styled.div`
`

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
            <StoreOpeningHours
              openingHours={store.openingHours}
              isOpen={store.is_open_now}
            />
          </>
        )}
      </Container>
    </AdminLayout>
  )
}

export default Store
