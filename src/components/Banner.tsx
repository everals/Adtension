import React, { useEffect, useState, createRef } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Banner as BannerInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';

interface BannerProps extends BannerInterface {
    id: number;
    onUpdateBannerX: (val: number) => void;
    onUpdateBannerY: (val: number) => void;
    onUpdateBannerWidth: (val: number) => void;
    onUpdateBannerHeight: (val: number) => void;
    onUpdateBannerSet: (val: boolean) => void;
}

function rand (a:number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const Banner: React.FC<BannerProps> = ({
    id,
    color,
    x,
    y,
    title,
    text,
    width,
    height,
    fontType,
    price,
    isSet,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
    onUpdateBannerSet,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [ random, setRandom ] = useState(rand(1, 11));
    const bannerClasses = `banner p-4 border border-black rounded-xl h-full ad ad-${ fontType || random } ${ isEdit ? 'border-dashed border-2' : 'border-solid' }`;

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
                style={{
                    background: color,
                }}
                data-price={price}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
            >
                <div className="flex justify-between">
                    <h2 className="text-white text-lg font-semibold">
                        { title }
                    </h2>
                    {
                        isEdit ?
                        <>
                            <Info
                                income={price}
                                reputation={-1}
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
                <p className="text-white">
                    { text }
                </p>
            </div>
        </MovableBlock>
    );
};

export default Banner;
