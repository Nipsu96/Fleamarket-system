import Login from "./Login";
import Register from "./Register";
import { useState } from "react";



function Login_SignUp_page() {
    const [isOpen, setIsOpen] = useState("");

  function toggleOpen(e) {
    setIsOpen(e.target.value)
  }

    return (
        <div className="container">
        <button onClick={toggleOpen} value = "Login">Kirjaudu sisään</button>
        <button onClick={toggleOpen}  value = "Register">Rekisteröidy</button>
        {isOpen === "Login"? <Login/> : <Register/>}

          </div>
    );
}


export default Login_SignUp_page