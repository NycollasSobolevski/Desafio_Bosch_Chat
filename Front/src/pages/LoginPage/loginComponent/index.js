import styles from '../styles.module.scss'


const LoginComponent = ( params ) => {
  if(params.subscribe) return
  return (
    <>
      <div className={styles.Container}>
        <input type="text" placeholder='Username / Email'/>
        <input type="password" placeholder='Password'/>
        <div className={styles.ButtonSession}>
          <button>Login</button>
          <button>Subscribe</button>
        </div >
      </div>
    </>
  )
}

export default LoginComponent