import styles from './Landing.module.css'
import { Link } from 'react-router-dom'


const Landing = ({user}) => {
  return (
    <main className={styles.container}>
      <h1>
        Hello, {user ? user.name : "friend"}
      </h1>
      <ul>
      <Link 
         className="btn-sm btn-light"
      >Going solo?</Link>
      <Link 
         className="btn-sm btn-light"
        
      >Wanna do it as a group?</Link>
      </ul>
    </main>
  )
}
 
export default Landing