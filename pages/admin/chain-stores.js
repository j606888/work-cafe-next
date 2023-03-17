import React from "react"
import ChainStoreList from "features/admin/ChainStoreList"
import { LayoutAdmin } from "layout/admin"

const ChainStorePage = () => {
  return <ChainStoreList />
}

ChainStorePage.PageLayout = LayoutAdmin

export default ChainStorePage
