import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Banner as BannerInterface } from '../scripts/types';
interface BannerProps extends BannerInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
}

function rand (a:number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const Banner: React.FC<BannerProps> = ({
    index,
    color,
    x,
    y,
    title,
    text,
    width,
    height,
    onClick,
    isEdit,
    fontType,
    price,
}) => {
    const [random, setRandom] = useState(rand(1, 11));

    const bannerClasses = `p-4 border border-black rounded-xl h-full ad ad-${ fontType || random } ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

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
                minConstraints={[150, 150]}
                maxConstraints={[600, 300]}
            >
                <div
                    className={bannerClasses}
                    style={{
                        background: color,
                    }}
                    data-price={price}
                    onClick={() => onClick(index)}
                >
                    <div className="flex justify-between">
                        <h2 className="text-white text-lg font-semibold">
                            { title }
                        </h2>
                        {
                            isEdit ?
                            <div
                                className={`handle w-3 h-3 bg-white rounded-full cursor-move`}
                            />
                            :
                            null
                        }
                    </div>
                    <p className="text-white">
                        { text }
                    </p>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Banner;
