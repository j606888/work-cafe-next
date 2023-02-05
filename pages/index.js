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
      <div>
        <p>等待轉址中...</p>
      </div>
    </>
  )
}
