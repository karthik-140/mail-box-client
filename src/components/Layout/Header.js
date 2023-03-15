import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useHistory, Link } from "react-router-dom";
import classes from './Header.module.css';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.auth.isAuthenticated);

    const logoutHandler = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        dispatch(authActions.logout());
        history.replace('/auth');
    }

    const composeMailHandler = () => {
        history.replace('/mail');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Mail-Box-Client</Navbar.Brand>
                {isLogin && <ul className={classes.navbar}>
                    <li className={classes.li}><Link to="/inbox">Inbox</Link></li>
                    <li className={classes.li}><Link to="/sent">Sent</Link></li>
                </ul>}
                {isLogin && <Button size="sm" onClick={composeMailHandler}>Compose</Button>}
            </Container>
            {isLogin && <Button
                variant="warning"
                size="sm"
                style={{ marginRight: '35px' }}
                onClick={logoutHandler}
            >
                Logout
            </Button>}
        </Navbar>
    )
}

export default Header;

// import { Link} from "react-router-dom";
// import classes from "./Header.module.css";
// import { authActions } from "../store/auth-slice";
// import { useDispatch } from "react-redux";
// import ComposeMail from "../../pages/Mail/ComposeMail";
// import { uiActions } from "../store/ui-slice";
// const Header = () => {
//   const dispatch = useDispatch();

//   return (
//     <main>
//       <header className={classes.header}>
//         <h1 className={classes["header-title"]}>Mailbox</h1>
//         <div className={classes.actions}>
//           {/* <Link to="/compose">Compose</Link> */}
//           <button onClick={() => dispatch(uiActions.handleShow())}>Compose</button>
//         </div>
//         <div className={classes.actions}>
//           <Link to="/inbox">Inbox</Link>
//         </div>
//         <div className={classes.actions}>
//           <Link to="/sent">Sent Mail</Link>
//         </div>
//         <div className={classes.actions}>
//           <button onClick={() => dispatch(authActions.logout())}>Logout</button>
//         </div>
//       </header>
//       <ComposeMail/>
//     </main>
//   );
// };

// export default Header;