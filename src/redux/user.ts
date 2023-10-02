import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Email, Banner, Anal, Rialto, Bot, Button, News, Logo, Link, AllTypesOfBlocks, } from '../scripts/types';

interface User {
   lastBannerId: number,
   activeTab: number,
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
      x: 60,
      y: 150,
      title: 'Скидки на электронику!',
      text: 'Лучшие предложения на смартфоны, ноутбуки и технику. Не упустите шанс сэкономить!',
      width: 300,
      height: 150,
      src: "electro-shop.ru",
      price: 4,
      owner: 'Илья Мелихов',
      fontType: 5,
      isSet: true,
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
      isSet: true,
   },
   {
      isButton: true,
      bannerId: 2,
      color: 'rgb(54 124 213)',
      price: 0,
      src: 'dooble-market.com',
      x: 130,
      y: 360,
      text: 'Купить матрас онлайн!',
      fontType: 2,
      isSet: true,
   },
   {
      isLogo: true,
      bannerId: 3,
      color: '#36a1d5',
      x: 10,
      y: 10,
      width: 180,
      height: 90,
      src: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
      isSet: true,
   },
   {
      isLink: true,
      bannerId: 4,
      color: 'rgb(54 124 213)',
      price: 6,
      src: 'vse-shop.pro',
      x: 1005,
      y: 300,
      text: 'Нужны майки? Кликай!',
      fontType: 8,
      isSet: true,
   },
   {
      isNews: true,
      bannerId: 5,
      x: 460,
      y: 40,
      title: 'Научные исследования доказали: Коты владеют космическими способностями!',
      text: 'Сенсационные открытия пришли из мира науки, и они безусловно удивят всех фанатов котиков. Недавно проведенные исследования, финансируемые Секретным Объединением Любителей Котов, обнаружили, что наши милые пушистые друзья обладают невероятными космическими способностями.',
      width: 410,
      height: 320,
      price: 0,
      owner: 'Илья Мелихов',
      isSet: true,
   },
   {
      isNews: true,
      bannerId: 6,
      x: 460,
      y: 400,
      title: 'Мировая катастрофа: Кофе перестал давать энергию! Виноваты кофейные зёрна-вампиры?',
      text: 'Волнение охватило всю планету, когда вчера утром миллионы людей обнаружили, что их утренний ритуал с чашкой кофе больше не приносит им необходимой энергии. Что произошло? Ученые ищут ответы, и одна теория выглядит настолько сумасшедшей, что кажется, будто она вырвалась из фантастического фильма.',
      width: 410,
      height: 340,
      price: 0,
      owner: 'Илья Мелихов',
      isSet: true,
   },
];

const initialState: User = {
   lastBannerId: 7,
   activeTab: 0,
   emails: [],
   banners: startBanners,
   anal: {
      incomeHistory: [12, 10, 3, 1, 1, 4, 2.8, 3.3, 1, 0, 2.1, 0, 3.1 ],
      balance: 50,
      reputation: 50,
      domain: 'https://www.asdsad3fgsa13.xh/',
      hostCount: 8,
   },
   rialtos: [],
   bots: [],
};

const slice = createSlice({
   name: 'user',
   initialState,

   reducers: {
      addIncomeHistory(user, action: PayloadAction<number>) {
         user.anal.incomeHistory.push(action.payload);
         if (user.anal.incomeHistory.length > 14) {
            user.anal.incomeHistory = user.anal.incomeHistory.slice(1);
         }
      },
      setActiveTab(user, action: PayloadAction<number>) {
         user.activeTab = action.payload;
      },
      setEmail(user, action: PayloadAction<Array<Email>>) {
         user.emails = action.payload;
      },
      addEmail(user, action: PayloadAction<Email>) {
         user.emails.push(action.payload);
      },
      updateEmailDisable(user, action: PayloadAction<{ index: number, value: boolean }>) {
         user.emails[action.payload.index].isDisable = action.payload.value;
      },
      updateEmailIsNew(user, action: PayloadAction<{ index: number, value: boolean }>) {
         user.emails[action.payload.index].isNew = action.payload.value;
      },
      updateDomain(user, action: PayloadAction<string>) {
         user.anal.domain = action.payload;
      },
      updateHostCount(user, action: PayloadAction<number>) {
         user.anal.hostCount = action.payload;
      },
      setBanner(user, action: PayloadAction<Array<Banner>>) {
         user.banners = action.payload;
      },
      updateBannerX(user, action: PayloadAction<{ index: number, value: number }>) {
         user.banners[action.payload.index].x = action.payload.value;
      },
      updateBannerY(user, action: PayloadAction<{ index: number, value: number }>) {
         user.banners[action.payload.index].y = action.payload.value;
      },
      updateBannerWidth(user, action: PayloadAction<{ index: number, value: number }>) {
         if ('width' in user.banners[action.payload.index]) {
            // @ts-ignore
            user.banners[action.payload.index].width = action.payload.value;
         }
      },
      updateBannerHeight(user, action: PayloadAction<{ index: number, value: number }>) {
         if ('height' in user.banners[action.payload.index]) {
            // @ts-ignore
            user.banners[action.payload.index].height = action.payload.value;
         }
      },
      updateBannerSet(user, action: PayloadAction<{ index: number, value: boolean }>) {
         user.banners[action.payload.index].isSet = action.payload.value;
      },
      addBanner(user, action: PayloadAction<Banner>) {
         user.banners.push({
            ...action.payload,
            bannerId: user.lastBannerId++,
         });
      },
      setRialtos(user, action: PayloadAction<Array<Rialto>>) {
         user.rialtos = action.payload;
      },
      removeRialto(user, action: PayloadAction<number>) {
         //
      },
      setBots(user, action: PayloadAction<Array<Bot>>) {
         user.bots = action.payload;
      },
      setBalance(user, action: PayloadAction<number>) {
         user.anal.balance = action.payload;
      },
      chagneBalance(user, action: PayloadAction<number>) {
         user.anal.balance += action.payload;
      },
      setReputation(user, action: PayloadAction<number>) {
         user.anal.reputation = action.payload;
      },
      setDomain(user, action: PayloadAction<string>) {
         user.anal.domain = action.payload;
      },
   },
});

export default slice.reducer;
export const {
   addIncomeHistory,
   setActiveTab,
   setEmail,
   addEmail,
   setBanner,
   addBanner,
   setRialtos,
   removeRialto,
   setBots,
   setBalance,
   chagneBalance,
   setReputation,
   setDomain,
   updateEmailDisable,
   updateEmailIsNew,
   updateDomain,
   updateHostCount,
   updateBannerX,
   updateBannerY,
   updateBannerSet,
   updateBannerWidth,
   updateBannerHeight,
} = slice.actions;