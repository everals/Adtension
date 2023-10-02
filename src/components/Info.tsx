import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab as setActiveTabAction, } from '../redux/user';
import { RootState } from '../redux/store';

interface InfoProps {
    reputation: number,
    income: number,
};

const Info: React.FC<InfoProps> = ({
    reputation,
    income,
}) => {
    const dispatch = useDispatch();

    return (
    <div className="ad__info absolute -right-3 top-0 translate-x-full">
        <div className="flex flex-col items-center justify-center">
            <div className="text-yellow-500 font-bold text-xl flex items-center">
                { reputation }
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M11.2378 1.15881L12.9809 6.52356C13.2152 7.2446 13.8871 7.73278 14.6452 7.73278H20.2861C20.5282 7.73278 20.6289 8.04268 20.433 8.18503L15.8695 11.5006C15.2561 11.9463 14.9995 12.7361 15.2337 13.4572L16.9769 18.8219C17.0517 19.0523 16.7881 19.2438 16.5921 19.1014L12.0286 15.7858C11.4153 15.3402 10.5847 15.3402 9.97138 15.7858L5.40785 19.1014C5.21192 19.2438 4.9483 19.0523 5.02314 18.8219L6.76625 13.4572C7.00053 12.7361 6.74388 11.9463 6.13053 11.5006L1.567 8.18503C1.37107 8.04268 1.47177 7.73278 1.71395 7.73278H7.35477C8.11292 7.73278 8.78484 7.2446 9.01912 6.52356L10.7622 1.15882C10.8371 0.928483 11.1629 0.92849 11.2378 1.15881Z" fill="#EAB308" stroke="#EAB308" strokeWidth="1.5"/>
                </svg>
            </div>
            {
                income < 0 ?
                <div className="text-red-500 font-bold text-xl">
                    { income } $
                </div>
                :
                <div className="text-green-500 font-bold text-xl">
                    { income } $
                </div>
            }
        </div>
    </div>
    );
};

export default Info;