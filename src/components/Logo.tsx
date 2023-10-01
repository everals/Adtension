import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import { Logo as LogoInterface } from '../scripts/types';
import Info from '../components/Info';
interface LogoProps extends LogoInterface {
    index: number,
    onUpdateBannerX: (val: number) => void,
    onUpdateBannerY: (val: number) => void,
    onUpdateBannerWidth: (val: number) => void,
    onUpdateBannerHeight: (val: number) => void,
}

const Logo: React.FC<LogoProps> = ({
    index,
    x,
    y,
    width,
    height,
    src,
    onUpdateBannerX,
    onUpdateBannerY,
    onUpdateBannerWidth,
    onUpdateBannerHeight,
}) => {
    const [ isEdit, setIsEdit ] = useState(false);
    const bannerClasses = `relative h-full ${ isEdit ? 'edit-banner border-dashed border-2' : '' }`;

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
                minConstraints={[50, 50]}
                maxConstraints={[600, 300]}
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
                            />
                            <div
                                className={`handle`}
                            />
                        </>
                        :
                        null
                    }
                    <img
                        className="h-full w-full"
                        src={src}
                    />
                </div>
            </ResizableBox>
        </Draggable>
    );
};

export default Logo;
