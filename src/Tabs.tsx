import React, { useState } from 'react';
import Anal from './pages/Anal';
import Site from './pages/Site';
import Email from "./pages/Email";
import Rialto from './pages/Rialto';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab as setActiveTabAction, } from './redux/user';
import { RootState } from './redux/store';

const Tabs: React.FC = () => {
    const dispatch = useDispatch();
    const emails = useSelector((state: RootState) => state.user.emails);
    const domen = useSelector((state: RootState) => state.user.anal.domain);
    const balance = useSelector((state: RootState) => state.user.anal.balance);
    const activeTab = useSelector((state: RootState) => state.user.activeTab);
    const setActiveTab = (payload: number) => dispatch(setActiveTabAction(payload));

    const tabs = [
        'Панель администратора',
        'Моя аналитика',
        'Моя почта',
        'Фриланс биржа',
    ];
    const urls = [
        domen,
        'https://www.anal.com/',
        'https://www.mail.com/',
        'https://www.easy-money.com/',
    ];

    const getTabUrl = (index: number) => {
        return urls[index];
    };

    const changeTab = (index: number) => {
        setActiveTab(index);
    };

    const getTabContent = (index: number) => {
        switch(index) {
            case 0:
                return <Site/>
            case 1:
                return <Anal/>
            case 2:
                return <Email />;
            case 3:
                return <Rialto/>
        };
    };

    return (
    <div>
        <div className="bg-gray-300 flex space-x-2 px-14 pt-8">
            { tabs.map((tab, index) => (
                index === 2 &&  activeTab !== index && emails.filter(m => m.isNew).length ?
                <button
                    key={index}
                    className={`py-2 px-4 text-gray-600 rounded-t-xl bg-gray-200 w-60`}
                    onClick={() => changeTab(index)}
                >
                    <div className="new-message">
                        У вас новое сообщение!
                    </div>
                </button>
                :
                <button
                    key={index}
                    className={`py-2 px-4 text-gray-600 rounded-t-xl w-60 ${
                        activeTab === index ? 'bg-white' : 'bg-gray-200'
                    }`}
                    onClick={() => changeTab(index)}
                >
                    { tab }
                </button>
            )) }
        </div>

        <div className="flex justify-between items-center bg-gray-200 space-x-2 px-14 py-4">
            <div className="flex justify-between  items-start bg-white rounded w-1/2 px-4 py-2">
                { getTabUrl(activeTab) }
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2378 1.15881L12.9809 6.52356C13.2152 7.2446 13.8871 7.73278 14.6452 7.73278H20.2861C20.5282 7.73278 20.6289 8.04268 20.433 8.18503L15.8695 11.5006C15.2561 11.9463 14.9995 12.7361 15.2337 13.4572L16.9769 18.8219C17.0517 19.0523 16.7881 19.2438 16.5921 19.1014L12.0286 15.7858C11.4153 15.3402 10.5847 15.3402 9.97138 15.7858L5.40785 19.1014C5.21192 19.2438 4.9483 19.0523 5.02314 18.8219L6.76625 13.4572C7.00053 12.7361 6.74388 11.9463 6.13053 11.5006L1.567 8.18503C1.37107 8.04268 1.47177 7.73278 1.71395 7.73278H7.35477C8.11292 7.73278 8.78484 7.2446 9.01912 6.52356L10.7622 1.15882C10.8371 0.928483 11.1629 0.92849 11.2378 1.15881Z" stroke="#AFAFAF" stroke-width="1.5"/>
                </svg>
            </div>
            <div className="text-green-500 font-bold text-xl">
                { balance } $
            </div>
        </div>

        <div className="mt-8 px-14">
            { tabs.map((tab, index) => (
                <div
                key={index}
                className={`${activeTab === index ? 'block' : 'hidden'}`}
                >
                    { getTabContent(activeTab) }
                </div>
            )) }
        </div>
    </div>
    );
};

export default Tabs;