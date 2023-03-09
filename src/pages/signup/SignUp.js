import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classes from './SignUp.module.css';
import { authActions } from '../../components/store/auth-slice';

const SignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let url;
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC11j4nqdRXJxH7y93f47NkyPAWUKvXMNw'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC11j4nqdRXJxH7y93f47NkyPAWUKvXMNw'
        }
        const response = await fetch(url, {
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
            let email = data.email.replace('@', '').replace('.', '');
            localStorage.setItem('email', email);
            localStorage.setItem('token', data.idToken);
            console.log(data);
            history.replace('/welcome');
            dispatch(authActions.login({token: data.idToken, email: email}));
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
            <h4>{isLogin ? 'Login' : 'SignUp'}</h4>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder="Email" ref={emailInputRef} required />
                <input type='password' placeholder="password" ref={passwordInputRef} required />
                <input type='password' placeholder="confirm password" ref={confirmPasswordRef} required />
                <Button variant='dark' type='submit' size='md'>{isLogin ? 'Login' : 'Sign up'}</Button>
            </form>
            <h6
                className={classes.toggle}
                onClick={switchAuthModeHandler}
            >
                {isLogin ? 'Create new account' : 'Already have an account? Login.'}
            </h6>
        </section>
    )
}

export default SignUp;