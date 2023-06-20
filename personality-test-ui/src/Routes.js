import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import { QuestionProvider } from './context/QuestionContext';
import Results from './pages/results/results';

function Routes() {
    return (
        <Switch>
            <QuestionProvider>
                <Route exact path="/" component={Home} />
                <Route path="/results" component={Results} />
            </QuestionProvider>
        </Switch>
    );
}

export default Routes;