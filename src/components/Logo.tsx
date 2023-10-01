import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Logo as LogoInterface } from '../scripts/types';
interface LogoProps extends LogoInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
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
    onClick,
    isEdit,
    src,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const bannerClasses = `h-full w-full ${ isEdit ? 'edit-banner border-dashed border-2' : '' }`;

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
            handle={isEdit ? '.handle' : '#nothing'}
            bounds={{
                top: 0,
            }}
        >
            <ResizableBox
                onResize={handleResize}
                width={width}
                height={height}
                minConstraints={[50, 50]}
                maxConstraints={[600, 300]}
            >
                <div>
                    {
                        isEdit ?
                        <div
                            className={`handle`}
                        />
                        :
                        null
                    }
                    <img
                        src={src}
                        className={bannerClasses}
                        onClick={() => onClick(index)}
                    />
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Logo;
