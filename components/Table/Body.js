import React from "react"
import { TableCell, TableRow, TableBody } from "@mui/material"
import Link from "next/link"

const StoreRow = ({ row }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Link href={`/admin/stores/${row.placeId}`}>{row.name}</Link>
      </TableCell>
      <TableCell align="right">{row.city}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
      <TableCell align="right">{row.userRatingsTotal}</TableCell>
      <TableCell align="right">
        <a target="_blank" href={row.url} rel="noreferrer">
          Google Map
        </a>
      </TableCell>
    </TableRow>
  )
}

const UserRow = ({ row }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Link href={`/admin/users/${row.id}`}>{row.name}</Link>
      </TableCell>
      <TableCell align="right">{row.email}</TableCell>
      <TableCell align="right">{row.createdAt}</TableCell>
    </TableRow>
  )
}

const Body = ({ type, rows }) => {
  if (!rows) return <p>Nothing</p>

  return (
    <TableBody>
      {rows.map((row) => {
        if (type === "User") return <UserRow key={row.id} row={row} />
        if (type === "Store") return <StoreRow key={row.id} row={row} />
      })}
    </TableBody>
  )
}

export default Body
