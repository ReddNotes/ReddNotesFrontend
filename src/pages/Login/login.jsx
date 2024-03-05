// ! modules
import { NavLink } from 'react-router-dom'

// ? assets
import fullLogo from './../../assets/ReddNotes_logo_full.svg';

// ? style
import './login.css'

export default function Login() {
    return(
        <div className='login_bg'>
            <div className='login_container'>
                <img src={fullLogo} alt='Reddnotes Logo' />
                <h1>Welcome back user</h1>
                <form>
                    <h2>Nickname</h2>
                    <input type="text" placeholder='PizzaGuy'/>
                    <h2>Password</h2>
                    <input type="password" placeholder='GF3g5G6F89'/>
                </form>
                <p className='login_error_msg'>Something was wrong...</p>
                <button className='button login_submit_button'>Login</button>
                <p className='login_bottom_text'>Do not have account yet ? <NavLink className='link' to='/register'>Register</NavLink></p>
            </div>
        </div>
    )
}