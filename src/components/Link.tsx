import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Link as LinkInterface } from '../scripts/types';
import Info from '../components/Info';
import MovableBlock from '../components/MovableBlock';

interface LinkProps extends LinkInterface {
    index: number,
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
    owner,
    price,
    fontType,
    onUpdateBannerX,
    onUpdateBannerY,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const [random, setRandom] = useState(rand(1, 11));
    const linkClasses = `ad ad-${ fontType || random } ${ isEdit ? 'border-dashed border-2' : 'border-solid' }`;
    return (
        <MovableBlock
            onUpdateBannerX={onUpdateBannerX}
            onUpdateBannerY={onUpdateBannerY}
            x={x}
            y={y}
            isEdit={isEdit}
        >
            <div
                className={linkClasses}
                style={{color: color}}
                data-price={price}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
            >
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
                { text }
            </div>
        </MovableBlock>
    );
};

export default Link;
