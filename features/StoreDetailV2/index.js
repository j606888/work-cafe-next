import { Dialog } from '@mui/material'
import Skeleton from 'components/Skeleton'
import StoreDetail from 'features/StoreDetail'
import React from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

const StoreDetailV2 = ({ placeId, onClose }) => {
  const { data: store, mutate: mutateStore } = useSWR(
    placeId ? `/stores/${placeId}` : null
  )

  if (!store) return <Skeleton />

  return (
    <Dialog
      open={!!placeId}
      onClose={onClose}
    >
      <StoreDetail {...store} />
    </Dialog>
  )
}

export default StoreDetailV2
