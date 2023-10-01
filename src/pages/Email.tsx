import React, { useState, useEffect, } from 'react';
import EmailItem from "../components/EmailItem";
import { greetings, farewells, requests, names } from "../scripts/emailTemplates";
import { bannerList, badBannerList } from "../scripts/bannerTemplates";
import { Email as EmailInterface, Banner, Anal, Rialto, Bot, } from '../scripts/types';
import { setEmail as setEmailAction,} from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

const banners = [...bannerList, ...badBannerList];

function generateAdvertisementRequest(mail: { title: string, text: string }, owner: string): string {
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const request = requests[Math.floor(Math.random() * requests.length)];
    const farewell = farewells[Math.floor(Math.random() * farewells.length)];

    // Генерация сообщения
    const message = `
        ${greeting} ${request}
        Заголовок баннера: <b>«${mail.title}»</b>.<br>
        Текст баннера: <b>«${mail.text}»</b>
        ${farewell}
        <br><br>
        От ${owner}.
    `;

    return message;
};

function rand(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const generatenName = () => {
    return names[Math.floor(Math.random() * names.length)];
};

const generateEmails = (): Array<EmailInterface> => {
    const emails = [];
    for (let i = 0; i < 4; i++) {
        const banner = banners[Math.floor(Math.random() * banners.length)];
        const name = generatenName();

        emails.push({
            name: name,
            time: `${ rand(1, 30) } часа назад`,
            text: generateAdvertisementRequest(banner, name),
            cost: rand(0, 100),
            isNew: true,
            isBab: badBannerList.includes(banner),
        })
    }
    return emails;
};

function Email() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const emails = user.emails;
    const setEmails = (payload: Array<EmailInterface>) => dispatch(setEmailAction(payload));

    useEffect(() => {
        if (emails.length) {
            return;
        }
        setEmails(generateEmails());
    }, []);

    return (
        <div className="tab">
            <div>
                {
                    emails.map((email, index) => (
                        <EmailItem
                            key={index}
                            {...email}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Email;
