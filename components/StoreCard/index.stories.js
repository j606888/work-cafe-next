import StoreCard from "./index"

export default {
  component: StoreCard,
}

export const Default = (args) => <StoreCard {...args} />
Default.args = {
  name: "自己的房間",
  shortAddress: "台南市中西區",
  rating: 4.6,
  reviewsCount: 20,
  isOpen: true,
  tags: ["不限時間", "大部分有插座"],
  images: [
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJ--JpicY1aDQRwAEH1-fv5j4/8bc11298abfda37e.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJT8EDJ8w1aDQReJyyf4KgJdE/0c453d9ee4d93d17.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJv3jzIbY1aDQR2Q2aeYlCQus/30dd8176adf4f700.jpeg",
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJYXCrRs41aDQRzW4Sozxo-ms/c38520d2ad79cce1.jpeg",
  ],
}
