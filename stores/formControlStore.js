import create from "zustand"

const formControlStore = create((set) => ({
  newReviewOpen: false,
  setNewReviewOpen: (open) =>
    set((state) => ({
      ...state,
      newReviewOpen: open,
    })),
}))

export default formControlStore
