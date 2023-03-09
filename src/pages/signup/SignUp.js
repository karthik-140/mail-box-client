import { Button } from 'react-bootstrap';
import { useRef } from 'react';

import classes from './SignUp.module.css';

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC11j4nqdRXJxH7y93f47NkyPAWUKvXMNw', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("User has successfully signed up.");
        } else {
            let error = "Authentication failed";
            alert(error);
        }
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordRef.current.value = '';
        // .then((res) =>{
        //     if(res.ok){
        //         return res.json();
        //     }else{
        //         return res.json().then((data) =>{
        //             let errorMessage = "Authentication Failed";
        //             throw new Error(errorMessage);
        //         })
        //     }
        // }).then((data) =>{
        //     console.log("User has successfully signed up.");
        // }).catch((err)=>{
        //     alert(err.message)
        // })
    }

    return (
        <section className={classes.signup}>
            <h4>SignUp</h4>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder="Email" ref={emailInputRef} required />
                <input type='password' placeholder="password" ref={passwordInputRef} required />
                <input type='password' placeholder="confirm password" ref={confirmPasswordRef} required />
                <Button variant='dark' type='submit' size='md'>Sign up</Button>
            </form>
        </section>
    )
}

export default SignUp;