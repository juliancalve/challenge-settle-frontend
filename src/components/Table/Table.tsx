import React from 'react'
import './Table.scss';

declare interface TableProps {

    dataHeaders: string[];
    dataRows: Object[];
}
const Table = ( { dataHeaders, dataRows }: TableProps ) => {


    return (
        <div className='table__container'>

            <table className="table table-dark table-hover">
    
                <thead>
                    <tr className='table__tr'>
                        { dataHeaders.map( header => {
                                return <th key={ header }>{ header }</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody className='table__body'>
                    { dataRows.map( ( data, index ) => {
                            return <tr key={ index } className='table__row'>
                                { Object.keys( data ).map( key => { return <td className='table__td' key={ key }>{ ( data as any )[key] }</td>} ) }
                            </tr>
                    })}
                </tbody>

            </table>
        </div>

    )
};

export default Table;
