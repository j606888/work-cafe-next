import MapV2 from "./index"

export default {
  component: MapV2,
}

export const Default = (args) => <MapV2 {...args} />
Default.args = {}
Default.parameters = {
  nextRouter: {
    path: "/v2/[[...location]]",
    asPath: "/v2",
    isReady: true,
  },
};
