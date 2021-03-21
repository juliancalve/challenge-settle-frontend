import React from 'react'
import './Card.scss';

declare interface CardProps {
    title: string;
    subtitle: string;
    content: JSX.Element;
};

const Card = ( { title, subtitle, content }: CardProps ) => {


    return (
        <div className="card card__container col-sm-12 col-md-8 p-0">
            <div className="card-body">
                <h5 className="card-title display-4">{ title }</h5>
                <p className="card-text display-6">{ subtitle }</p>
                <div className='col-12 p-0'>
                    { content }
                </div>
            </div>
        </div>
    );
};

export default Card;
