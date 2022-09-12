import { Avatar, Chip, Divider } from '@mui/material'
import FaceIcon from 'components/FaceIcon'
import React from 'react'
import styled from 'styled-components'
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import { ReviewWords } from 'constant/i18n'


const Container = styled.div`
padding: 1rem 1.5rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

 
  p {
    white-space: pre-line;
    margin-top: 0.5rem;
    font-size: 14px;
    line-height: 150%;
  }
`

 const InfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  .store-info {
    display: flex;
    flex-direction: column;
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    display: block;
  }

  .address {
    font-size: 12px;
    color: #777;
  }
`

const ScoreDateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const TagsContainer = styled.div`
display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const FACE_MAP = {
  yes: "happy",
  normal: "normal",
  no: "bad",
}

const ICON_MAP = {
  roomVolume: <VolumeUpIcon />,
  timeLimit: <AccessAlarmIcon />,
  socketSupply: <ElectricalServicesIcon />,
}

const IconChip = ({ type, value }) => {
  if (!value) return null
  const label = ReviewWords[type][value]

  return (
    <Chip icon={ICON_MAP[type]} label={label} variant="outlined" size="small" />
  )
}

function timeFormat(timestamp) {
    var mistiming = Math.round((Date.now() - timestamp) / 1000000);
    var arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
    var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
    for (var i = 0; i < arrn.length; i++) {
        var inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
            return inm + arrr[i] + '前';
        }
    }
}

const ReviewStoreCard = ({ store, recommend, roomVolume, timeLimit, socketSupply, description, createdAt }) => {

  return (
    <>
      <Container>
        <InfoBox>
          <Avatar
            alt={"storename"}
            sx={{ width: 36, height: 36, mr: 1.5 }}
            src={store.imageUrl}
          />
          <div className='store-info'>
            <span className='name'>{store.name}</span>
            <span className='address'>{store.address}</span>
          </div>
        </InfoBox>
        <ScoreDateBox>
          <FaceIcon size={36} type={FACE_MAP[recommend]} />
          <span>{timeFormat(createdAt)}</span>
        </ScoreDateBox>

        <TagsContainer>
          <IconChip type="roomVolume" value={roomVolume} />
          <IconChip type="timeLimit" value={timeLimit} />
          <IconChip type="socketSupply" value={socketSupply} />
        </TagsContainer>
        <p>{description}</p>
      </Container>
      <Divider />
    </>
  )
}

export default ReviewStoreCard
