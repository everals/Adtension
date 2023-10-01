import React from 'react';
import { Rialto as RialtoInterface } from '../scripts/types';

const handleClick = () => {};

const RialtoItem: React.FC<RialtoInterface> = ({ name, text, price, }) => {
    return (
    <div className="bg-gray-200 rounded-xl p-4 w-3/12">
        <h2 className="text-xl font-semibold mb-2">
            { name }
        </h2>
        <p className="text-gray-600 mb-4">
            { text }
        </p>
        <div className="flex justify-end items-center">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
                { price } $
            </button>
        </div>
    </div>
    );
};

export default RialtoItem;
