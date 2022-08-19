import Select from "./index"
import cityMap from "../../config/cityMap"

export default {
  title: "components/Select",
}

const cities = cityMap.map(city => city.name)
export const Default = (args) => <Select {...args} />
Default.args = {
  options: cities
}
