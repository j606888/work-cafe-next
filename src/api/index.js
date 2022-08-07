import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function createCrawlRecord(crawlRecord) {
  await instance.post("/crawl-records", crawlRecord)
}

export async function getCrawlRecords() {
  const res = await instance.get("/crawl-records")
  return res.data
}

export default {
  createCrawlRecord,
  getCrawlRecords,
}
