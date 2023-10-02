import React, { useEffect, useState, createRef } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Banner as BannerInterface } from '../scripts/types';
import Info from '../components/Info';

interface MovableBlockProps {
    children:  React.ReactElement,

    x: number;
    y: number;

    resizeble?: boolean,
    width?: number;
    height?: number;
    maxWidth?: number;
    minWidth?: number;
    maxHeight?: number;
    minHeight?: number;

    onUpdateBannerX: (val: number) => void;
    onUpdateBannerY: (val: number) => void;
    onUpdateBannerWidth?: (val: number) => void;
    onUpdateBannerHeight?: (val: number) => void;

    isEdit: boolean,
}

function isVerticalOverlap({y: y1, height: height1}: { y: number, height: number }, {y: y2, height: height2 }: { y: number, height: number }) {
    return (y1 < y2 + height2) && (y1 + height1 > y2);
}

function isHorizontalOverlap({x: x1, width: width1}: { x: number, width: number }, {x: x2, width: width2 }: { x: number, width: number }) {
    return (x1 < x2 + width2) && (x1 + width1 > x2);
}

const Banner: React.FC<MovableBlockProps> = ({
    children,
    x,
    y,
    width,
    height,
    resizeble,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
    isEdit,
}) => {
    const blockRef = createRef();
    const [ bounds, setBounds ] = useState({
        top: 0,
        left: 0,
        right: window.innerWidth - 200,
        bottom: window.innerHeight - 300,
    });

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
    };

    const dragHandler = (_: any, ui: {x: number, y: number}) => {
        const blocks = document.querySelectorAll('.mblock') as NodeListOf<HTMLDivElement>;
        let top = 0;
        let left = 0;
        let right = window.innerWidth - 200;
        let bottom = window.innerHeight - 300;
        const currentBlock = Array.from(blocks).find((b) => b === blockRef.current);
        if (!currentBlock) {
            return;
        }
        const { width, height } = currentBlock.getBoundingClientRect();;

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
        if (!onUpdateBannerWidth || !onUpdateBannerHeight) {
            return;
        }
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
            {
                resizeble ?
                <ResizableBox
                    onResize={handleResize}
                    width={width || 0}
                    height={height || 0}
                    minConstraints={[150, 150]}
                    maxConstraints={[400, 250]}
                >
                    <div
                        className={`mblock h-full ${ isEdit ? 'mblock--edit' : '' }`}
                        ref={blockRef as React.RefObject<HTMLDivElement>}
                    >
                        { children }
                    </div>
                </ResizableBox>
                :
                <div
                    className={`mblock ${ isEdit ? 'mblock--edit' : '' }`}
                    ref={blockRef as React.RefObject<HTMLDivElement>}
                >
                    { children  }
                </div>
            }
        </Draggable>
    );
};

export default Banner;
