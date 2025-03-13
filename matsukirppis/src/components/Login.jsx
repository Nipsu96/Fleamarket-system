/* eslint-disable react/prop-types */
import { useState  } from 'react'
import '../App.css'
import axios from 'axios';




function Login() {
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    //Look at this closer
    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value})
    }

      const doSubmit = async (e) => {
        e.preventDefault()
        let token = null
        console.log("Login aloitettu!")
    try {
        token = await axios.post('http://localhost:8081/api/user/login',userData)
        console.log("token",token)
        } catch (error) {
        //     let errorMessage = error.response.data.error
        //     setPopupInfo(errorMessage)
        //     setIsOpen(!isOpen)
          console.log("error",error);
        }
    }

  return (
    <div className='login'>
        <h3>Kirjaudu sisään</h3>
        <form className="login_form" onSubmit={e => doSubmit(e)}>
                    <label className="label_white" htmlFor="username">Käyttäjätunnus:</label>
                    <input type="text" id="username" name="username" placeholder="Käyttäjätunnus" onChange={onChange} required></input><br />

                    <label className="label_white" htmlFor="password">Salasana:</label>
                    <input type="password" id="password" name="password" placeholder="Salasana" onChange={onChange} required></input><br />

                <button onClick={doSubmit} className="btn" type="submit">
                    Kirjaudu sisään
                </button>
        </form>

    </div>
  )
}

export default Login
