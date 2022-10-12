import Searchbar from "./index"

export default {
  component: Searchbar,
}

export const Default = (args) => <Searchbar {...args} />
Default.args = {}

const mockResponse = {
  results: [
    {
      type: "city",
      name: "台南市",
      address: null,
      place_id: null,
      count: 5311,
    },
    {
      type: "store",
      name: "Kakes patisserie(遷店中，詳情請留意專頁，台南見）",
      address: "40356台灣台中市西區大同街217號1樓",
      place_id: "ChIJNa7qY7Y9aTQRBZIgCMMH5ws",
      count: 1,
    },
    {
      type: "store",
      name: "多那之台南新營門市",
      address: "730台灣台南市新營區三民路89-5號",
      place_id: "ChIJRQ3i6tuFbjQRlwelafyi9Yw",
      count: 1,
    },
    {
      type: "store",
      name: "Tea's原味 台南六甲店",
      address: "734台灣台南市六甲區中正路424號",
      place_id: "ChIJ2Q6lywyIbjQRAj2fgJOT9_8",
      count: 1,
    },
    {
      type: "store",
      name: "珈琲地圖麻豆店/麻豆coffee/麻豆咖啡廳/麻豆下午茶/麻豆美食/麻豆餐廳/台南美食推薦",
      address: "721台灣台南市麻豆區興民街3-25號",
      place_id: "ChIJx0AtFYd-bjQRyW1D-JzlR7w",
      count: 1,
    },
  ],
}
