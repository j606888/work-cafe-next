import React, { useState } from "react"
import Table from "components/Table"
import { getUsers } from "api/users"
import { useEffect } from "react"
import Skeleton from "components/Skeleton"
import { useReducer } from "react"

const columns = [
  createCol("name", "Name", "left", false),
  createCol("email", "Email", "left", false),
  createCol("reviewsCount", "Reviews", "left", false),
  createCol("createdAt", "Created At", "left", true),
]

function createCol(id, label, align, canOrder) {
  return {
    id,
    label,
    align,
    canOrder,
  }
}

const INITIAL_STATE = {
  page: 1,
  per: 10,
  order: "desc",
  orderBy: "id",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ORDER":
      return {
        ...state,
        order: action.payload.order,
        orderBy: action.payload.orderBy,
      }
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload.page,
      }
    case "CHANGE_PER":
      return {
        ...state,
        per: action.payload.per,
        page: 1,
      }
    default:
      throw new Error("Action not exist")
  }
}

export default function AdminUserList() {
  const [users, setUsers] = useState([])
  const [params, dispatch] = useReducer(reducer, INITIAL_STATE)

  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function callAPI() {
      const res = await getUsers(params)
      setUsers(res.users)
      setTotalCount(res.paging.totalCount)
    }
    callAPI()
  }, [params])

  if (users.length === 0) {
    return <Skeleton />
  }

  return (
    <Table
      cols={columns}
      rows={users}
      type="User"
      totalCount={totalCount}
      onPageChange={(page) =>
        dispatch({ type: "CHANGE_PAGE", payload: { page } })
      }
      onPerChange={(per) => dispatch({ type: "CHANGE_PER", payload: { per } })}
      onHeaderClick={(order, orderBy) =>
        dispatch({ type: "CHANGE_ORDER", payload: { order, orderBy } })
      }
      {...params}
    />
  )
}
