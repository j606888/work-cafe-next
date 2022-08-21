import React from 'react'
import { TableCell, TableRow, TableBody } from "@mui/material"
import Link from "next/link"

const Row = ({ row }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Link href={`/admin/stores/${row.placeId}`}>{row.name}</Link>
      </TableCell>
      <TableCell>{row.city}</TableCell>
      <TableCell align="right">{row.rating}</TableCell>
      <TableCell align="right">{row.phone}</TableCell>
      <TableCell align="right">{row.userRatingsTotal}</TableCell>
      <TableCell align="right">
        <a target="_blank" href={row.url} rel="noreferrer" >
          Google Map
        </a>
      </TableCell>
    </TableRow>
  )
}

const Body = ({ rows }) => {
  return (
    <TableBody>
      {rows.map((row) => {
        return <Row row={row} key={row.id} />
      })}
    </TableBody>
  )
}

export default Body
