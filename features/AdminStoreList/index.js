import React, { useState, useEffect, useReducer } from "react"
import StickyHeadTable from "components/StickyHeadTable"
import RatingSelect from "components/Select/RatingSelect"
import Skeleton from "components/Skeleton"
import Select from "components/Select"
import { getStores } from "api/stores"
import cityMap from "config/cityMap"
import { Box } from "@mui/material"

const cityList = cityMap.map((city) => city.name)

function createCol(id, name, align) {
  return {
    id: id,
    label: name,
    align,
    minWidth: 170,
    format: align === "right" ? (value) => value.toLocaleString("en-US") : null,
  }
}

const columns = [
  createCol("name", "Name"),
  createCol("city", "City"),
  createCol("rating", "Rating", "right"),
  createCol("phone", "Phone", "right"),
  createCol("userRatingsTotal", "UserRatingsTotal", "right"),
  createCol("url", "googleUrl", "right"),
]

const INITIAL_STATE = {
  page: 1,
  per: 10,
  rating: null,
  cities: [],
  order: "desc",
  orderBy: "name",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "PAGE_CHANGE":
      return {
        ...state,
        page: action.payload.page,
      }
    case "PER_CHANGE":
      return {
        ...state,
        page: 0,
        per: action.payload.per,
      }
    case "RATING_CHANGE":
      return {
        ...state,
        rating: action.payload.rating,
      }
    case "ORDER_CHANGE":
      return {
        ...state,
        order: action.payload.order,
        orderBy: action.payload.orderBy,
      }
    case "CITY_CHANGE":
      return {
        ...state,
        cities: action.payload.cities,
      }
    default:
      throw new Error("Action not exist")
  }
}

const AdminStoreList = () => {
  const [stores, setStores] = useState([])
  const [params, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [totalCount, setTotalCount] = useState(0)

  const handleChange = (e) => {
    const cities = e.map((l) => l.value)
    dispatch({ type: "CITY_CHANGE", payload: { cities } })
  }

  useEffect(() => {
    ;(async () => {
      const data = await getStores(params)
      setStores(data.stores)
      setTotalCount(data.paging.totalCount)
    })()
  }, [params])

  return stores.length === 0 ? (
    <Skeleton />
  ) : (
    <>
      <Box mb={1}>
        <RatingSelect
          rating={params.rating}
          onChange={(rating) =>
            dispatch({ type: "RATING_CHANGE", payload: { rating } })
          }
        />
      </Box>
      <Box mb={2}>
        <Select options={cityList} handleChange={handleChange} />
      </Box>
      <StickyHeadTable
        columns={columns}
        rows={stores}
        totalCount={totalCount}
        onChange={(order, orderBy) =>
          dispatch({ type: "ORDER_CHANGE", payload: { order, orderBy } })
        }
        onPageChange={(page) =>
          dispatch({ type: "PAGE_CHANGE", payload: { page } })
        }
        onPerChange={(per) =>
          dispatch({ type: "PER_CHANGE", payload: { per } })
        }
        {...params}
      />
    </>
  )
}

export default AdminStoreList
