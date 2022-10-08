import OpenTimePicker from "./index"

export default {
  component: OpenTimePicker,
}

export const Default = (args) => <OpenTimePicker {...args} />
Default.args = {
  initProps: {
    openType: "NONE",
    openWeek: 0,
    openHour: 99
  }
}
