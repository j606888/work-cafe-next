import Card from "./index"

export default {
  component: Card,
}

export const Default = (args) => <Card {...args} />
Default.args = {
  imageUrl: "https://i.picsum.photos/id/466/200/200.jpg?hmac=VydiBydfVntkv5HY6NXsWaNXDedBW2VWNmm8MqF5Cew",
  name: "生命樹咖啡",
  isOpening: true,
  reviews: 232,
  address: '東區小東路350號',
  tags: [
    '很安靜',
    '有插座',
    '無限時',
  ],
}
