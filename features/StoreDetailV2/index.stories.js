import StoreDetailV2 from "./index"

export default {
  component: StoreDetailV2,
}

export const Default = (args) => <StoreDetailV2 {...args} />
Default.args = {
  id: 1,
  name: "沾米廚房",
  rating: 4.1,
  userRatingsTotal: 776,
  address: "700台南市中西區北門路一段123巷52號",
  website: "https://www.facebook.com/jamikitchen2015/",
  phone: "0978668008",
  photos: [
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/7ad8aa34cb.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/875f476960.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/71e395ef88.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/2ff58cd0fb.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/c6746b6df3.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJCYLfH0p3bjQRc9v_thnANN0/6435065183.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJEUVp3nV3bjQRkE0G7ZN1npA/794538cca7.jpeg",
  ],
  reviews: [
    {
      userName: "Ariel Chen",
      userAvatar:
        "https://lh3.googleusercontent.com/a/AItbvmm9Dm9OrgOfvkqRfgBo9LJXJfJnnfxGialgFlru=s128-c0x00000000-cc-rp-mo-ba5",
      rating: 5,
      reviewAt: "2個月前",
      content:
        "心目中台南最好吃義大利麵排名前三👍\n拖疫情的福總算有位置\n不然以前超難訂\n整體裝潢走一個工業風\n個人覺得升級套餐的內容很有誠意\n有很大一杯的飲料(紅茶好喝)、沙拉、濃湯、軟法麵包以及沾米有名的千層蛋糕\n點了墨魚麵份量充足、配料海鮮也好吃\n非常推薦～",
    },
    {
      userName: "Jack Chen",
      userAvatar:
        "https://lh3.googleusercontent.com/a/AItbvml4wB8-tW-_sJ3y0erhuVedS0LMUTvJ9Cl8bP2scg=s128-c0x00000000-cc-rp-mo-ba4",
      rating: 4.5,
      reviewAt: "2個月前",
      content:
        "今天點的是青醬蔬食義大利麵（非素食），另外升級套餐，套餐中的烤麵包跟濃湯合在一起吃很搭！但沙拉應該是冰好直接拿出來的，吃起來有點硬，主餐的義大利麵份量很足，口感也不錯，口味算是比較清淡，裡面的花椰菜跟菇類炒的很好吃，整體用餐感覺不錯，當天放的歌曲都是經典老歌，有機會會在二訪！",
    },
  ],
  openingHours: [
    {
      label: "星期日",
      periods: [],
    },
    { label: "星期一", periods: [{ start: "06:30", end: "10:30" }] },
    { label: "星期二", periods: [{ start: "06:30", end: "10:30" }] },
    { label: "星期三", periods: [{ start: "06:30", end: "10:30" }] },
    {
      label: "星期四",
      periods: [
        { start: "06:30", end: "10:30" },
        { start: "11:30", end: "14:30" },
        { start: "17:30", end: "21:00" },
      ],
    },
    {
      label: "星期五",
      periods: [
        { start: "06:30", end: "10:30" },
        { start: "11:30", end: "14:30" },
        { start: "17:30", end: "21:00" },
      ],
    },
    {
      label: "星期六",
      periods: [],
    },
  ],
}
