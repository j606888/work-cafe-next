import { getStoreByPlaceId } from "api/stores"

export default function SharePage({ placeId }) {
  return null
}

export async function getServerSideProps({ params }) {
  const { placeId } = params
  const res = await getStoreByPlaceId(placeId)
  const place = res.data
  const { lat, lng } = place
  return {
    redirect: {
      destination: `/map/place/${placeId}/@${lat},${lng},17z`
    }
  }
}
