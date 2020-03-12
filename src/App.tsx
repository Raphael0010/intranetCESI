import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { isLogged } from "./utils/login";
import Trombinoscope from "./components/Trombinoscope/Trombinoscope";
import Publication from "./components/Publication/Publication";

const App: React.FC = () => {
  const PrivateRoute = ({ component, ...rest }: any) => {
    let isAuthenticated = false;
    if (isLogged()) {
      isAuthenticated = true;
    }
    const routeComponent = (props: any) =>
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: "/" }} />
      );
    return <Route {...rest} render={routeComponent} />;
  };

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard/" component={Dashboard} />
        <PrivateRoute path="/trombinoscope/" component={Trombinoscope} />
        <PrivateRoute path="/publication/" component={Publication} />
        <PrivateRoute path="/logout/" component={Dashboard} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
