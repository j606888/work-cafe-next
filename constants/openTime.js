function createLabel(label, value) {
  return { label, value }
}

export const OPEN_TYPES = [
  createLabel("不限時間", "NONE"),
  createLabel("營業中", "OPEN_NOW"),
  createLabel("指定時間", "OPEN_AT"),
]

export const OPEN_WEEKS = [
  createLabel("星期日", 0),
  createLabel("星期一", 1),
  createLabel("星期二", 2),
  createLabel("星期三", 3),
  createLabel("星期四", 4),
  createLabel("星期五", 5),
  createLabel("星期六", 6),
]

export const OPEN_HOURS = [
  createLabel("不限時間", 99),
  createLabel("上午 0:00", 0),
  createLabel("上午 1:00", 1),
  createLabel("上午 2:00", 2),
  createLabel("上午 3:00", 3),
  createLabel("上午 4:00", 4),
  createLabel("上午 5:00", 5),
  createLabel("上午 6:00", 6),
  createLabel("上午 7:00", 7),
  createLabel("上午 8:00", 8),
  createLabel("上午 9:00", 9),
  createLabel("上午 10:00", 10),
  createLabel("上午 11:00", 11),
  createLabel("下午 12:00", 12),
  createLabel("下午 1:00", 13),
  createLabel("下午 2:00", 14),
  createLabel("下午 3:00", 15),
  createLabel("下午 4:00", 16),
  createLabel("下午 5:00", 17),
  createLabel("下午 6:00", 18),
  createLabel("下午 7:00", 19),
  createLabel("下午 8:00", 20),
  createLabel("下午 9:00", 21),
  createLabel("下午 10:00", 22),
  createLabel("下午 11:00", 23),
]
