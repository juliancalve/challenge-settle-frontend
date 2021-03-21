import React, { useEffect, useState } from 'react'
import { saveRate } from '../../services/ratesService';

const initialFormValues = {
    pairFrom: '',
    pairTo: '',
    originalRate: 0,
    feeAmount: 0,
    feePercent: 0,
    rateFeeApplied: 0
};

const RateForm = ( { rates, onGetSavedRates }: any ): JSX.Element => {

    const [ form, setForm ] = useState( initialFormValues ) as any;

    useEffect( () => {
        setForm({
            ...initialFormValues,
            pairFrom: Object.keys( rates )[0],
            pairTo: Object.keys( rates )[0]
        });
    }, [rates]);

    const handleChange = ( event: any ): void => {

        calculateRate( { [ event?.target?.name ] : event?.target?.value } );
    }

    const calculateRate = ( { pairFrom = form.pairFrom, pairTo = form.pairTo, originalRate = form.originalRate, feePercent = form.feePercent }: any ) => {
        const equivalence =  rates[ pairTo ] / rates[ pairFrom ];
        const feeAmount = originalRate * equivalence;
        const rateFeeApplied = feePercent !== 0 ? feeAmount + feeAmount * feePercent / 100 : feeAmount;
        setForm({
            ...form,
            pairFrom,
            feePercent,
            pairTo,
            feeAmount: feeAmount.toFixed( 2 ),
            originalRate,
            rateFeeApplied: rateFeeApplied.toFixed( 2 )
        });
    }
    
    const onSubmit = (): void => {
        saveRate( { ...form, pair: `${form.pairFrom} ${form.pairTo}`} ).then(
            response => {
                onGetSavedRates();
                setForm({
                    ...initialFormValues,
                    pairFrom: Object.keys( rates )[0],
                    pairTo: Object.keys( rates )[0]
                });
            }
        ).catch(
            error => {
                alert( error );
            }
        )
    };
    
    const validateForm = (): boolean => {

        if ( form.feeAmount !== 0 && form.originalRate !== 0 && form.rateFeeApplied !== 0 ) {
            return false;
        }
        return true;
    };

    return (
        <form className='mb-2'>
            <div className='mb-3 d-flex justify-content-center'>
                <div className='mr-2 col-sm-5 col-md-3'>
                    <label className='form-label'>From</label>
                    <select onChange={ handleChange } className='form-select w-100' name='pairFrom' value={ form.pairFrom }>
                        { Object.keys( rates ).map( ( key: string ) => {
                            return <option key={ key + 'from' } value={ key }>{ key }</option>
                        })}
                    </select>
                </div>
                <div className='col-2 p-0 m-0 d-flex align-items-center justify-content-center'>
                    <svg onClick={ () => { calculateRate( { pairFrom: form.pairTo, pairTo: form.pairFrom } ) } } xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="bi bi-arrow-left-right rates__exchange" viewBox="0 0 16 16">
                        <path fillRule="evenodd" className='rates__exchange'
                        d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </div>
                <div className='mr-2 col-sm-5 col-md-3'>
                    <label className='form-label'>To</label>
                    <select onChange={ handleChange } className='form-select w-100' name='pairTo' value={ form.pairTo }>
                        { Object.keys( rates ).map( ( key: string ) => {
                            return <option key={ key + 'to' } value={ key }>{ key }</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='row d-flex justify-content-between'>

                <div className='mb-3 col-sm-12 col-md-5'>
                    <label className='form-label'>Original Rate</label>
                    <input onChange={ handleChange } type='number' className='form-control' name='originalRate' value={ form.originalRate }/>
                </div>
                <div className='mb-3 col-sm-12 col-md-5'>
                    <label className='form-label'>Fee amount</label>
                    <input onChange={ handleChange } type='number' className='form-control is-disabled' readOnly name='feeAmount' value={ form.feeAmount } disabled/>
                </div>
            </div>
            <div className='row d-flex justify-content-between'>

                <div className='mb-3 col-sm-12 col-md-5'>
                    <label className='form-label'>Fee %</label>
                    <input onChange={ handleChange } type='number' className='form-control' name='feePercent' value={ form.feePercent }/>
                </div>
                
                <div className='mb-3 col-sm-12 col-md-5'>
                    <label className='form-label'>Rate fee applied</label>
                    <input type='number' className='form-control is-disabled' readOnly name='rateFeeApplied' value={ form.rateFeeApplied } disabled/>
                </div>
            </div>
            
            <button type='button' className='btn btn-primary' disabled={ validateForm() } onClick={ onSubmit }>
                Save
            </button>
        </form>
    );
};

export default RateForm;
