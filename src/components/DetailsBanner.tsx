import React, { useState } from 'react';
import { AllTypesOfBlocks } from '../scripts/types';
import { setBalance as setBalanceAction, setIsBottonBannerHiden, } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

interface DetailsBannerProps {}

const DetailsBanner: React.FC<DetailsBannerProps> = ({}) => {
    const dispatch = useDispatch();
    const balance = useSelector((state: RootState) => state.user.anal.balance);
    const isBottonBannerHiden = useSelector((state: RootState) => state.user.isBottonBannerHiden);
    const setBalance = (payload: number) => dispatch(setBalanceAction(payload));

    const deleteModal = () => {
        setBalance(balance - 50);
        dispatch(setIsBottonBannerHiden(true));
    };

    if (isBottonBannerHiden) {
        return null;
    }

    return (
        <div
            className="fixed bottom-0 inset-x-0 p-6 bg-gray-200 flex items-center z-50 justify-center"
            style={{
                boxShadow: '0px 0px 10px 4px rgba(0, 0, 0, 0.2)',
            }}
        >
            <p className="mr-14">
                Сайт сделан с помощтю платформы www.make-site.pro! Заходите к нам, если хотите сделать шедевр!
            </p>
            <div>
                {
                    balance > 50 ?
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                        onClick={deleteModal}
                    >
                        Удалить плашку за 50 $
                    </button>
                    :
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-full ml-4 cursor-not-allowed"
                        disabled
                    >
                        Удалить плашку за 50 $
                    </button>
                }
            </div>
        </div>
    );
};

export default DetailsBanner;
