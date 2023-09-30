import React, { useState, } from 'react';
import Banner from "../components/Banner";
import DetailsBanner from "../components/DetailsBanner";

function Site() {
    const [detailsVisibleIndex, setDetailsVisibleIndex] = useState<number | null>(null);
    const [editBannerIndex, setEditBannerIndex] = useState<number | null>(null);

    // const [bots, setBots] = useState<BotInterface>([]);

    // const addBot = () => {
    //     setBots([
    //         ...bots,
    //         {
    //             x: 0,
    //             y: 0,
    //         },
    //     ])
    // };

    const showDetails = (index: number) => {
        setDetailsVisibleIndex(index);
    };

    const hideDetails = () => {
        setDetailsVisibleIndex(null);
    };

    const editBanner = (index: number | null) => {
        setEditBannerIndex(index);
    };

    return (
        <div className="tab relative">
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
