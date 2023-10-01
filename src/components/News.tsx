import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { News as NewsInterface } from '../scripts/types';
interface NewsProps extends NewsInterface {
    index: number,
    onClick: Function,
    isEdit: boolean,
}

const News: React.FC<NewsProps> = ({
    index,
    x,
    y,
    title,
    text,
    width,
    height,
    onClick,
    isEdit,
}) => {
    const bannerClasses = `news p-6 bg-gray-200 border text-black rounded-xl h-full ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    const handleClick = () => {
        console.log(555);
        onClick(index);
    };

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
                    onClick={handleClick}
                >
                    <div className="flex justify-between">
                        <h2 className="news__title text-black text-lg font-bold mb-3">
                            { title }
                        </h2>
                        {
                            isEdit ?
                            <div
                                className={`handle`}
                            />
                            :
                            null
                        }
                    </div>
                    <p className="text-black">
                        { text }
                    </p>
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default News;
