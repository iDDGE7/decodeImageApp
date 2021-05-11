import './styles.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [image, setImage] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [result, setResult] = useState('')

  const sendData = e => {
    e.preventDefault()
    if (image.length != 0) {
      const formData = new FormData()
      formData.append('imageInput', image, image.name)

      axios
        .post('http://127.0.0.1:5000/image/api/decode', formData)
        .then(res => {
          setResult(res.data.result)
        })
    }
  }

  const fileChange = e => {
    const file = e.target.files[0]
    setImage(file)
    setImageUrl(URL.createObjectURL(file))
  }

  return (
    <div className='App' className='wrapperApp'>
      <form action='' onSubmit={sendData} className='form-image'>
        <h1 className='title_form'>Choose one Image</h1>
        <input
          className='input_image'
          type='file'
          name='imageInput'
          onChange={fileChange}
        />
        <input className='input_decode' type='submit' value='decode' />
      </form>

      <div className='wrapperResults'>
        {imageUrl != '' && <img src={imageUrl} className='image-preview' />}

        <div className='result-text'>{result}</div>
      </div>
    </div>
  )
}

export default App
