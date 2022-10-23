import AppBar from "features/AppBar";
import BookmarksContainer from "features/BookmarksContainer";
import MapV2 from "features/MapV2";
import Head from "next/head";

const Bookmarks = () => {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <AppBar />
      <BookmarksContainer />
      <MapV2 navigate={false} />
    </>
  )
}

export default Bookmarks
