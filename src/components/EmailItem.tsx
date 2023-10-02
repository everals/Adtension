import React from "react";
import { Email as EmailInterface } from '../scripts/types';

interface EmailItemProps extends EmailInterface {
    isOpen: boolean;
    onClick: Function;
    onAdd: Function;
    onRemove: Function;
}

const EmailItem: React.FC<EmailItemProps> = ({ name, time, messageText, price, isNew, isOpen, onClick, onAdd, isDisable, onRemove, }) => {
    const handleClick = () => {
        onClick();
    };

    const handleAdd = () => {
        onAdd();
    };

    const removeEmail = (event: React.MouseEvent<SVGSVGElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onRemove();
    };

    return (
        <div className="bg-gray-200 p-4 rounded mb-4 flex flex-wrap cursor-pointer" onClick={handleClick}>
            <div className="w-3/12 p-2 font-semibold flex">
                {
                    <div className={`w-2 h-2 mr-2 mt-2 rounded-full ${ isNew ? 'bg-green-500' : ''}`}/>
                }
                { name }
            </div>
            <div
                className={`mail w-6/12 p-2 ${isOpen ? 'mail--open' : 'mail--close'}`}
                dangerouslySetInnerHTML={{__html: messageText}}
            />
            {
                price < 0 ?
                <div className="w-1/12 p-2 text-red-600 font-bold flex justify-center">
                    { price } $
                </div>
                :
                <div className="w-1/12 p-2 text-green-600 font-bold flex justify-center">
                    { price } $
                </div>
            }
            <div className="w-2/12 p-2 text-gray-500 text-sm flex justify-end">
                { time }
                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4" onClick={removeEmail}>
                    <path d="M7.13227 0.0836764C6.62645 0.248364 6.13238 0.777718 6.05004 1.24826C5.94417 1.9423 5.76772 2.28344 5.46187 2.4246C5.27365 2.50694 4.34434 2.55399 2.93273 2.55399H0.685919L0.344779 2.89513C-0.03165 3.27156 -0.10223 3.82444 0.144801 4.37732C0.45065 5.04784 0.156565 5.02431 9.99078 5.02431C16.7665 5.02431 19.131 4.98902 19.3545 4.88315C20.0603 4.56554 20.225 3.47154 19.6603 2.89513L19.3192 2.55399H17.0724C15.6843 2.55399 14.7314 2.50694 14.555 2.4246C14.2374 2.28344 14.0021 1.87172 14.0021 1.46C14.0021 1.10709 13.6139 0.495396 13.214 0.236601C12.9316 0.0483862 12.5787 0.0248593 10.179 0.00133251C8.69681 -0.0104309 7.32049 0.0248593 7.13227 0.0836764Z" fill="#6B7280"/>
                    <path d="M1.92097 7.68274C1.13282 8.07094 1.13282 7.92977 1.70922 14.7878C2.00331 18.1875 2.29739 21.1754 2.36798 21.4342C2.88557 23.2693 4.42657 24.6574 6.34401 25.022C7.16745 25.1749 12.8374 25.1749 13.6609 25.022C15.5783 24.6574 17.1193 23.2693 17.6369 21.4342C17.7075 21.1754 18.0016 18.1875 18.2956 14.7878C18.7662 9.12964 18.8015 8.58853 18.6368 8.24739C18.2721 7.471 18.4956 7.49453 9.97891 7.49453C3.25023 7.49453 2.25034 7.51806 1.92097 7.68274Z" fill="#6B7280"/>
                </svg>

            </div>
            {
                isOpen ?
                <div className="w-9/12 p-2 flex justify-end items-center">
                    {
                    price < 0 ?
                        null
                    :
                    isDisable ?
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
                            disabled={true}
                        >
                            { price > 100 ? 'Кажется вас надули...' : 'Eже добавлено' }
                        </button>
                        :
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                        >
                            { price > 100 ? 'Забрать приз' : 'Разместить' }
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
