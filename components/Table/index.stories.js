import Table from "./index"

export default {
  title: "Components/Table/Table",
  argTypes: {
    onPageChange: { action: 'onPageChange' },
    onPerChange: { action: 'onPerChange' },
  }
}

function createCol(id, label, align, canOrder) {
  return {
    id, label, align, canOrder
  }
}

function createUserRow(id, name, createdAt) {
  return {
    id,
    name,
    createdAt,
    email: `${name}@gmail.com`,
  }
}

export const Default = (args) => <Table {...args} />
Default.args = {
  type: "User",
  cols: [
    createCol('id', 'ID', 'left', true),
    createCol('name', 'Name', 'left', false),
    createCol('email', 'Email', 'right', false),
    createCol('createdAt', 'Created At', 'right', true),
  ],
  rows: [
    createUserRow(1, "James", "2022/08/31"),
    createUserRow(2, "Steve", "2022/10/11"),
    createUserRow(3, "Bob", "2022/09/18"),
    createUserRow(4, "Alex", "2023/01/01"),
    createUserRow(11, "James", "2022/08/31"),
    createUserRow(12, "Steve", "2022/10/11"),
    createUserRow(13, "Bob", "2022/09/18"),
    createUserRow(14, "Alex", "2023/01/01"),
    createUserRow(21, "James", "2022/08/31"),
    createUserRow(22, "Steve", "2022/10/11"),
    createUserRow(23, "Bob", "2022/09/18"),
    createUserRow(24, "Alex", "2023/01/01"),
  ],
}
