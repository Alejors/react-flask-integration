import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./js/store/appContext";
import { Home } from "./js/views/home";
import Register from "./js/views/register";
import Login from "./js/views/login";
import UpdateProfile from "./js/views/updateprofile";
import Profile from "./js/views/profile";
import { Error } from "./js/views/error";


import Navbar from "./js/components/navbar"
import Footer from "./js/components/footer";

function Layout() {
  const basename = process.env.BASENAME || "";

  return (
    <div>
        <BrowserRouter basename={basename}>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/updateprofile' component={UpdateProfile} />
            <Route component={Error}/>
          </Switch>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default injectContext(Layout);