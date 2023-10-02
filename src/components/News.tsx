import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { News as NewsInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';

interface NewsProps extends NewsInterface {
    index: number,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
    isEdit: boolean,
}

const News: React.FC<NewsProps> = ({
    index,
    x,
    y,
    title,
    text,
    width,
    height,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
    isEdit,
}) => {
    const bannerClasses = `news p-6 bg-gray-200 border text-black rounded-xl h-full ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    return (
        <MovableBlock
            x={x}
            y={y}
            width={width}
            height={height}
            onUpdateBannerX={onUpdateBannerX}
            onUpdateBannerY={onUpdateBannerY}
            onUpdateBannerWidth={onUpdateBannerWidth}
            onUpdateBannerHeight={onUpdateBannerHeight}
            resizeble
        >
            <div className={bannerClasses}>
                <div className="flex justify-between">
                    <h2 className="news__title text-black text-lg font-bold mb-3">
                        { title }
                    </h2>
                    {
                        isEdit ?
                        <>
                            <Info
                                income={0}
                                reputation={0.5}
                            />
                            <div
                                className={`handle`}
                            />
                        </>
                        :
                        null
                    }
                </div>
                <p className="text-black">
                    { text }
                </p>
            </div>
        </MovableBlock>
    );
};

export default News;
