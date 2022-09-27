import GoogleMap from "features/UserMap";
import Head from "next/head";

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <GoogleMap />
    </>
  )
}
