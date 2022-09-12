import React from 'react'
import TimeAgo from "react-timeago"
import zhTWStrings from "react-timeago/lib/language-strings/zh-TW"
import buildFormatter from "react-timeago/lib/formatters/buildFormatter"

const formatter = buildFormatter(zhTWStrings)

const useTimeAgo = () => {
  const timeAgo = (timestamp) => {
    const date = new Date(timestamp * 1000)
    
    return (
      <TimeAgo date={date} formatter={formatter} />
    )
  }

  return timeAgo
}

export default useTimeAgo
