import ReviewForm from "./index"

export default {
  component: ReviewForm,
}

export const Default = (args) => <ReviewForm {...args} />
Default.args = {
  name: '春水堂'
}
