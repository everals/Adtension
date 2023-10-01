import React from 'react';
import { Bot as BotProps, } from '../scripts/types';

const Bot: React.FC<BotProps> = ({ x, y, isClick, }) => {
    const style: React.CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
    };


    return (
        <div
            className={`cursor ${ isClick ? 'cursor--click' : ''}`}
            style={style}
        >
            <div className="cursor__anim"/>
        </div>
    )
};

export default Bot;
