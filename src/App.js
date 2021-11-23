/* eslint-disable react/jsx-no-comment-textnodes */
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import * as ROUTES from "./constants/routes"
import './styles/misc.css'

const Dashboard = lazy(() => import("./pages/dashboard"));
const Note = lazy(() => import("./pages/note"));
const notfound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              //New Pages //End New Pages
              <Route path={ROUTES.NOTE} component={Note} />
              <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route component={notfound} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
