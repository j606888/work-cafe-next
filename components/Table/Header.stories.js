import Header from "./Header"

export default {
  title: "Components/Table/Header",
  component: Header,
  argTypes: { onHeaderClick: { action: 'clicked'}}
}

function createCol(id, label, align, canOrder) {
  return {
    id, label, align, canOrder
  }
}

// TODO, how to test output function
export const Default = (args) => <Header {...args} />
Default.args = {
  cols: [
    createCol('name', 'Name', 'left', true),
    createCol('city', 'City', 'right', true),
    createCol('rating', 'Rating', 'right', true),
    createCol('userRatingsTotal', 'UserRatingsTotal', 'right', true),
    createCol('url', 'googleUrl', 'right', false),
  ],
}
