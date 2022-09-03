import BookmarkList from "./index"

export default {
  component: BookmarkList,
}

const bookmark = (random_key, category, name) => {
  return { random_key, category, name }
}

export const Default = (args) => <BookmarkList {...args} />
Default.args = {
  bookmarks: [
    bookmark("abc123", "favorite", "喜愛的地點"),
    bookmark("efg456", "interest", "想去的地點"),
    bookmark("zxc789", "custom", "週末咖啡廳"),
    bookmark("ppp000", "custom", "工作專用2"),
  ]
}
