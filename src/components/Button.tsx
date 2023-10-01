import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Button as ButtonInterface } from '../scripts/types';
import Info from '../components/Info';

interface ButtonProps extends ButtonInterface {
    index: number,
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
    owner,
    price,
    fontType,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
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
            bounds={{
                top: 0,
            }}
            handle={isEdit ? '#nothing' : undefined}
        >
            <div
                style={{ background: color, }}
                className={buttonClasses}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
                data-price={price}
            >
                {
                    isEdit ?
                    <>
                        <div
                            className={`handle`}
                        />
                        <Info
                            income={price}
                            reputation={-1}
                        />
                    </>
                    :
                    null
                }
                { text }
            </div>
        </Draggable>
    );
};

export default Button;
