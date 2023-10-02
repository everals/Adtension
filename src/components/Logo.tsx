import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Logo as LogoInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';
interface LogoProps extends LogoInterface {
    index: number,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
}

const Logo: React.FC<LogoProps> = ({
    index,
    x,
    y,
    width,
    height,
    src,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const bannerClasses = `relative h-full ${ isEdit ? 'border-dashed border-2' : '' }`;

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
            isEdit={isEdit}
            resizeble
        >
            <div
                className={bannerClasses}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
            >
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
                <img
                    className="h-full w-full"
                    src={src}
                    draggable={false}
                />
            </div>
        </MovableBlock>
    );
};

export default Logo;
