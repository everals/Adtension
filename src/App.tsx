import React, { useEffect, useState, } from 'react';
import Tabs from './Tabs';
import { generateEmail } from './scripts/emailGenerate';
import { Email } from './scripts/types';
import { useSelector, useDispatch } from 'react-redux';
import { addEmail as addEmailAction, chagneBalance as chagneBalanceAction, addIncomeHistory as addIncomeHistoryAction, } from './redux/user';
import { RootState, getIncome, } from './redux/store';

function App() {
    const dispatch = useDispatch();
    const addEmail = (payload: Email) => dispatch(addEmailAction(payload));
    const chagneBalance = (payload: number) => dispatch(chagneBalanceAction(payload));
    const income = useSelector(getIncome);
    
    useEffect(() => {
        const emailInterval = setInterval(() => {
            const newEmail = generateEmail();
            addEmail(newEmail);
            if (newEmail.price < 0) {
                chagneBalance(newEmail.price);
            }
        }, 60000);

        const incomeInterval = setInterval(() => {
            dispatch(addIncomeHistoryAction(income));
        }, 60000);

        return () => {
            clearInterval(emailInterval);
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
