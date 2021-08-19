import styles from './Landing.module.css'
import { Link } from 'react-router-dom'


const Landing = ({user}) => {
  return (
    <main className={styles.container}>
      <h1>
        Hello, {user ? user.name : "friend"}
      </h1>
      
        {user ? 
        <ul>     
         <Link 
        className="btn-sm btn-light"
        to = "/addActivity"
        >Going solo?</Link>
        <Link 
        className="btn-sm btn-light"
        to ={{
          pathname: '/groupAddActivity'
        }}
        >Wanna do it as a group?</Link></ul>
        : <ul></ul>}
      
    </main>
  )
}
 
export default Landing