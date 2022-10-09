const styledTheme = {
  sidebarWidth: '374px',
}

const sizes = {
  iphoneSE: '375px',
  iphone13: '390px',
  macBookPro14: '1440px',
}

export const devices = {
  iphoneSE: `(max-width: ${sizes.iphoneSE})`,
  iphone13: `(max-width: ${sizes.iphone13})`,
  macBookPro14: `(max-width: ${sizes.macBookPro14})`
}

export default styledTheme
