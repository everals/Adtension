import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { News as NewsInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';

interface NewsProps extends NewsInterface {
    id: number;
    onUpdateBannerX: (val: number) => void;
    onUpdateBannerY: (val: number) => void;
    onUpdateBannerWidth: (val: number) => void;
    onUpdateBannerHeight: (val: number) => void;
    onUpdateBannerSet: (val: boolean) => void;
}

const News: React.FC<NewsProps> = ({
    id,
    x,
    y,
    title,
    text,
    width,
    height,
    isSet,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
    onUpdateBannerSet,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const bannerClasses = `news p-6 bg-gray-200 border text-black rounded-xl h-full ${ isEdit ? 'border-dashed border-2 border-black' : '' }`;

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
            onUpdateBannerSet={onUpdateBannerSet}
            resizeble
            isEdit={isEdit}
            isSet={isSet}
        >
            <div
                className={bannerClasses}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
            >
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
                                id={id}
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
