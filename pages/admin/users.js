import AdminUserList from "features/admin/AdminUserList"
import { LayoutAdmin } from "layout/admin"

const UserPage = () => {
  return <AdminUserList />
}

UserPage.PageLayout = LayoutAdmin

export default UserPage
