export interface Email {
    name: string;
    time: string;
    text: string;
    cost: number;
    isNew: boolean;
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
    domen: string;
};

export interface Rialto {
    name: string;
    text: string;
    price: number;
    age: number;
    work: string;
    img?: string;
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