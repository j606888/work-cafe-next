import * as React from "react"
import Card from "features/Drawer/Card"
import useSWR from "swr"
import { useDispatch } from "react-redux"
import { updateStore, updateFocusPlaceId } from "store/slices/store"
import { fetcher } from "api"
import { Container, Scrollbar } from "./styled"

export default function StoreListV2({ stores = [] }) {
  const dispatch = useDispatch()
  const [placeId, setPlaceId] = React.useState(null)
  const { data: store } = useSWR(placeId ? `/stores/${placeId}` : null, fetcher)

  const handleMouseEnter = (placeId) => {
    dispatch(updateFocusPlaceId(placeId))
  }
  const handleMouseLeave = (_placeId) => {
    dispatch(updateFocusPlaceId(null))
  }
  const handleClick = (placeId) => {
    setPlaceId(placeId)
  }

  React.useEffect(() => {
    dispatch(updateStore(store))
  }, [store, dispatch])

  if (stores.length === 0) {
    return null
  }

  return (
    <Container>
      <div className="white-box"></div>
      <Scrollbar>
        {stores.map((store) => (
          <Card
            key={store.placeId}
            {...store}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </Scrollbar>
    </Container>
  )
}
