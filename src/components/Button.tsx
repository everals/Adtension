import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Button as ButtonInterface } from '../scripts/types';

interface ButtonProps extends ButtonInterface {
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

const Button: React.FC<ButtonProps> = ({
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
    const buttonClasses = `p-3 border text-white font-bold rounded-xl ad ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : '' }`;

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
    };

    return (
        <Draggable
            onStop={stopHandler}
            defaultPosition={{x, y}}
            scale={1}
            handle={isEdit ? '.handle' : '#nothing'}
            bounds={{
                top: 0,
            }}
        >
            <div
                style={{ background: color, }}
                className={buttonClasses}
                onClick={() => onClick(index)}
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

export default Button;
