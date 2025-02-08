import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const U401 = () => {
  return (
    <Fragment>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>Oops!</h1>
              <h2>401 Unauthorized</h2>
              <div className="error-details mb-4">
                You dont have permission to access this page.
              </div>
              <div className="error-actions">
                <Link to="/" className="btn btn-primary btn-lg">
                  <span className="glyphicon glyphicon-home"></span>
                  Take Me Home
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg ms-3">
                  <span className="glyphicon glyphicon-log-in"></span>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
