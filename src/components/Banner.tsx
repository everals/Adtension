import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";

interface BannerProps {
    color: string;
    left: number;
    top: number;
    title: string;
    text: string;
    initialWidth: number;
    initialHeight: number;
}

const Banner: React.FC<BannerProps> = ({
    color,
    left,
    top,
    title,
    text,
    initialWidth,
    initialHeight,
}) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);

    return (
    <Draggable
        scale={1}
        handle=".handle"
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
                className={`p-4 border border-black border-solid rounded-xl h-full`}
                style={{
                    background: color,
                }}
            >
                <h2 className="text-white text-lg font-semibold handle">
                    { title }
                </h2>
                <p className="text-white">
                    { text }
                </p>
            </div>
        </ResizableBox>
    </Draggable>
    );
};

export default Banner;
