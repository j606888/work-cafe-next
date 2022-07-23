import React from "react"
import AutoComplete from "./AutoComplete"

export default {
  title: "components/autocomplete",
  component: AutoComplete,
}

const Template = (args) => <AutoComplete {...args} />

export const Default = Template.bind({})
Default.args = {
  keyword: "台",
  texts: ["台北市", "台南市", "高雄市", "北台灣"],
}
