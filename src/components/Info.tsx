import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab as setActiveTabAction, removeBanner as removeBannerAction, } from '../redux/user';
import { RootState } from '../redux/store';

interface InfoProps {
    reputation: number,
    income: number,
    id: number,
};

const Info: React.FC<InfoProps> = ({
    reputation,
    income,
    id,
}) => {
    const dispatch = useDispatch();
    const removeBanner = (payload: number) => dispatch(removeBannerAction(payload));

    const handleRemoveBanner = () => {
        removeBanner(id);
    };

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
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1" onClick={handleRemoveBanner}>
                <path d="M7.13227 0.0836764C6.62645 0.248364 6.13238 0.777718 6.05004 1.24826C5.94417 1.9423 5.76772 2.28344 5.46187 2.4246C5.27365 2.50694 4.34434 2.55399 2.93273 2.55399H0.685919L0.344779 2.89513C-0.03165 3.27156 -0.10223 3.82444 0.144801 4.37732C0.45065 5.04784 0.156565 5.02431 9.99078 5.02431C16.7665 5.02431 19.131 4.98902 19.3545 4.88315C20.0603 4.56554 20.225 3.47154 19.6603 2.89513L19.3192 2.55399H17.0724C15.6843 2.55399 14.7314 2.50694 14.555 2.4246C14.2374 2.28344 14.0021 1.87172 14.0021 1.46C14.0021 1.10709 13.6139 0.495396 13.214 0.236601C12.9316 0.0483862 12.5787 0.0248593 10.179 0.00133251C8.69681 -0.0104309 7.32049 0.0248593 7.13227 0.0836764Z" fill="#6B7280"/>
                <path d="M1.92097 7.68274C1.13282 8.07094 1.13282 7.92977 1.70922 14.7878C2.00331 18.1875 2.29739 21.1754 2.36798 21.4342C2.88557 23.2693 4.42657 24.6574 6.34401 25.022C7.16745 25.1749 12.8374 25.1749 13.6609 25.022C15.5783 24.6574 17.1193 23.2693 17.6369 21.4342C17.7075 21.1754 18.0016 18.1875 18.2956 14.7878C18.7662 9.12964 18.8015 8.58853 18.6368 8.24739C18.2721 7.471 18.4956 7.49453 9.97891 7.49453C3.25023 7.49453 2.25034 7.51806 1.92097 7.68274Z" fill="#6B7280"/>
            </svg>
        </div>
    </div>
    );
};

export default Info;