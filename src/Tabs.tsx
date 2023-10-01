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
    const domen = useSelector((state: RootState) => state.user.anal.domain);
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
                <button
                    key={index}
                    className={`py-2 px-4 text-gray-600 rounded-t-xl ${
                        activeTab === index ? 'bg-white' : 'bg-gray-200'
                    }`}
                    onClick={() => changeTab(index)}
                >
                { tab }
                </button>
            )) }
        </div>

        <div className="bg-gray-200 flex space-x-2 px-14 py-4">
            <div className="bg-white rounded w-1/2 px-4 py-2">
                { getTabUrl(activeTab) }
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