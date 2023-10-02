import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Button as ButtonInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';

interface ButtonProps extends ButtonInterface {
    index: number;
    onUpdateBannerX: (val: number) => void;
    onUpdateBannerY: (val: number) => void;
    onUpdateBannerWidth: (val: number) => void;
    onUpdateBannerHeight: (val: number) => void;
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
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [random, setRandom] = useState(rand(1, 11));
    const buttonClasses = `p-3 border text-white font-bold rounded-xl ad ad-${ fontType || random } ${ isEdit ? 'border-dashed border-2' : '' }`;

    return (
        <MovableBlock
            onUpdateBannerX={onUpdateBannerX}
            onUpdateBannerY={onUpdateBannerY}
            x={x}
            y={y}
            isEdit={isEdit}
        >
            <div
                style={{ background: color, }}
                className={buttonClasses}
                data-price={price}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
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
        </MovableBlock>
    );
};

export default Button;
