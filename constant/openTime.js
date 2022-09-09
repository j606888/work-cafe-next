export const OPEN_TYPES = {
  NONE: 'NONE',
  OPEN_NOW: 'OPEN_NOW',
  OPEN_AT: 'OPEN_AT'
}

function createLabel(label, value) {
  return { label, value }
}

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
  createLabel("深夜", 0),
  createLabel("凌晨 1:00", 1),
  createLabel("凌晨 2:00", 2),
  createLabel("凌晨 3:00", 3),
  createLabel("凌晨 4:00", 4),
  createLabel("清晨 5:00", 5),
  createLabel("清晨 6:00", 6),
  createLabel("清晨 7:00", 7),
  createLabel("早上 8:00", 8),
  createLabel("早上 9:00", 9),
  createLabel("早上 10:00", 10),
  createLabel("早上 11:00", 11),
  createLabel("中午", 12),
  createLabel("下午 1:00", 13),
  createLabel("下午 2:00", 14),
  createLabel("下午 3:00", 15),
  createLabel("下午 4:00", 16),
  createLabel("下午 5:00", 17),
  createLabel("下午 6:00", 18),
  createLabel("晚上 7:00", 19),
  createLabel("晚上 8:00", 20),
  createLabel("晚上 9:00", 21),
  createLabel("晚上 10:00", 22),
  createLabel("晚上 11:00", 23),
]
