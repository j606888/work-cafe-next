import Body from "./Body"

export default {
  title: "Components/Table/Body",
}

function createStoreRow(id, name, city, rating, userRatingsTotal, url) {
  return {
    id, name, city, rating, userRatingsTotal, url
  }
}

export const StoreRow = (args) => <Body {...args} />
StoreRow.args = {
  rows: [
    createStoreRow(1, "鼓豆咖啡","台南市", 5, 210, "https://google.com"),
    createStoreRow(2, "點亮咖啡","台南市", 4.3, 45, "https://google.com"),
    createStoreRow(3, "24B1 CAFE","台南市", 2.2, 903, "https://google.com"),
    createStoreRow(4, "眠豆腐台中店","台中市", 3.5, 2205, "https://google.com"),
    createStoreRow(5, "橘子水漾","台南市", 4.7, 4, "https://google.com"),
  ],
  type: "Store",
}

function createUserRow(id, name, createdAt) {
  return {
    id,
    name,
    createdAt,
    email: `${name}@gmail.com`,
  }
}

export const UserRow = (args) => <Body {...args} />
UserRow.args = {
  rows: [
    createUserRow(1, "James", "2022/08/31"),
    createUserRow(2, "Steve", "2022/10/11"),
    createUserRow(3, "Bob", "2022/09/18"),
    createUserRow(4, "Alex", "2023/01/01"),
  ],
  type: "User",
}
