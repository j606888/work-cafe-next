import GoogleMap from "features/GoogleMap";
import Header from "features/Header";

export default function MapPage() {
  return (
    <>
      <Header withSearchBar />
      <GoogleMap />
    </>
  )
}
