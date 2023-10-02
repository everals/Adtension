export interface Email {
    name: string;
    time: string;
    messageText: string,
    text: string;
    title: string;
    price: number;
    isNew: boolean;
    isDisable: boolean,
    isBab: boolean,
};

export interface Banner {
    isBanner: true;
    bannerId: number;
    title: string;
    owner: string;
    src: string;
    price: number;
    color: string;
    x: number;
    y: number;
    text: string;
    width: number
    height: number;
    isBad?: boolean;
    fontType?: number;
};

export interface News {
    isNews: true;
    bannerId: number;
    title: string;
    x: number;
    y: number;
    text: string;
    width: number
    height: number;
    isBad?: boolean;
};

export interface Link {
    isLink: true;
    bannerId: number;
    owner?: string;
    src: string;
    price: number;
    color: string;
    x: number;
    y: number;
    text: string;
    isBad?: boolean;
    fontType?: number;
};

export interface Button {
    isButton: true;
    bannerId: number;
    owner?: string;
    src: string;
    price: number;
    color: string;
    x: number;
    y: number;
    text: string;
    isBad?: boolean;
    fontType?: number;
};

export interface Logo {
    isLogo: true;
    bannerId: number;
    src: string;
    x: number;
    y: number;
    width: number
    height: number;
    isBad?: boolean;
};

export interface Anal {
    balance: number;
    domain: string;
    hostCount: number,
    reputation: number,
    incomeHistory: Array<number>,
};

export interface Rialto {
    name: string;
    about: string;
    price: number;
    age: number;
    work: string;
    src?: string;
    count?: number;
    domain?: string;
    topic?: string;
};

export interface Bot {
    id: number;
    x: number;
    y: number;
    xVector: number;
    yVector: number;
    isClick: boolean;
};

export type AllTypesOfBlocks = Banner | Button | Link | Logo | News;
export type GroupAllTypesOfBlocks = Banner & Button & Link & Logo & News;