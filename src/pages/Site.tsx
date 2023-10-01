import React, { useEffect, useState, } from 'react';
import Banner from "../components/Banner";
import Link from "../components/Link";
import Button from "../components/Button";
import News from "../components/News";
import Logo from "../components/Logo";

import DetailsBanner from "../components/DetailsBanner";
import Bot from "../components/Bot";
import { setEmail as setEmailAction, setBots as setBotsAction, } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Banner as BannerInterface, Bot as BotInterface, Button as ButtonInterface, Link as LinkInterface, Logo as LogoInterface,  News as NewsInterface, } from '../scripts/types';

let id = 0;

function Site() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const bots = user.bots;
    const banners = user.banners;
    const setBots = (payload: Array<BotInterface>) => dispatch(setBotsAction(payload));
    const [detailsVisibleIndex, setDetailsVisibleIndex] = useState<number | null>(null);
    const [editBannerIndex, setEditBannerIndex] = useState<number | null>(null);

    const deepCopy = (obj:any) =>  JSON.parse(JSON.stringify(obj)) as typeof obj;

    const showDetails = (index: number) => {
        if (editBannerIndex !== null) {
            return;
        }
        setDetailsVisibleIndex(index);
    };

    const hideDetails = () => {
        setDetailsVisibleIndex(null);
        setEditBannerIndex(null);
    };

    const editBanner = (index: number | null) => {
        setEditBannerIndex(index);
    };

    const moveBots = () => {
        const newBots = deepCopy(bots);
        for (let bot of newBots) {
            const changeVector = () => {
                bot.vectorY = Math.random() * 2 - 1;
                bot.vectorX = Math.random() * 2 - 1;
                if (bot.x < 0) {
                    bot.vectorX = Math.abs(bot.vectorX);
                }
                if (bot.y < 200) {
                    bot.vectorY = Math.abs(bot.vectorX);
                }
                if (bot.x > 1800) {
                    bot.vectorX = -Math.abs(bot.vectorX);
                }
                if (bot.y > 1000) {
                    bot.vectorY = -Math.abs(bot.vectorX);
                }
            }

            bot.x += bot.vectorX * 30;
            bot.y += bot.vectorY * 30;

            if (Math.random() < 0.02) {
                bot.isClick = !bot.isClick;
            }
            
            if (Math.random() < 0.1 || bot.x < 0 || bot.y < 200  || bot.x > 1800 || bot.y > 1000) {
                changeVector();
            }
            
        }
        if (Math.random() < 0.01) {
            newBots.push(
                {
                    x: 200,
                    y: 200,
                    xVector: 1,
                    yVector: 1,
                    isClick: false,
                    id: id++,
                },
            );
        }
        setBots(newBots);
    };

    useEffect(() => {
        const moveInterval = setInterval(() => {
            moveBots();
        }, 100);

        return () => {
            clearInterval(moveInterval);
        };
    }, [bots, setBots]);

    return (
        <div className="tab relative">
            {
                bots.map((bot) => (
                    <Bot
                        key={bot.id}
                        {...bot}
                    />
                ))
            }

            {
                banners.filter((ban): ban is BannerInterface => "isBanner" in ban).map((banner, index) => (
                    <Banner
                        key={banner.bannerId}
                        {...banner}
                        onClick={showDetails}
                        isEdit={editBannerIndex === banner.bannerId}
                        index={banner.bannerId}
                    />
                ))
            }

            {
                banners.filter((link): link is LinkInterface => "isLink" in link).map((link, index) => (
                    <Link
                        key={link.bannerId}
                        {...link}
                        onClick={showDetails}
                        isEdit={editBannerIndex === link.bannerId}
                        index={link.bannerId}
                    />
                ))
            }

            {
                banners.filter((button): button is ButtonInterface => "isButton" in button).map((button, index) => (
                    <Button
                        key={button.bannerId}
                        {...button}
                        onClick={showDetails}
                        isEdit={editBannerIndex === button.bannerId}
                        index={button.bannerId}
                    />
                ))
            }


            {
                banners.filter((news): news is NewsInterface => "isNews" in news).map((news, index) => (
                    <News
                        key={news.bannerId}
                        {...news}
                        onClick={showDetails}
                        isEdit={editBannerIndex === news.bannerId}
                        index={news.bannerId}
                    />
                ))
            }


            {
                banners.filter((logo): logo is LogoInterface => "isLogo" in logo).map((logo, index) => (
                    <Logo
                        key={logo.bannerId}
                        {...logo}
                        onClick={showDetails}
                        isEdit={editBannerIndex === logo.bannerId}
                        index={logo.bannerId}
                    />
                ))
            }


            {
                detailsVisibleIndex !== null ?
                <DetailsBanner
                    onHide={hideDetails}
                    onEdit={editBanner}
                    {...banners[detailsVisibleIndex]}
                    index={detailsVisibleIndex}
                    isEdit={editBannerIndex !== null}
                />
                :
                null
            }
        </div>
    );
}

export default Site;
