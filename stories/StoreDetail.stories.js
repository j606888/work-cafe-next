import StoreDetail from "@/components/StoreDetail"

export default {
  title: "components/StoreDetail",
}

export const Default = (args) => <StoreDetail {...args} />
Default.args = {
  imgUrl:
    "https://work-cafe-staging.s3.ap-southeast-1.amazonaws.com/stores/ChIJ329cT56rQjQRvOWUDdzYG1E.jpeg",
  name: "龍華眷村麵食館咖啡",
  tags: ["永久歇業", "隱藏中"],
  rating: 3.5,
  ratingAmount: 223,
  address: "115台灣台北市南港區中坡北路74號No",
  phone: "0976226552",
  googleUrl: "https://maps.google.com/?cid=361587838149290455",
}
