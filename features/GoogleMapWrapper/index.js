import { Wrapper } from "@googlemaps/react-wrapper"
import GoogleMap from "./GoogleMap"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

const GoogleMapWrapper = ({
  children,
  map,
  setMap,
  onIdle,
  initCenter,
  initZoom,
  marginTop="20px",
}) => {
  return (
    <Wrapper apiKey={API_KEY}>
      <GoogleMap
        map={map}
        setMap={setMap}
        onIdle={onIdle}
        initCenter={initCenter}
        initZoom={initZoom}
        marginTop={marginTop}
      >
        {children}
      </GoogleMap>
    </Wrapper>
  )
}

export default GoogleMapWrapper
