import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";

interface BannerProps {
    index: number,
    color: string;
    left: number;
    top: number;
    title: string;
    text: string;
    initialWidth: number;
    initialHeight: number;
    onClick: Function,
    isEdit: boolean,
}

const Banner: React.FC<BannerProps> = ({
    index,
    color,
    left,
    top,
    title,
    text,
    initialWidth,
    initialHeight,
    onClick,
    isEdit,
}) => {
    const bannerClasses = `p-4 border border-black rounded-xl h-full ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    return (
        <Draggable
            scale={1}
            handle={isEdit ? '.handle' : '#nothing'}
            bounds={{
                top: 0,
            }}
        >
            <ResizableBox
                width={initialWidth}
                height={initialHeight}
                minConstraints={[150, 150]}
                maxConstraints={[600, 300]}
            >
                <div
                    className={bannerClasses}
                    style={{
                        background: color,
                    }}
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
