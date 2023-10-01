import React from 'react';
import RialtoItem from "../components/RialtoItem";
import { setRialto as setRialtoAction } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Rialto as RialtoInterface } from '../scripts/types';

function Rialto() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const rialtos = user.rialtos;
    const setRialtos = (payload: Array<RialtoInterface>) => dispatch(setRialtoAction(payload));

    return (
        <div className="tab">
            <div>
                {
                    rialtos.map((rialto, index) => (
                        <RialtoItem key={index} {...rialto} />
                    ))
                }
            </div>
        </div>
    );
}

export default Rialto;
