import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Link as LinkInterface } from '../scripts/types';
import Info from '../components/Info';

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
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
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
            bounds={{
                top: 0,
            }}
            handle={isEdit ? '#nothing' : undefined}
        >
            <div
                className={linkClasses}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
                style={{color: color}}
                data-price={price}
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
        </Draggable>
    );
};

export default Link;
