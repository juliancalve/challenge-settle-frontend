import React from 'react'

const ShrCenteredLayout: React.FunctionComponent = (  { children }  ) => {

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            { children }
        </div>
    );
};

export default ShrCenteredLayout;
