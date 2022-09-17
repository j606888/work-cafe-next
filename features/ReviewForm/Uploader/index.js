import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import StorePhotoApi from 'api/store-photo'

const Container = styled.div`
  padding: 1rem;
  border: 1px solid red;
`

const Uploader = ({ placeId }) => {
  const [file, setFile] = useState()
  const handleClick = async (e) => {
    e.preventDefault()

    const { url } = await StorePhotoApi.getUploadLink({ placeId })
    const config = {
      headers: {
        'Content-Type': file.type
      }
    }
    await axios.put(url, file, config)
    const link = url.split("?")[0]
    await StorePhotoApi.createStorePhoto({ placeId, url: link })
  }
  const handleChange = (event) => {
    setFile(event.target.files[0])
  }

  return <Container>
    <input type="file" name="image" accept="image/*" 
      onChange={handleChange}
    />
    <button onClick={handleClick}>Upload</button>
  </Container>
}

export default Uploader
