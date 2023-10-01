import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Link as LinkInterface } from '../scripts/types';

interface LinkProps extends LinkInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
}

function rand (a:number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const Link: React.FC<LinkProps> = ({
    index,
    color,
    x,
    y,
    src,
    text,
    isEdit,
    owner,
    price,
    onClick,
    fontType,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [random, setRandom] = useState(rand(1, 11));
    const linkClasses = `ad ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
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
            <div
                className={linkClasses}
                onClick={() => onClick(index)}
                style={{color: color}}
                data-price={price}
            >
                {
                    isEdit ?
                    <div
                        className={`handle`}
                    />
                    :
                    null
                }
                { text }
            </div>
        </Draggable>
    );
};

export default Link;
