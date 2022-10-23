import AppBar from "features/AppBar";
import BookmarksContainer from "features/BookmarksContainer";
import BookmarkMap from "features/BookmarksContainer/BookmarkMap";
import Head from "next/head";

const Bookmarks = () => {
  return (
    <>
      <Head>
        <title>Work Cafe</title>
      </Head>
      <AppBar />
      <BookmarksContainer />
      <BookmarkMap />
    </>
  )
}

export default Bookmarks
