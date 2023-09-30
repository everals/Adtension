import React from 'react';

interface BotProps {
    id: number;
    x: number;
    y: number;
};

const Bot: React.FC<BotProps> = ({ x, y }) => {
    const style: React.CSSProperties = {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        width: '20px', 
        height: '20px',
        backgroundImage: 'url(https://www.pngmart.com/files/3/Cursor-Arrow-PNG-Picture.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        transition: '300ms',
        zIndex: 99,
    };

    return <div style={style} />
};

export default Bot;
