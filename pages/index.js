import Head from "next/head"
import Router from "next/router"
import { useEffect } from "react"

export default function IndexPage() {
  useEffect(() => {
    Router.replace('/map')
  }, [])

  return (
    <>
      <Head>
        <title>Work Cafe | Taiwan</title>
        <link rel="icon" href="/cafe-orange.svg" type="image/svg" />
      </Head>
      <h1>Work Cafe | Taiwan</h1>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context

  if (req.url === '/') {
    res.writeHead(302, { Location: '/map' })
    res.end()
  }

  return { props: {} }
}
