import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Routes from './Routes';

const Router = () => {

    const generateRoutes = (): JSX.Element[] => {

        let allRoutes: JSX.Element[] = [];

        Routes.public.forEach( route => {
            allRoutes.push( <Route key={ route.path } { ...route } />)
        })
        allRoutes.push( <Redirect key={ 'default' } to={ Routes.public[0].path } />)
        return allRoutes;
    };

    return (
        <Switch>
            { generateRoutes() }
        </Switch>
    );

};

export default Router;
