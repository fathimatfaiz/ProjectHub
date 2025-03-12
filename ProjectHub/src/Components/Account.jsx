import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Account = () => {
  const {id} = useParams()
  useEffect(() => {
    axios.get('http://localhost:3000/auth/student/'+id)
    .then(result => console.log(result.data))
    .catch(err => console.log(err))
  }, [])
  return (
    <div>Account</div>
  )
}

export default Account