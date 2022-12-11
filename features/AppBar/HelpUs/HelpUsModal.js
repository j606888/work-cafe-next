import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import RateReviewIcon from "@mui/icons-material/RateReview"
import ReportIcon from "@mui/icons-material/Report"
import BugReportIcon from "@mui/icons-material/BugReport"
import styled from "styled-components"

const Item = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 4px;
`

const Link = styled.a`
  color: #ffa233;
`

const Button = styled.button`
  background-color: #ffa233;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #ffd9ab;
  }
`

const HelpUsModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>幫助我們做得更好</DialogTitle>
      <DialogContent>
        <DialogContentText>
          這個網站才剛起步，需要眾人的力量才能讓整個網站的功能更加完整。
        </DialogContentText>
        <br />
        <DialogContentText>
          <Item>
            <RateReviewIcon />
            <b>填寫評論：</b>
          </Item>
          無需登入，透過搜尋匡直接找尋你已知的口袋名單，並且給予評論。這會是最大的幫助！
        </DialogContentText>
        <br />
        <DialogContentText>
          <Item>
            <ReportIcon />
            <b>回報不適合工作：</b>
          </Item>
          有些店家根本不適合出現在這邊（例如：連鎖手搖飲、無內用空間或是純餐廳）。點擊店家資訊中的回報按鈕，我們會定期去將這些回報的店家移除
        </DialogContentText>
        <br />
        <DialogContentText>
          <Item>
            <BugReportIcon />
            <b>回報問題或建議：</b>
          </Item>
          如果使用中有發現任何 Bug, 或是你覺得有什麼很酷的點子都歡迎填寫
          <Link
            href="https://forms.gle/Y5XjmzsRW7pG7Wbu8"
            target="_blank"
            rel="noreferrer"
          >
            表單
          </Link>
          來回報
        </DialogContentText>
        <DialogActions>
          <Button onClick={onClose}>我知道了</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default HelpUsModal
