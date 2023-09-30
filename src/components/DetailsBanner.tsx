import React, { useState } from 'react';

interface DetailsBannerProps {
    isOpen: boolean;
    onHide: Function;
    onEdit: Function;
    bannerId: number;
    title: string;
    owner: string;
    src: string;
    price: number;
    index: number,
    isEdit: boolean,
}

const DetailsBanner: React.FC<DetailsBannerProps> = ({ isOpen, onHide, onEdit, bannerId, owner, title, src, price, index, isEdit, }) => {
    const closeModal = () => {
        onHide();
    };

    return (
        isOpen ?
        (
            <div className="fixed bottom-0 inset-x-0 p-4 bg-gray-300 flex flex-col items-center shadow-lg">
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
        )
        :
        null
    );
};

export default DetailsBanner;
