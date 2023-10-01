import React, { useState } from 'react';
import { AllTypesOfBlocks } from '../scripts/types';

interface DetailsBannerProps {
    onHide: Function;
    onEdit: Function;
    bannerId: number;
    title?: string;
    owner?: string;
    src?: string;
    price?: number;
    index: number,
    isEdit: boolean,
}

const DetailsBanner: React.FC<DetailsBannerProps> = ({ onHide, onEdit, bannerId, owner, title, src, price, index, isEdit, }) => {
    const closeModal = () => {
        onHide();
    };

    return (
        <div
            className="fixed bottom-0 inset-x-0 p-4 bg-gray-200 flex flex-col items-center z-50"
            style={{
                boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.2)',
            }}
        >
            <button
                className="hover:underline absolute top-2 right-6"
                onClick={closeModal}
            >
                закрыть
            </button>

            <p className="text-xl font-bold mb-2">
                { title }
            </p>
            <p className="mb-2">
                Владелец - { owner }
            </p>
            <p className="mb-2">
                Ссылка - { src }
            </p>
            <p className="mb-2">
                Доход - { price } $ в месяц
            </p>
            <div>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                    onClick={closeModal}
                >
                    Удалить баннер
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full ml-4"
                    onClick={() => onEdit(isEdit ? null: index)}
                >
                    {
                        isEdit ? 'Сохранить изменения' : 'Редактировать баннер'
                    }
                </button>
            </div>
        </div>
    );
};

export default DetailsBanner;
