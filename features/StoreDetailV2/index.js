import { Dialog } from '@mui/material'
import StoreDetail from 'features/StoreDetail'
import React from 'react'

const StoreDetailV2 = ({ placeId, onClose }) => {
  return (
    <Dialog
      open={!!placeId}
      onClose={onClose}
    >
      <StoreDetail placeId={placeId} />
    </Dialog>
  )
}

export default StoreDetailV2
