export const colors = {
  green01: "#00945F",
  green02: "#99D4BF",
  green03: "#E5F4EF",
  black01: "#202022",
  black02: "#3F3F42",
  grey01: "#A3A3AF",
  grey02: "#E4E4E8",
  grey03: "#F3F3F4",
  white: "#FFFFFF",
  favorite: "#FF7CBB",
  position: "#5C8AFF",
}

const styledTheme = {
  sidebarWidth: "374px",
  breakpoints: {
    mobile: '720px',
    tablet: '1024px',
  },
  colors,
}

const sizes = {
  mobileSm: '375px',
  mobileMd: '390px',
  mobileXl: '420px',
}

export const devices = {
  mobileSm: `(max-width: ${sizes.mobileSm})`,
  mobileMd: `(max-width: ${sizes.mobileMd})`,
  mobileXl: `(max-width: ${sizes.mobileXl})`
}

export default styledTheme
