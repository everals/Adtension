import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Banner as BannerInterface } from '../scripts/types';
import Info from '../components/Info';

interface BannerProps extends BannerInterface {
    index: number,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
}

function rand (a:number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const Banner: React.FC<BannerProps> = ({
    index,
    color,
    x,
    y,
    title,
    text,
    width,
    height,
    fontType,
    price,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [random, setRandom] = useState(rand(1, 11));

    const bannerClasses = `p-4 border border-black rounded-xl h-full ad ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
    };

    const handleResize = (_: any, { size }: { size: { width: number, height: number }}) => {
        onUpdateBannerWidth(size.width);
        onUpdateBannerHeight(size.height);
    };

    return (
        <Draggable
            onStop={stopHandler}
            scale={1}
            defaultPosition={{x, y}}
            handle={isEdit ? '#nothing' : undefined}
            bounds={{
                top: 0,
            }}
        >
            <ResizableBox
                onResize={handleResize}
                width={width}
                height={height}
                minConstraints={[150, 150]}
                maxConstraints={[400, 250]}
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
            </ResizableBox>
        </Draggable>
    );
};

export default Banner;
