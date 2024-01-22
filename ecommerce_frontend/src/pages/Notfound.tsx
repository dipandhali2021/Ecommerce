import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="container not-found error">
        <h1>404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
        <Link to={'/'}>Back to home page</Link>

    </div>
  )
}

export default NotFound