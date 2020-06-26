import React from 'react';
import './App.scss';
import {LoginPage} from "./pages/login/login";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {CreateUserPage} from "./pages/createUser/createUser";
import {PageNotFound} from "./pages/pageNotFound/pageNotFound";
import {InputScore} from "./pages/inputScore/inputScore";
import {TableGame} from "./pages/tableGame/tableGame";
import {Keys} from "./keys";


function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path={Keys.PAGE_INPUT_SCORE} component={InputScore}/>
                    <Route exact path={Keys.PAGE_LOGIN} component={LoginPage}/>
                    <Route exact path={Keys.PAGE_CREATE_USER} component={CreateUserPage}/>
                    <Route exact path={Keys.PAGE_TABLE_GAME} component={TableGame}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
