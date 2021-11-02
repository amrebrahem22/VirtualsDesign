// React Required
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Redux
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from './store/reducers'

// Create Import File
import "./index.scss";

import PageScrollTop from "./component/PageScrollTop";

import DigitalAgency from "./home/DigitalAgency";
import Service from "./elements/Service";
import ServiceDetails from "./elements/ServiceDetails";
import About from "./elements/About";
import Contact from "./elements/Contact";
import PortfolioDetails from "./elements/PortfolioDetails";
import Blog from "./elements/Blog";
import BlogDetails from "./elements/BlogDetails";
import error404 from "./elements/error404";
import Dashboard from './dashboard/Dashboard'
import TeamMember from "./dashboard/TeamMember";
import PortfolioDash from "./dashboard/PortfolioDash";
import CareerDash from "./dashboard/CareerDash";
import ServicesDash from "./dashboard/ServicesDash";
import BlogDash from "./dashboard/BlogDash";
import Login from "./dashboard/Login";
import Portfolio from "./blocks/Portfolio";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

class Root extends Component {
    render() {
        return (
            <BrowserRouter basename={"/"}>
                <PageScrollTop>
                    <Switch>
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/`}
                            component={DigitalAgency}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/dashboard/login`}
                            component={Login}
                        />
                        <Route
                            path="/dashboard"
                            render={({ match: { url } }) => (
                            <Dashboard>
                                <Route path={`${url}/`} component={TeamMember} exact />
                                <Route path={`${url}/team`} component={TeamMember} />
                                <Route path={`${url}/portfolio`} component={PortfolioDash} />
                                <Route path={`${url}/career`} component={CareerDash} />
                                <Route path={`${url}/services`} component={ServicesDash} />
                                <Route path={`${url}/blog`} component={BlogDash} />
                            </Dashboard>
                            )}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/services`}
                            component={Service}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/services/:id`}
                            component={ServiceDetails}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/contact`}
                            component={Contact}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/about`}
                            component={About}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/portfolio/:id`}
                            component={PortfolioDetails}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/blog`}
                            component={Blog}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/blog/:id`}
                            component={BlogDetails}
                        />
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/portfolio`}
                            component={Portfolio}
                        />
                        <Route
                            path={`${process.env.PUBLIC_URL}/404`}
                            component={error404}
                        />
                        <Route component={error404} />
                    </Switch>
                </PageScrollTop>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>
    , document.getElementById("root"));
serviceWorker.register();
