import React, { useEffect, useState, } from 'react';
import Banner from "../components/Banner";
import Link from "../components/Link";
import Button from "../components/Button";
import News from "../components/News";
import Logo from "../components/Logo";

import DetailsBanner from "../components/DetailsBanner";
import Bot from "../components/Bot";
import { setEmail as setEmailAction, setBots as setBotsAction, setBalance as setBalanceAction, updateBannerX as updateBannerXAction, updateBannerY as updateBannerYAction, updateBannerWidth as updateBannerWidthAction, updateBannerHeight as updateBannerHeightAction, setReputation as setReputationAction } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Banner as BannerInterface, Bot as BotInterface, Button as ButtonInterface, Link as LinkInterface, Logo as LogoInterface,  News as NewsInterface, } from '../scripts/types';

let id = 0;

function isCoordinateInsideAdBlock(x: number, y: number, className: string): false | number {
    const adBlocks = document.querySelectorAll(className);
    if (!adBlocks) {
        return false;
    }
    for (const adBlock of adBlocks) {
        const rect = adBlock.getBoundingClientRect();
        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            if (adBlock instanceof HTMLElement) {
                return parseInt(adBlock.dataset.price || '0') || 0;
            } else {
                return 0;
            }
        }
    }
    return false;
}

function Site() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const bots = user.bots;
    const banners = user.banners;
    const setBots = (payload: Array<BotInterface>) => dispatch(setBotsAction(payload));
    const setBalance = (payload: number) => dispatch(setBalanceAction(payload));
    const setReputation = (payload: number) => dispatch(setReputationAction(payload));
    const [detailsVisibleIndex, setDetailsVisibleIndex] = useState<number | null>(null);
    const [editBannerIndex, setEditBannerIndex] = useState<number | null>(null);
    const updateBannerX = (payload: { index: number, value: number }) => dispatch(updateBannerXAction(payload));
    const updateBannerY = (payload: { index: number, value: number }) => dispatch(updateBannerYAction(payload));
    const updateBannerWidth = (payload: { index: number, value: number }) => dispatch(updateBannerWidthAction(payload));
    const updateBannerHeight = (payload: { index: number, value: number }) => dispatch(updateBannerHeightAction(payload));

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
                if (bot.isClick) {
                    const sum = isCoordinateInsideAdBlock(bot.x, bot.y, '.ad');
                    if (sum) {
                        setReputation(user.anal.reputation - 1);
                        setBalance(user.anal.balance + sum);
                    }

                    const crossNews = isCoordinateInsideAdBlock(bot.x, bot.y, '.news');
                    if (crossNews !== false) {
                        setReputation(user.anal.reputation + 0.5);
                    }
                }
            }
            
            if (Math.random() * 100 < user.anal.reputation || bot.x < 0 || bot.y < 200  || bot.x > 1650 || bot.y > 950) {
                changeVector();
            }
            
        }
        if (Math.random() < 0.01 && bots.length < user.anal.hostCount) {
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
                        index={banner.bannerId}
                        onUpdateBannerX={value => updateBannerX({index: banner.bannerId, value})}
                        onUpdateBannerY={value => updateBannerY({index: banner.bannerId, value})}
                        onUpdateBannerWidth={value => updateBannerWidth({index: banner.bannerId, value})}
                        onUpdateBannerHeight={value => updateBannerHeight({index: banner.bannerId, value})}
                    />
                ))
            }

            {
                banners.filter((link): link is LinkInterface => "isLink" in link).map((link, index) => (
                    <Link
                        key={link.bannerId}
                        {...link}
                        index={link.bannerId}
                        onUpdateBannerX={value => updateBannerX({index: link.bannerId, value})}
                        onUpdateBannerY={value => updateBannerY({index: link.bannerId, value})}
                        onUpdateBannerWidth={value => updateBannerWidth({index: link.bannerId, value})}
                        onUpdateBannerHeight={value => updateBannerHeight({index: link.bannerId, value})}
                    />
                ))
            }

            {
                banners.filter((button): button is ButtonInterface => "isButton" in button).map((button, index) => (
                    <Button
                        key={button.bannerId}
                        {...button}
                        index={button.bannerId}
                        onUpdateBannerX={value => updateBannerX({index: button.bannerId, value})}
                        onUpdateBannerY={value => updateBannerY({index: button.bannerId, value})}
                        onUpdateBannerWidth={value => updateBannerWidth({index: button.bannerId, value})}
                        onUpdateBannerHeight={value => updateBannerHeight({index: button.bannerId, value})}
                    />
                ))
            }


            {
                banners.filter((news): news is NewsInterface => "isNews" in news).map((news, index) => (
                    <News
                        key={news.bannerId}
                        {...news}
                        index={news.bannerId}
                        onUpdateBannerX={value => updateBannerX({index: news.bannerId, value})}
                        onUpdateBannerY={value => updateBannerY({index: news.bannerId, value})}
                        onUpdateBannerWidth={value => updateBannerWidth({index: news.bannerId, value})}
                        onUpdateBannerHeight={value => updateBannerHeight({index: news.bannerId, value})}
                    />
                ))
            }


            {
                banners.filter((logo): logo is LogoInterface => "isLogo" in logo).map((logo, index) => (
                    <Logo
                        key={logo.bannerId}
                        {...logo}
                        index={logo.bannerId}
                        onUpdateBannerX={value => updateBannerX({index: logo.bannerId, value})}
                        onUpdateBannerY={value => updateBannerY({index: logo.bannerId, value})}
                        onUpdateBannerWidth={value => updateBannerWidth({index: logo.bannerId, value})}
                        onUpdateBannerHeight={value => updateBannerHeight({index: logo.bannerId, value})}
                    />
                ))
            }


            {
                // detailsVisibleIndex !== null ?
                // <DetailsBanner
                //     onHide={hideDetails}
                //     onEdit={editBanner}
                //     {...banners[detailsVisibleIndex]}
                //     index={detailsVisibleIndex}
                //     isEdit={editBannerIndex !== null}
                // />
                // :
                // null
            }
        </div>
    );
}

export default Site;
