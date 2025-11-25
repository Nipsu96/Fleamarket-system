import { useState } from "react";
import axios from 'axios';

function Register() {
    const [userData, setUserData] = useState({
        username: '',
        email:'',
        password: '',
        phonenumber:''
    })

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value})
    }

    // Handling the form submission
    const doSubmit = async (e) => {
        e.preventDefault()
        let token = null
        console.log("Käyttäjän lisäys aloitettu!")
    try {
        token = await axios.post('http://localhost:8081/api/user/addUser',userData)
        console.log("token",token)
        } catch (error) {
        //     let errorMessage = error.response.data.error
        //     setPopupInfo(errorMessage)
        //     setIsOpen(!isOpen)
          console.log("error",error);
        }
    }



    return (
        <div className="singup">
            <div>
                <h3>Luo Käyttäjä</h3>
            </div>
            <form className="signup_form">
                {/* Labels and inputs for form data */}
                <label className="label" name="Username">Käyttäjänimi</label>
                <input
                    onChange={onChange}
                    className="input"
                    name="username"
                    type="text"
                    required
                />

                <label className="label" name="Email">Sähköposti</label>
                <input
                    onChange={onChange}
                    className="input"
                    name="email"
                    type="email"
                    required
                />

                  <label className="label" name="Phonenumber">Puhelinnumero</label>
                <input
                    onChange={onChange}
                    className="input"
                    name="phonenumber"
                    type="tel"
                    pattern="[0-9]{15}"
                    required
                />

                <label className="label" name="Password">Salasana</label>
                <input
                    onChange={onChange}
                    className="input"
                    name="password"
                    type="password"
                    required
                />

                <button onClick={doSubmit} className="btn" type="submit">
                    Luo Käyttäjä
                </button>
            </form>
        </div>
    );
}


export default Register