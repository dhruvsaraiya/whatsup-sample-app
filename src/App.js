import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import QRForm from "./components/QRForm";
import ChatContainer from "./components/ChatContainer";
import { getWhatsUpProxyAccessToken } from "./apis/local";
import { loadWhatsup } from "./helpers/loginHelper";
import { whatsupWidget } from "whatsup-sdk";
import Spinner from "react-bootstrap/Spinner";

function App() {
  return (
    <div className="App" >
      <Router>
        <Switch>
          <Redirect exact from="/" to={"/chats"} />
          <Route path="/login" component={LoginForm} />
          <PrivateRoute path="/qrscan" component={QRForm} />
          <PrivateRoute path="/chats" component={ChatContainer} />
        </Switch>
      </Router>
    </div>
  );
}

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const [loading, setLoading] = useState(!whatsupWidget.isWidgetLoaded());
  const history = useHistory();
  useEffect(() => {
    (async function () {
      const wupat = getWhatsUpProxyAccessToken();
      if (!wupat) {
        history.replace("/login");
        return null;
      }
      if (!whatsupWidget.isWidgetLoaded()) {
        setLoading(true);
        await loadWhatsup();
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner animation="grow" variant="primary" />;
  } else {
    return (
      <Route
        path={path}
        render={(props) => <Component {...props} />}
        {...rest}
      />
    );
  }
};
export default App;
