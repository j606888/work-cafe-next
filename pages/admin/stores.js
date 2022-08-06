import React from 'react'
import styled from 'styled-components'
import AdminLayout from "src/components/AdminLayout"
import StickyHeadTable from 'src/components/StickyHeadTable'

const Container = styled.div`
`

const Stores = () => {
  return (
    <AdminLayout>
      <StickyHeadTable />
    </AdminLayout>
  )
}

export default Stores
