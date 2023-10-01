import React, { useEffect, useState, createRef } from "react";
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

function isVerticalOverlap({y: y1, height: height1}: { y: number, height: number }, {y: y2, height: height2 }: { y: number, height: number }) {
    return (y1 < y2 + height2) && (y1 + height1 > y2);
}

function isHorizontalOverlap({x: x1, width: width1}: { x: number, width: number }, {x: x2, width: width2 }: { x: number, width: number }) {
    return (x1 < x2 + width2) && (x1 + width1 > x2);
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
    const [ random, setRandom ] = useState(rand(1, 11));
    const blockRef = createRef();
    const [ bounds, setBounds ] = useState({
        top: 0,
        left: 0,
        right: window.innerWidth - 200,
        bottom: window.innerHeight - 300,
    });

    const bannerClasses = `p-4 border border-black rounded-xl h-full ad ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
    };

    const dragHandler = (_: any, ui: {x: number, y: number}) => {
        const blocks = document.querySelectorAll('.ad, .news') as NodeListOf<HTMLDivElement>;
        let top = 0;
        let left = 0;
        let right = window.innerWidth - 200;
        let bottom = window.innerHeight - 300;
        for (let block of blocks) {
            if (blockRef.current === block) {
                continue;
            }
            const mainBlock = { x: ui.x, y: ui.y + 144, width, height };
            const extraBlock = block.getBoundingClientRect();
            if (isHorizontalOverlap(mainBlock, extraBlock)) {
                if (mainBlock.y < extraBlock.y) {
                    bottom = Math.min(bottom, extraBlock.y - mainBlock.height - 144)
                } else {
                    top = Math.max(top, extraBlock.y + extraBlock.height  - 144)
                }
            }

            if (isVerticalOverlap(mainBlock, extraBlock)) {
                if (mainBlock.x < extraBlock.x) {
                    right = Math.min(right, extraBlock.x - mainBlock.width)
                } else {
                    left = Math.max(left, extraBlock.x + extraBlock.width);
                }
            }
        }
        setBounds({ top, left, right, bottom, });
    };

    const handleResize = (_: any, { size }: { size: { width: number, height: number }}) => {
        onUpdateBannerWidth(size.width);
        onUpdateBannerHeight(size.height);
    };

    return (
        <Draggable
            onStop={stopHandler}
            onDrag={dragHandler}
            scale={1}
            defaultPosition={{x, y}}
            handle={isEdit ? '#nothing' : undefined}
            bounds={bounds}
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
                    ref={blockRef as React.RefObject<HTMLDivElement>}
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
