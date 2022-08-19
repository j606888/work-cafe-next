import { instance } from "./index"

export async function createCrawlRecord(crawlRecord) {
  await instance.post("/admin/map-crawlers", crawlRecord)
}

export async function getCrawlRecords({ lat, lng }) {
  const params = { lat, lng }
  const res = await instance.get("/admin/map-crawlers", { params })
  return res.data
}
