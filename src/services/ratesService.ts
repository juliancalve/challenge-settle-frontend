import axios from './axiosInstance';

declare interface RateModel {
    pair: string;
    originalRate: number;
    feePercent: number;
    feeAmount: number;
    rateFeeApplied: number;
};

const baseRatesURL = '/rate';

export const getSavedRates = () => {

    return axios.get( `${ baseRatesURL }/get-saved-rates`);
};

export const saveRate = ( { pair, originalRate, feePercent, feeAmount, rateFeeApplied }: RateModel ) => {

    const body = {
        pair,
        originalRate: Number( originalRate ),
        feePercent: Number( feePercent ),
        feeAmount: Number( feeAmount ),
        rateFeeApplied: Number( rateFeeApplied )
    }
    return axios.post( `${ baseRatesURL }/create-rate`, body );
};

export const getRates = () => {

    return axios.get( `${ baseRatesURL }/get-rates` );
};

export const deleteRate = ( id: string ) => {

    return axios.delete( `${ baseRatesURL }/delete-rate/${ id }` );
}