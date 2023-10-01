import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Banner as BannerInterface, Bot as BotInterface, Button as ButtonInterface, Link as LinkInterface, Logo as LogoInterface,  News as NewsInterface, } from '../scripts/types';

function Anal() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const bots = user.bots;
    const banners = user.banners;

    const getIncome = () => {
        let sum = 0;
        let count = 0;
        banners.forEach((ban) => {
            if ("price" in ban) {
                sum += ban.price;
                count++;
            }
        }, 0);

        return (sum / count).toFixed(2);
    };
    const income = getIncome();

    return (
        <div className="tab">
            <div className="p-4">
                <div className="text-xl font-semibold mb-6">
                    Аналитика сайта
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Баланс:
                    </span> { user.anal.balance }$
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Название домена:
                    </span> { user.anal.domain }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Количество пользователей:
                    </span> { bots.length }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Макс. количество пользователей на сервере:
                    </span>  { user.anal.hostCount }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Средний доход с рекламы:
                    </span> { income }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Количество баннеров:
                    </span> { banners.filter((banner): banner is BannerInterface => "isBanner" in banner).length }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Количество кнопок:
                    </span> { banners.filter((button): button is ButtonInterface => "isButton" in button).length }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Количество логотипов:
                    </span> { banners.filter((logo): logo is LogoInterface => "isLogo" in logo).length }
                </div>
                <div className="mb-4">
                    <span className="font-semibold">
                        Количество ссылок:
                    </span> { banners.filter((link): link is LinkInterface => "isLink" in link).length }
                </div>
            </div>
        </div>
    );
}

export default Anal;
