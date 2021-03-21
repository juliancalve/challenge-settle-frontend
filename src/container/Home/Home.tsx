import React from 'react'
import ShrCenteredLayout from '../../shared/ShrCenteredLayout/ShrCenteredLayout';
import { useHistory } from 'react-router-dom';
import Paths from '../../router/Paths';

const Home = (): JSX.Element => {

    const history = useHistory();

    return (
        <ShrCenteredLayout>
            <h1>soy home</h1>
            <button onClick={ () => history.push( Paths.rates ) }>ir rates</button>
        </ShrCenteredLayout>
    );
};

export default Home;
