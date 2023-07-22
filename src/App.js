import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Header from './components/Layout/Header';
import SignUp from './pages/signup/SignUp';
//import Welcome from './pages/welcome/Welcome';
import { authActions } from './store/auth-slice';
import ComposeMail from './pages/Mail/ComposeMail';
import Inbox from './pages/Mail/Inbox';
import SentBox from './pages/Mail/SentBox';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (email && token) {
      dispatch(authActions.login({ email, token }))
    }
  }, [dispatch])

  return (
    <Switch>
      <Route path='/' exact>
        {!isLogin && <Redirect to='/auth' />}
        {isLogin && <Redirect to='/mail' />}
      </Route>
      <Route path='/auth'>
        <Header />
        <SignUp />
      </Route>
      <Route path='/mail'>
        <Header />
        {isLogin && <ComposeMail />}
        {!isLogin && <Redirect to='/' />}
      </Route>
      <Route path='/inbox'>
        <Header />
        {isLogin && <Inbox />}
        {!isLogin && <Redirect to='/' />}
      </Route>
      <Route path='/sent'>
        <Header />
        {isLogin && <SentBox />}
        {!isLogin && <Redirect to='/' />}
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
