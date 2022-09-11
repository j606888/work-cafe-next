import React from "react"
import RecommendBlock from "./RecommendBlock"
import { Temp, Form } from './styled'

const ReviewForm = ({ name, onChange = () => {} }) => {
  const handleRecommendChange = (recommend) => {
    onChange({ recommend })
  }

  return (
    <Temp>
      <Form>
        <h3>{name}</h3>
        <RecommendBlock onChange={handleRecommendChange}/>
      </Form>
    </Temp>
  )
}

export default ReviewForm
