import Searchbar from "."

export default {
  component: Searchbar,
  argTypes: {
    onChange: { action: 'Change' },
    onInputChange: { action: 'InputChange' },
  }
}

export const Default = (args) => <Searchbar {...args} />
Default.args = {}
