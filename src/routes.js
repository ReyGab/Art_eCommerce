import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import constantsHelper from './util/constants/constants';
import 'react-toastify/dist/ReactToastify.css';

import MainContainer from './features/main/container/main';
import LoginContainer from './features/login/container/login';
import AdminListContainer from './features/admin/list/container/admin';
import auth from '../src/auth';


const broswerHistory = createBrowserHistory();

const routes = () => {
    return (
        <Router history={broswerHistory}>
            <ToastContainer autoClose={constantsHelper.toastAutoCloseTime} />
            <Switch>
                <Route exact path="/">
                    <MainContainer history={broswerHistory} />
                </Route>
                <Route exact path="/admin" component={LoginContainer} />
                <Route exact path="/admin-list" 
                render={(props) => {
                    if(auth.isAuthenticated()) {
                        return <AdminListContainer />
                    } else {
                        return (
                            <Redirect to={{pathname: "/admin", state: {
                                from: props.location
                            }}}/>
                        )
                    }
                }}/>
                
            </Switch>

        </Router>
    )
}

export default routes;