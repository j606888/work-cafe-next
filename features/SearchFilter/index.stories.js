import SearchFilter from "./index"

export default {
  component: SearchFilter,
}

export const Default = (args) => <SearchFilter {...args} />
Default.args = {
  defaultChecked: false
}
