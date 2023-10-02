import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Image as ImageInterface } from '../scripts/types';
import Info from './Info';
import MovableBlock from './MovableBlock';
interface ImageProps extends ImageInterface {
    id: number;
    onUpdateBannerX: (val: number) => void;
    onUpdateBannerY: (val: number) => void;
    onUpdateBannerWidth: (val: number) => void;
    onUpdateBannerHeight: (val: number) => void;
    onUpdateBannerSet: (val: boolean) => void;
}

const Image: React.FC<ImageProps> = ({
    id,
    x,
    y,
    width,
    height,
    src,
    isSet,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
    onUpdateBannerSet,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const bannerClasses = `relative h-full ${ isEdit ? 'border-dashed border-2' : '' }`;

    return (
        <MovableBlock
            x={x}
            y={y}
            width={width}
            height={height}
            onUpdateBannerX={onUpdateBannerX}
            onUpdateBannerY={onUpdateBannerY}
            onUpdateBannerWidth={onUpdateBannerWidth}
            onUpdateBannerHeight={onUpdateBannerHeight}
            onUpdateBannerSet={onUpdateBannerSet}
            isEdit={isEdit}
            isSet={isSet}
            resizeble
        >
            <div
                className={bannerClasses}
                onDoubleClick={() => setIsEdit(!isEdit)}
                onClick={() => setIsEdit(false)}
            >
                {
                    isEdit ?
                    <>
                        <Info
                            income={0}
                            reputation={0.5}
                            id={id}
                        />
                        <div
                            className={`handle`}
                        />
                    </>
                    :
                    null
                }
                <div
                    className="image h-full w-full"
                    style={{backgroundImage: `url(./assets/images/${src})`}}
                    draggable={false}
                />
            </div>
        </MovableBlock>
    );
};

export default Image;
