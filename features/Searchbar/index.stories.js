import Demo from "."

export default {
  component: Demo,
  argTypes: {
    onChange: { action: 'Change' },
    onInputChange: { action: 'InputChange' },
  }
}

export const Default = (args) => <Demo {...args} />
Default.args = {}
