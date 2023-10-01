import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Logo as LogoInterface } from '../scripts/types';
interface LogoProps extends LogoInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
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
}) => {
    const bannerClasses = `h-full w-full ${ isEdit ? 'edit-banner border-dashed border-2' : '' }`;

    return (
        <Draggable
            scale={1}
            defaultPosition={{x, y}}
            handle={isEdit ? '.handle' : '#nothing'}
            bounds={{
                top: 0,
            }}
        >
            <ResizableBox
                width={width}
                height={height}
                minConstraints={[50, 50]}
                maxConstraints={[600, 300]}
            >
                <img
                    src={src}
                    className={bannerClasses}
                    onClick={() => onClick(index)}
                />
            </ResizableBox>
        </Draggable>
    );
};

export default Logo;
