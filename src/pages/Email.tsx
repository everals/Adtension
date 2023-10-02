import React, { useState, useEffect, } from 'react';
import EmailItem from "../components/EmailItem";
import { greetings, farewells, requests, names } from "../scripts/emailTemplates";
import { bannerList, badBannerList } from "../scripts/bannerTemplates";
import { Email as EmailInterface, Banner as BannerInterface, Anal, Rialto, Bot, AllTypesOfBlocks, } from '../scripts/types';
import { setActiveTab as setActiveTabAction, setEmail as setEmailAction, addBanner as addBannerAction, updateEmailDisable, updateEmailIsNew, removeEmail as removeEmailAction, chagneBalance as chagneBalanceAction, } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

function rand(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

function Email() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const emails = user.emails;
    const setEmails = (payload: Array<EmailInterface>) => dispatch(setEmailAction(payload));
    const [openEmail , setOpenEmail] = useState<null | number>(null);
    const addBanner = (payload: AllTypesOfBlocks) => dispatch(addBannerAction(payload));
    const removeEmail = (payload: number) => dispatch(removeEmailAction(payload));
    const setActiveTab = (payload: number) => dispatch(setActiveTabAction(payload));
    const chagneBalance = (payload: number) => dispatch(chagneBalanceAction(payload));

    const handleClick = (index: number) => {
        setOpenEmail(openEmail === index ? null : index)

        dispatch(updateEmailIsNew({
            index: emails.length - 1 - index,
            value: false,
        }));
    };

    const generateColor = () => {
        const v1 = rand(54, 213);
        const v2 = (Math.random() < 0.5) ? 213 : 54;
        const v3 = (Math.random() < 0.5) ? 213 : 54;
        switch(rand(1, 6)) {
            case 1:
                return `rgb(${v1}, ${v2}, ${v3})`;
            case 2:
                return `rgb(${v1}, ${v3}, ${v2})`;
            case 3:
                return `rgb(${v2}, ${v1}, ${v3})`;
            case 4:
                return `rgb(${v2}, ${v3}, ${v1})`;
            case 5:
                return `rgb(${v3}, ${v1}, ${v2})`;
            case 6:
                return `rgb(${v3}, ${v2}, ${v1})`;
            default:
                return `rgb(213, 54, 54)`;
        }
    };

    const handleRemoveEmail = (index: number) => {
        removeEmail(emails.length - 1 - index);
    };

    const handleAddBanner = (index: number) => {
        const email = emails[emails.length - 1 - index];

        dispatch(updateEmailDisable({
            index: emails.length - 1 - index,
            value: true,
        }));

        if (email.price > 0) {
            chagneBalance(rand(-10, -1));
            setActiveTab(1);
            return;
        }

        addBanner({
            ...email,
            // @ts-ignore
            isBanner: email.type === 1,
            isButton: email.type === 2,
            isLink: email.type === 3,
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            color: generateColor(),
            isSet: false,
        });

        setActiveTab(0);
    };

    return (
        <div className="tab px-12 mt-8">
            <div>
                {
                    !emails.length ?
                    <div className="text-xl font-semibold mb-6">
                        Нет новых писем
                    </div>
                    :
                    null
                }
                {
                    [...emails].reverse().map((email, index) => (
                        <EmailItem
                            key={index}
                            {...email}
                            isOpen={openEmail === index}
                            onClick={() => handleClick(index)}
                            onAdd={() => handleAddBanner(index)}
                            onRemove={() => handleRemoveEmail(index)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Email;
