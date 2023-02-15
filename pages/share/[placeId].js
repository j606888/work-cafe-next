import { getStoreByPlaceId } from "api/stores"

export default function SharePage({  }) {
  return null
}

export async function getServerSideProps({ params, res }) {
  const { placeId } = params
  const storeRes = await getStoreByPlaceId(placeId)
  const { lat, lng, name, address, photos } = storeRes.data

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  )
  res.setHeader("Content-Type", "text/html")
  res.write(
    `<!DOCTYPE html><html><head><meta property="og:title" content="${name}"><meta property="og:description" content="${address}"><meta property="og:image" content="${photos[0]}"><meta http-equiv="refresh" content="0; url=/map/place/${placeId}/@${lat},${lng},17z"></head><body><p>Redirecting...</p></body></html>`
  )
  res.end()

  return {
    props: {}
  }
}
