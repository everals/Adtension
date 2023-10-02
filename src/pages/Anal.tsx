import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, getIncome } from '../redux/store';
import ReactApexChart from 'react-apexcharts';
import { Banner as BannerInterface, Bot as BotInterface, Button as ButtonInterface, Link as LinkInterface, Logo as LogoInterface,  News as NewsInterface, } from '../scripts/types';


const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        }
    },
    colors: ['rgb(54, 124, 213)'],
    yaxis: {
        labels: {
            formatter: (val: number) => val === 0 ? '' : `${ val } $`,
        },
    },
    xaxis: {
        labels: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
};


function Anal() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const bots = user.bots;
    const banners = user.banners;
    const income = useSelector(getIncome);

    const series = [{
        name: 'Средний доход с рекламы',
        data: user.anal.incomeHistory,
    }];

    return (
        <div className="tab px-12 mt-8 flex flex-wrap">
            <div className="w-4/12 p-4">
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
                        Репутация:
                    </span> { user.anal.reputation } ед.
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
            <div className="w-6/12 p-4">
                <div className="text-xl font-semibold mb-6">
                    Средний доход с рекламы
                </div>
                <ReactApexChart
                    options={options}
                    series={series}
                    type='bar'
                />
            </div>
        </div>
    );
}

export default Anal;
