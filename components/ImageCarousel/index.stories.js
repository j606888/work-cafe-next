import ImageCarousel from "./index"

export default {
  component: ImageCarousel,
}

export const Default = (args) => <ImageCarousel {...args} />
Default.args = {
  slides: [
    "https://picsum.photos/id/1032/900/400",
    "https://picsum.photos/id/1033/900/400",
    "https://picsum.photos/id/1037/900/400",
    "https://picsum.photos/id/1035/900/400",
    "https://picsum.photos/id/1036/900/400",
  ],
  width: 600,
  height: 400,
}
