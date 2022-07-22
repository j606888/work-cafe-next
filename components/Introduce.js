import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Introduce = () => {
  return (
    <Box sx={{ backgroundColor: "#F6EEE8" }} p={3}>
      <Container maxWidth="md">
        <Stack direction="row" spacing={8}>
          <Box>
            <Image src="/human1.png" alt="human1" width="239" height="386" />
          </Box>
          <Box py={5}>
            <Typography variant="h6" component="h3" mb={3}>
              Work Cafe 如何篩選「適合工作」的咖啡店？
            </Typography>
            <Typography variant="body2" component="p" mb={3}>
              在Work Cafe註冊登入後，所有人都能為去過的咖啡店評分。我們優先
              <Box sx={{ display: "inline" }} fontWeight={500}>
                推薦至少5位用戶評過分，且超過6成評分者標註為「適合工作」
              </Box>
              的咖啡店。
            </Typography>
            <Typography variant="body2" component="p" mb={3}>
              評分者可以針對4大適合工作的咖啡店要素
              <Box sx={{ display: "inline" }} fontWeight={500}>
                「安靜程度」、「座位舒適程度」、「是否有限時」和「是否有插座」
              </Box>
              給予評價。你可以參考不同要素的評價，選擇適合自己工作的咖啡店。
            </Typography>
            <Typography variant="caption" mb="p">
              註：Work Cafe 定義的「適合工作」是指看書、用電腦做事
              等個人工作，不包含多人討論情境。
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Introduce
