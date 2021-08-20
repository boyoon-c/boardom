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
          to = "/addActivity"
        >
         <button className="mb-2 ml-3 px-12 btn btn-outline-secondary" >
          Going solo????
          </button>
        </Link>
        <br />
        <Link 
          to ={{
            pathname: '/groupAddActivity'
          }}
        >
         <button className=" px-10 btn btn-outline-secondary"> Are you a group???
         </button>
           </Link></ul>
        : <ul></ul>}
      
    </main>
  )
}
 
export default Landing