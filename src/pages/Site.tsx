import React, { useEffect, useState, } from 'react';
import Banner from "../components/Banner";
import DetailsBanner from "../components/DetailsBanner";
import Bot from "../components/Bot";

interface BotInterface {
    id: number;
    x: number;
    y: number;
    xVector: number;
    yVector: number;
};

let id = 0;

function Site() {
    const [detailsVisibleIndex, setDetailsVisibleIndex] = useState<number | null>(null);
    const [editBannerIndex, setEditBannerIndex] = useState<number | null>(null);

    const [bots, setBots] = useState<Array<BotInterface>>([]);

    const deepCopy = (obj:any) =>  JSON.parse(JSON.stringify(obj));

    const showDetails = (index: number) => {
        setDetailsVisibleIndex(index);
    };

    const hideDetails = () => {
        setDetailsVisibleIndex(null);
    };

    const editBanner = (index: number | null) => {
        setEditBannerIndex(index);
    };

    const moveBots = () => {
        const newBots = deepCopy(bots);
        for (let bot of newBots) {
            const changeVector = () => {
                bot.vectorY += Math.random() * 2 - 1;
                bot.vectorX += Math.random() * 2 - 1;
                if (bot.x < 0) {
                    bot.vectorX = Math.abs(bot.vectorX);
                }
                if (bot.y < 0) {
                    bot.vectorY = Math.abs(bot.vectorX);
                }
                if (bot.x > 1000) {
                    bot.vectorX = -Math.abs(bot.vectorX);
                }
                if (bot.y > 1900) {
                    bot.vectorY = -Math.abs(bot.vectorX);
                }
            }

            bot.x += bot.vectorX * 10;
            bot.y += bot.vectorY * 10;
            
            if (Math.random() < 0.05 || bot.x < 0 || bot.y < 0  || bot.x > 1000 || bot.y > 1900) {
                changeVector();
            }
            
        }
        if (Math.random() < 0.01) {
            newBots.push(
                {
                    x: 0,
                    y: 0,
                    xVector: 1,
                    yVector: 1,
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

            <Banner
                color="#36a1d5"
                left={100}
                top={100}
                title="My Banner"
                text="This is a banner component."
                initialWidth={300}
                initialHeight={300}
                onClick={showDetails}
                isEdit={editBannerIndex === 1}
                index={1}
            />

            <DetailsBanner
                isOpen={detailsVisibleIndex !== null}
                onHide={hideDetails}
                onEdit={editBanner}
                title="My Banner"
                src="https://github.com/everals/Adtension"
                owner="Илья Песович"
                price={100}
                bannerId={1}
                index={1}
                isEdit={editBannerIndex === 1}
            />
        </div>
    );
}

export default Site;
