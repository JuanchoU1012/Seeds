import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getTokenInfo } from '../../../helpers/getjwt.js'
import { U401 } from '../401'

export const AdminMain = () => {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const tokenData = await getTokenInfo()
      setUserData(tokenData)
      setIsLoading(false)
    }
    fetchData()
  }, [])



  if (!userData) {
    return <U401 />
  }

  return (
    <Fragment>
      <h1>About</h1>
      <div>
        <h2>User Information</h2>
        <p>Role: {userData.rol}</p>
        <p>User ID: {userData.IdAccesoUsuario}</p>
        <p>Email: {userData.sub}</p>
      </div>

      <div className="actions">
        <Link to="/admin/users" className="btn btn-primary">Users</Link>
        <Link to="/admin/recipes" className="btn btn-primary">Recipes</Link>
        <Link to="/admin/seeds" className="btn btn-primary">Seeds</Link>
      </div>
    </Fragment>
  )
}
