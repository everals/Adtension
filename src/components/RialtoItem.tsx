import React from 'react';
import { Rialto as RialtoInterface } from '../scripts/types';

interface RialtoProps extends RialtoInterface {
    onAdd: Function,
};

const RialtoItem: React.FC<RialtoProps> = ({ name, about, price, onAdd, age, domain, count, work, topic, }) => {
    const handleAdd = () => {
        onAdd();
    };

    return (
        <div className="p-4 w-3/12">
            <div className="bg-gray-200 rounded-xl p-4 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-2">
                    { work }
                </h2>
                <div className="text-gray-500 mb-1 text-sm">
                    { name }
                </div>
                {
                    name.includes('ООО') ?
                    null
                    :
                    <div className="text-gray-500 mb-1 text-sm">
                        Возраст: { age } лет
                    </div>
                }
                {
                    !topic ?
                    null
                    :
                    <div className="text-gray-500 mb-1 text-sm">
                        Тема: { topic }
                    </div>
                }
                {
                    !domain ?
                    null
                    :
                    <div className="text-gray-500 mb-1 text-sm">
                        Предлагаемый домен: { domain }
                    </div>
                }
                {
                    !count ?
                    null
                    :
                    <div className="text-gray-500 mb-1 text-sm">
                        Макс. загруженность сайта: { count }
                    </div>
                }
                <div>

                </div>
                <p className="text-gray-600 mb-4 mt-2">
                    { about }
                </p>
                <div className="flex justify-end items-center mt-auto">
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                    >
                        Заказать за { price } $
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RialtoItem;
