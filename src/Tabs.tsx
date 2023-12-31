import React, { useState } from 'react';
import Anal from './pages/Anal';
import Site from './pages/Site';
import Email from "./pages/Email";
import Rialto from './pages/Rialto';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab as setActiveTabAction, } from './redux/user';
import { RootState } from './redux/store';
import Joyride, { Step, Styles,  } from 'react-joyride';

const styles: Styles = {
    options: {
        primaryColor: 'rgb(54, 124, 213)',
    },
    tooltipContent: {
        textAlign: 'left',
    },
};

const steps: Array<Step> = [
    {
        target: '#center',
        content: 'О! Здарова! Так это ты тот деб... эээ... новый владелец этого потрясающего веб-проекта!',
        disableBeacon: true,
        placement: 'center',
    },
    {
        target: '#center',
        content: 'Я так рад, что наконец-то продал этот сайт! Я имею в виду, конечно, рад за твои будущие успехи! Этот сайт - настоящий бриллиант, который просто ждал своего настоящего хозяина!',
        disableBeacon: true,
        placement: 'center',
    },
    {
        target: '#center',
        content: 'Давая я кратко покажу, что тут к чему!',
        disableBeacon: true,
        placement: 'center',
    },
    {
        target: '#balance',
        content: 'Здесь отображается твой баланс, старайся чтобы он не упал до нуля, иначе тебе кабздец! На эти деньги можно заказывать тексты у копирайтеров, создовать логотипы и многое другое!',
        disableBeacon: true,
    },
    {
        target: '#reputation',
        content: 'А это рейтинг твоего сайта. Чем он больше, тем больше посетиелей у тебя на сайте. Идеальный сайт - это диганский рейтинг!',
        disableBeacon: true,
    },
    {
        target: '.tabName',
        content: 'Ну, а здесь у нас админ панель! На ней ты можешь перемещать содержимое сайта и следить за глупыми юзерами и за тем, что они делают!',
        disableBeacon: true,
    },
    {
        target: '.banner',
        content: 'Это один из блоков твоего сайта! Каждый из них, когда пользователь кликает влияет на твой рейтинг и деньги! Ты можешь его переместить в более подходящее место! Или двойным кликом его отредактировать! Распологай их так, чтобы на них чаще кликали посетители!',
        disableBeacon: true,
    },
    {
        target: '#center',
        content: 'Короче, на этом всё! В остальном сам разберёшься! Мне пора! Карибы ждут меня, дружище! А-ХА-ХА-ХА!!!',
        disableBeacon: true,
        placement: 'center',
    },
];

const Tabs: React.FC = () => {
    const dispatch = useDispatch();
    const emails = useSelector((state: RootState) => state.user.emails);
    const domen = useSelector((state: RootState) => state.user.anal.domain);
    const balance = useSelector((state: RootState) => state.user.anal.balance);
    const reputation = useSelector((state: RootState) => state.user.anal.reputation);
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

    const [run, setRun] = useState(!Boolean(localStorage.getItem('isShowBegin'))); // Установите состояние run в true, чтобы автозапустить тур
    const handleTourCallback = (data: { status: string }) => {
        const { status } = data;
    
        if (status === 'finished') {
            localStorage.setItem('isShowBegin', '1');
            setRun(false); // Остановить тур после завершения
        }
    };

    return (
        <div>
            {/* Пустой элемент для отображения сообщения в центре экрана */}
            <div id="center" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

            <Joyride
                steps={steps}
                run={run}
                continuous
                showSkipButton
                disableOverlayClose
                disableScrolling
                callback={handleTourCallback}
                hideBackButton 
                locale={{ back: 'Назад', close: 'Закрыть', last: 'Закрыть', next: 'Дальше', open: 'Открыть диалог', skip: 'пропустить обучение' }}
                styles={styles}
            />

            <div className="bg-gray-300 flex space-x-2 px-14 pt-8">
                { tabs.map((tab, index) => (
                    index === 2 &&  activeTab !== index && emails.filter(m => m.isNew).length ?
                    <button
                        key={index}
                        className={`tabName py-2 px-4 text-gray-600 rounded-t-xl bg-gray-200 w-60`}
                        onClick={() => changeTab(index)}
                    >
                        <div className="new-message">
                            У вас новое сообщение!
                        </div>
                    </button>
                    :
                    <button
                        key={index}
                        className={`tabName py-2 px-4 text-gray-600 rounded-t-xl w-60 ${
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
                        <path d="M11.2378 1.15881L12.9809 6.52356C13.2152 7.2446 13.8871 7.73278 14.6452 7.73278H20.2861C20.5282 7.73278 20.6289 8.04268 20.433 8.18503L15.8695 11.5006C15.2561 11.9463 14.9995 12.7361 15.2337 13.4572L16.9769 18.8219C17.0517 19.0523 16.7881 19.2438 16.5921 19.1014L12.0286 15.7858C11.4153 15.3402 10.5847 15.3402 9.97138 15.7858L5.40785 19.1014C5.21192 19.2438 4.9483 19.0523 5.02314 18.8219L6.76625 13.4572C7.00053 12.7361 6.74388 11.9463 6.13053 11.5006L1.567 8.18503C1.37107 8.04268 1.47177 7.73278 1.71395 7.73278H7.35477C8.11292 7.73278 8.78484 7.2446 9.01912 6.52356L10.7622 1.15882C10.8371 0.928483 11.1629 0.92849 11.2378 1.15881Z" stroke="#AFAFAF" strokeWidth="1.5"/>
                    </svg>
                </div>
                <div className="flex">
                    <div id="reputation" className="text-yellow-500 font-bold text-xl flex items-center">
                        { reputation }
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                            <path d="M11.2378 1.15881L12.9809 6.52356C13.2152 7.2446 13.8871 7.73278 14.6452 7.73278H20.2861C20.5282 7.73278 20.6289 8.04268 20.433 8.18503L15.8695 11.5006C15.2561 11.9463 14.9995 12.7361 15.2337 13.4572L16.9769 18.8219C17.0517 19.0523 16.7881 19.2438 16.5921 19.1014L12.0286 15.7858C11.4153 15.3402 10.5847 15.3402 9.97138 15.7858L5.40785 19.1014C5.21192 19.2438 4.9483 19.0523 5.02314 18.8219L6.76625 13.4572C7.00053 12.7361 6.74388 11.9463 6.13053 11.5006L1.567 8.18503C1.37107 8.04268 1.47177 7.73278 1.71395 7.73278H7.35477C8.11292 7.73278 8.78484 7.2446 9.01912 6.52356L10.7622 1.15882C10.8371 0.928483 11.1629 0.92849 11.2378 1.15881Z" fill="#EAB308" stroke="#EAB308" strokeWidth="1.5"/>
                        </svg>
                    </div>
                    <div id="balance" className="text-green-500 font-bold text-xl ml-5">
                        { balance } $
                    </div>
                </div>
            </div>

            <div className="">
                { tabs.map((tab, index) => (
                    <div
                        key={tab}
                        className={`${activeTab === index ? 'block' : 'hidden'}`}
                    >
                        { getTabContent(index) }
                    </div>
                )) }
            </div>
        </div>
    );
};

export default Tabs;