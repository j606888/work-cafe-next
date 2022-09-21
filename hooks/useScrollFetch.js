import useSWRInfinite from "swr/infinite"

// Example getKey
//
// const getKey = (pageIndex, previousPageData) => {
//   if (previousPageData && !previousPageData.reviews.length) return null
//   return `/reviews?page=${pageIndex + 1}&per=10`
// }

const useScrollFetch = (getKey) => {
  const { data, size, setSize } = useSWRInfinite(getKey)

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
    if (scrollTop + clientHeight === scrollHeight) {
      setSize(size + 1)
    }
  }

  return { data, handleScroll }
}

export default useScrollFetch
