import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import { deleteRate, getRates, getSavedRates } from '../../services/ratesService';
import ShrCenteredLayout from '../../shared/ShrCenteredLayout/ShrCenteredLayout';
import RateForm from './RateForm';
import './Rates.scss';

const headers = [
    'pair',
    'originalRate',
    'feeAmount',
    'fee %',
    'rateFeeApplied'
];

const Rates = (): JSX.Element => {

    const [ rates, setRates ] = useState( [] ) as any;
    const [ savedRates, setSavedRates ] = useState( [] ) as any;
    const [ base, setBase ] = useState( '' )as any;

    const onGetSavedRates = () => {

        getSavedRates().then(
            response => {
                setSavedRates( response.data );
            }
        ).catch(
            error => {
                alert( error );
            }
        )
    };

    const onGetRates = () => {
        getRates().then(
            response => {
                setRates( response.data.rates );
                setBase( response.data.base );
            }
        ).catch( error => {
            alert( error );
        })
    };

    const onDeleteRate = ( id: string ) => {
        deleteRate( id ).then(
            response => {
                onGetSavedRates();
            }
        ).catch( error => {
            alert( error );
        })
    }


    useEffect( () => {
        onGetSavedRates();
        onGetRates();
    }, []);

    const content = (): JSX.Element => {

        return (
            <div>
                <RateForm rates={ rates } onGetSavedRates={ onGetSavedRates } />
                <Table dataRows={ savedRates.map( ( savedRate: any ) => {
                    return {
                        pair: savedRate.pair,
                        originalRate: savedRate.originalRate,
                        feeAmount: savedRate.feeAmount,
                        feePercent: savedRate.feePercent,
                        rateFeeApplied: savedRate.rateFeeApplied,
                        option: <button className='btn btn-primary' onClick={ () => onDeleteRate( savedRate._id ) }><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg></button>
                        }
                    })}
                    dataHeaders={ headers } />
            </div>
        )
    }

    return (
        <ShrCenteredLayout>
            <Card 
                content={ content() }
                subtitle={`Save and see the rates in ${ base } base`}
                title='Rates'
            />
            
        </ShrCenteredLayout>
    );
};

export default Rates;