import StoreOpeningHours from "@/components/StoreOpeningHours"

export default {
  title: "components/StoreOpeningHours",
}

function build_intervals(label, intervalHours) {
  return {
    label,
    intervals: intervalHours.map((hours) => ({
      start: hours[0],
      end: hours[1],
    })),
  }
}

export const Default = (args) => <StoreOpeningHours {...args} />
Default.args = {
  isOpen: false,
  openHours: [
    build_intervals("星期日", []),
    build_intervals("星期一", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期二", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期三", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期四", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期五", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
    build_intervals("星期六", [
      ["10:30", "14:00"],
      ["16:30", "19:30"],
    ]),
  ],
}

export const OneInterval = (args) => <StoreOpeningHours {...args} />
OneInterval.args = {
  isOpen: true,
  openHours: [
    build_intervals("星期日", []),
    build_intervals("星期一", [["10:30", "14:00"]]),
    build_intervals("星期二", [["10:30", "14:00"]]),
    build_intervals("星期三", [["10:30", "14:00"]]),
    build_intervals("星期四", []),
    build_intervals("星期五", [["10:30", "14:00"]]),
    build_intervals("星期六", [["10:30", "14:00"]]),
  ],
}
