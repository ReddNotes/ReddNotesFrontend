// ! modules
import { NavLink } from 'react-router-dom'

// ? assets
import fullLogo from './../../assets/ReddNotes_logo_full.svg';

// ? style
import './register.css'

export default function Register() {
    return(
        <div className='register_bg'>
            <div className='register_container'>
                <img src={fullLogo} alt='Reddnotes Logo' />
                <h1>Welcome back user</h1>
                <form>
                    <h2>Nickname</h2>
                    <input type="text" placeholder='PizzaGuy'/>
                    <h2>Password</h2>
                    <input type="password" placeholder='GF3g5G6F89'/>
                </form>
                <p className='register_error_msg'>Something was wrong...</p>
                <button className='button register_submit_button'>Register</button>
                <p className='register_bottom_text'>Already register ? <NavLink className='link' to={'/login'} >Login</NavLink></p>
            </div>
        </div>
    )
}