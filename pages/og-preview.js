import Head from "next/head"

export default function OgPreviewPage() {
  return (
    <>
      <Head>
        <title>OG Title cool</title>
        <meta property="og:title" content="My OG Title" />
        <meta property="og:description" content="My OG Description" />
        <meta
          property="og:image"
          content="https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJczLMgQJ3bjQRUhtWgIPjd00/3655e954eead1022.jpeg"
        />
        <meta property="og:url" content="https://www.work-cafe.tw/og-preview" />
      </Head>
      <h1>Og Preview title</h1>
    </>
  )
}
