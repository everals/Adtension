import React from 'react';
import RialtoItem from "../components/RialtoItem";

const rialtos = [
    {
        name: 'Контент-мейкер',
        text: 'Пишу тексты на тему рыбалки с 14 лет. Опыт диганский!',
        price: 100,
    },
];

function Rialto() {
    return (
        <div className="tab">
            <div>
                {
                    rialtos.map((rialto, index) => (
                        <RialtoItem key={index} {...rialto} />
                    ))
                }
            </div>
        </div>
    );
}

export default Rialto;
