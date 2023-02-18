import create from "zustand"

const formControlStore = create((set) => ({
  newReviewOpen: false,
  setNewReviewOpen: (open) =>
    set((state) => ({
      ...state,
      newReviewOpen: open,
    })),
  defaultDecision: null,
  setDefaultDecision: (decision) =>
    set((state) => ({
      ...state,
      defaultDecision: decision,
    })),
}))

export default formControlStore
