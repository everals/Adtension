import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Link as LinkInterface } from '../scripts/types';

interface LinkProps extends LinkInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
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
}) => {
    const [random, setRandom] = useState(rand(1, 11));
    const linkClasses = `ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    return (
        <Draggable
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
            >
                { text }
            </div>
        </Draggable>
    );
};

export default Link;
