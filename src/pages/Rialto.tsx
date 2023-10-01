import React, { useEffect, useState, } from 'react';
import RialtoItem from "../components/RialtoItem";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Rialto as RialtoInterface } from '../scripts/types';
import { greetings, farewells, requests, names } from "../scripts/emailTemplates";
import { simpleDomains, rareDomains, unicDomains, } from "../scripts/domainTemplates";
import { newsTask, domainTask, hostingTask, designTask, } from "../scripts/rialtoTemplates";
import { setActiveTab as setActiveTabAction, setRialtos as setRialtosAction, removeRialto as removeRialtoAction, updateDomain as updateDomainAction, updateHostCount as updateHostCountAction, } from '../redux/user';

const tasks = [...newsTask, ...domainTask, ...hostingTask, ...designTask];
const domains = [...simpleDomains, ...rareDomains, ...unicDomains];

function rand(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const generatenName = () => {
    return names[Math.floor(Math.random() * names.length)];
};

const generateDomain = () => {
    return domains[Math.floor(Math.random() * domains.length)];
};

const generateRialtos = (): Array<RialtoInterface> => {
    const rialtos = [];
    for (let i = 0; i < 8; i++) {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        const isDomain = domainTask.includes(task);
        const name = generatenName();
        const work = 'src' in task ? 'Дизайнер' : 'topic' in task ? 'Копирайтер' : isDomain ? 'SEO-разработчик'  : 'WEB-программист';

        rialtos.push({
            name: name,
            price: rand(0, 100),
            age:   rand(14, 80),
            work: work,
            domain:isDomain ? generateDomain() : '',
            ...task,
        })
    }
    return rialtos;
};

function Rialto() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const rialtos = user.rialtos;
    const setRialtos = (payload: Array<RialtoInterface>) => dispatch(setRialtosAction(payload));
    const setActiveTab = (payload: number) => dispatch(setActiveTabAction(payload));
    const removeRialto = (payload: number) => dispatch(removeRialtoAction(payload));
    const updateHostCount = (payload: number) => dispatch(updateHostCountAction(payload));
    const updateDomain = (payload: string) => dispatch(updateDomainAction(payload));

    
    const handleAddBanner = (index: number) => {
        if ('count'in rialtos[index]) {
            setActiveTab(1);
            updateHostCount(rialtos[index].count || 0);
            return;
        }

        if ('domain' in rialtos[index]) {
            setActiveTab(1);
            updateDomain(rialtos[index].domain || '');
            return;
        }

        const banner = {
            ...rialtos[index],
            x: 0,
            y: 0,
            width: 300,
            height: 300,
            isNews: 'topic' in rialtos[index],
            isLogo: 'src' in rialtos[index],
        };

        // @ts-ignore
        addBanner(banner);
        removeRialto(index);
        setActiveTab(0);
    };

    useEffect(() => {
        if (rialtos.length) {
            return;
        }
        setRialtos(generateRialtos());
    }, []);

    return (
        <div className="tab">
            <div className="flex flex-wrap">
                {
                    rialtos.map((rialto, index) => (
                        <RialtoItem
                            key={index}
                            {...rialto}
                            onAdd={() => handleAddBanner(index)}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Rialto;
