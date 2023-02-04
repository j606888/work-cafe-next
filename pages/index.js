import Router from "next/router"
import { useEffect } from "react"

export default function IndexPage() {
  useEffect(() => {
    Router.replace('/map')
  }, [])

  return (
    <div>
      <p>等待轉址中...</p>
    </div>
  )
}
