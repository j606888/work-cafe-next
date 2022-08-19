import AdminLayout from "./index"

export default {
  title: "components/AdminLayout",
}

export const Default = (args) => <AdminLayout {...args} />
Default.args = {
  children: <p>Hi</p>
}
