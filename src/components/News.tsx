import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { News as NewsInterface } from '../scripts/types';
import Info from '../components/Info';
interface NewsProps extends NewsInterface {
    index: number,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
}

const News: React.FC<NewsProps> = ({
    index,
    x,
    y,
    title,
    text,
    width,
    height,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const bannerClasses = `news p-6 bg-gray-200 border text-black rounded-xl h-full ${ isEdit ? 'edit-banner border-dashed border-2' : 'border-solid' }`;

    const stopHandler = (_: any, ui: {x: number, y: number}) => {
        onUpdateBannerX(ui.x);
        onUpdateBannerY(ui.y);
    };

    const handleResize = (_: any, { size }: { size: { width: number, height: number }}) => {
        onUpdateBannerWidth(size.width);
        onUpdateBannerHeight(size.height);
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
            <ResizableBox
                onResize={handleResize}
                width={width}
                height={height}
                minConstraints={[150, 150]}
                maxConstraints={[600, 300]}
            >
                <div
                    className={bannerClasses}
                    onDoubleClick={() => setIsEdit(!isEdit)}
                    onClick={() => setIsEdit(false)}
                >
                    <div className="flex justify-between">
                        <h2 className="news__title text-black text-lg font-bold mb-3">
                            { title }
                        </h2>
                        {
                            isEdit ?
                            <>
                                <Info
                                    income={0}
                                    reputation={0.5}
                                />
                                <div
                                    className={`handle`}
                                />
                            </>
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
