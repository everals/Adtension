import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Email, Banner, Anal, Rialto, Bot, Button, News, Logo, Link, AllTypesOfBlocks, } from '../scripts/types';

interface User {
   emails: Array<Email>
   banners: Array<AllTypesOfBlocks>
   anal: Anal,
   rialtos: Array<Rialto>,
   bots: Array<Bot>,
}

const startBanners: Array<AllTypesOfBlocks> = [
   {
      isBanner: true,
      bannerId: 0,
      color: 'rgb(65 54 213)',
      x: 0,
      y: 150,
      title: 'Скидки на электронику!',
      text: 'Лучшие предложения на смартфоны, ноутбуки и технику. Не упустите шанс сэкономить!',
      width: 300,
      height: 150,
      src: "electro-shop.ru",
      price: 17,
      owner: 'Илья Мелихов',
      fontType: 5,
   },
   {
      isBanner: true,
      isBad: true,
      bannerId: 1,
      color: 'rgb(213 54 54)',
      x: 1000,
      y: 100,
      title: 'Станьте миллионером сегодня!',
      text: 'Лучшие предложения на смартфоны, ноутбуки и технику. Не упустите шанс сэкономить!',
      width: 320,
      height: 160,
      src: "dfs1m3.fds",
      price: 2,
      owner: 'ООО "МИЛЛИОНЕРОВОРЛД"',
      fontType: 3,
   },
   {
      isButton: true,
      bannerId: 2,
      color: 'rgb(54 124 213)',
      price: 0,
      src: 'dooble-market.com',
      x: 40,
      y: 360,
      text: 'Купить матрас онлайн!',
      fontType: 2,
   },
   {
      isLogo: true,
      bannerId: 3,
      color: '#36a1d5',
      x: 0,
      y: 0,
      width: 180,
      height: 90,
      src: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
   },
   {
      isLink: true,
      bannerId: 4,
      color: 'rgb(54 124 213)',
      price: 50,
      src: 'vse-shop.pro',
      x: 1005,
      y: 300,
      text: 'Нужны майки? Кликай!',
      fontType: 8,
   },
   {
      isNews: true,
      bannerId: 5,
      x: 460,
      y: 0,
      title: 'Научные исследования доказали: Коты владеют космическими способностями!',
      text: 'Сенсационные открытия пришли из мира науки, и они безусловно удивят всех фанатов котиков. Недавно проведенные исследования, финансируемые Секретным Объединением Любителей Котов, обнаружили, что наши милые пушистые друзья обладают невероятными космическими способностями.',
      width: 410,
      height: 320,
      price: 0,
      owner: 'Илья Мелихов',
   },
   {
      isNews: true,
      bannerId: 6,
      x: 460,
      y: 340,
      title: 'Мировая катастрофа: Кофе перестал давать энергию! Виноваты кофейные зёрна-вампиры?',
      text: 'Волнение охватило всю планету, когда вчера утром миллионы людей обнаружили, что их утренний ритуал с чашкой кофе больше не приносит им необходимой энергии. Что произошло? Ученые ищут ответы, и одна теория выглядит настолько сумасшедшей, что кажется, будто она вырвалась из фантастического фильма.',
      width: 410,
      height: 340,
      price: 0,
      owner: 'Илья Мелихов',
   },
];

const initialState: User = {
   emails: [],
   banners: startBanners,
   anal: {
      balance: 100,
      domen: 'https://www.asdsad3fgsa13.xh/',
      hostCount: 10,
   },
   rialtos: [],
   bots: [],
};

const slice = createSlice({
   name: 'user',
   initialState,

   reducers: {
      setEmail(user, action: PayloadAction<Array<Email>>) {
         user.emails = action.payload;
      },
      setBanner(user, action: PayloadAction<Array<Banner>>) {
         user.banners = action.payload;
      },
      setRialto(user, action: PayloadAction<Array<Rialto>>) {
         user.rialtos = action.payload;
      },
      setBots(user, action: PayloadAction<Array<Bot>>) {
         user.bots = action.payload;
      },
      setBalance(user, action: PayloadAction<number>) {
         user.anal.balance = action.payload;
      },
      setDomen(user, action: PayloadAction<string>) {
         user.anal.domen = action.payload;
      },
   },
});

export default slice.reducer;
export const { setEmail, setBanner, setRialto, setBots, setBalance, setDomen, } = slice.actions;