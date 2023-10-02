import { Email as EmailInterface, Banner as BannerInterface, Anal, Rialto, Bot, } from './types';
import { greetings, farewells, requests, names, badEmails, } from "./emailTemplates";
import { bannerList, badBannerList, } from "./bannerTemplates";

export function rand(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

export const generateName = () => {
    return names[Math.floor(Math.random() * names.length)];
};


export const generateBadEmailText = () => {
    return badEmails[Math.floor(Math.random() * badEmails.length)];
};

const banners = [...bannerList, ...badBannerList];

export function generateAdvertisementRequest(mail: { title: string, text: string }, owner: string): string {
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

export const generateBadEmail = (): EmailInterface => {
    const sum = rand(-15, -1);
    const email = generateBadEmailText();
    email.text = email.text.replace(/SUM/g, (-sum).toString());

    return {
        name: email.name,
        time: `${ rand(1, 30) } часа назад`,
        messageText: email.text,
        text: '',
        title: '',
        price: sum,
        isNew: true,
        isBab: false,
        isDisable: true,
    }
};

export function getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const generateWorkEmail = (): EmailInterface => {
    const banner = banners[Math.floor(Math.random() * banners.length)];
    const name = generateName();

    return {
        name: name,
        time: getCurrentTime(),
        messageText: generateAdvertisementRequest(banner, name),
        text: banner.text,
        title: banner.title,
        price: rand(1, 8),
        isNew: true,
        isBab: badBannerList.includes(banner),
        isDisable: false,
    }
};

export const generateEmail = (): EmailInterface => {
    if (rand(1, 20) === 1) {
        return generateBadEmail()
    } else {
        return generateWorkEmail()
    }
};