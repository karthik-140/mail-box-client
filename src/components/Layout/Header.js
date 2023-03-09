import { Navbar, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useHistory } from "react-router-dom";

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

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >Mail-Box-Client</Navbar.Brand>
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