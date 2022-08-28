import Hero from "./index"

export default {
  component: Hero
}

export const Default = (args) => <Hero {...args} />
Default.args = {}
