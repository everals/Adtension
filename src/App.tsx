import React, { useEffect, useState, } from 'react';
import Tabs from './Tabs';
import { generateEmail } from './scripts/emailGenerate';
import { generateRialtos } from './scripts/rialtoGenerate';
import { Email, Rialto, } from './scripts/types';
import { useSelector, useDispatch } from 'react-redux';
import { addEmail as addEmailAction, chagneBalance as chagneBalanceAction, addIncomeHistory as addIncomeHistoryAction, setRialtos as setRialtosAction, } from './redux/user';
import { RootState, getIncome, } from './redux/store';

function App() {
    const dispatch = useDispatch();
    const addEmail = (payload: Email) => dispatch(addEmailAction(payload));
    const setRialtos = (payload: Array<Rialto>) => dispatch(setRialtosAction(payload));
    const chagneBalance = (payload: number) => dispatch(chagneBalanceAction(payload));
    const income = useSelector(getIncome);
    
    useEffect(() => {
        const newRialtos = generateRialtos();
        setRialtos(newRialtos);

        const emailInterval = setInterval(() => {
            const newEmail = generateEmail();
            addEmail(newEmail);
            if (newEmail.price < 0) {
                chagneBalance(newEmail.price);
            }
        }, 60_000);

        const rialtoInterval = setInterval(() => {
            const newRialtos = generateRialtos();
            setRialtos(newRialtos);
        }, 150_000);

        const incomeInterval = setInterval(() => {
            dispatch(addIncomeHistoryAction(income));
        }, 60_000);

        return () => {
            clearInterval(emailInterval);
            clearInterval(rialtoInterval);
            clearInterval(incomeInterval);
        }
    }, []);

    return (
        <div className="App">
            <Tabs />
        </div>
    );
}

export default App;
