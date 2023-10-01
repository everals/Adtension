import React from "react";
import { Email as EmailInterface } from '../scripts/types';

interface EmailItemProps extends EmailInterface {
    isOpen: boolean,
    onClick: Function,
    onAdd: Function;
}

const EmailItem: React.FC<EmailItemProps> = ({ name, time, messageText, price, isNew, isOpen, onClick, onAdd, isDisable, }) => {
    const handleClick = () => {
        onClick();
    };

    const handleAdd = () => {
        onAdd();
    };

    return (
        <div className="bg-gray-200 p-4 rounded mb-4 flex flex-wrap cursor-pointer" onClick={handleClick}>
            <div className="w-2/12 p-2 font-semibold flex">
                {
                    <div className={`w-2 h-2 mr-2 mt-2 rounded-full ${ isNew ? 'bg-green-500' : ''}`}/>
                }
                { name }
            </div>
            <div
                className={`mail w-8/12 p-2 ${isOpen ? 'mail--open' : 'mail--close'}`}
                dangerouslySetInnerHTML={{__html: messageText}}
            />
            <div className="w-1/12 p-2 text-green-600 font-bold">
                { price } $
            </div>
            <div className="w-1/12 p-2 text-gray-500 text-sm">
                { time }
            </div>
            {
                isOpen ?
                <div className="w-9/12 p-2 flex justify-end items-center">
                    {
                    isDisable ?
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
                            disabled={true}
                        >
                            Баннер уже добавлен
                        </button>
                        :
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                        >
                            Разместить баннер
                        </button>
                    }
                </div>
                :
                null
            }
        </div>
    );
};

export default EmailItem;
