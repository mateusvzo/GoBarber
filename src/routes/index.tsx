import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Route from './Route';

import Dashboard from '../pages/dashboard';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
);

export default Routes;