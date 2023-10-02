import { Rialto as RialtoInterface, Banner as BannerInterface, } from './types';
import { greetings, farewells, requests, names } from "./emailTemplates";
import { simpleDomains, rareDomains, unicDomains, } from "./domainTemplates";
import { newsTask, domainTask, hostingTask, designTask, imageTasks, videoTasks, smmTasks, } from "./rialtoTemplates";

const tasks = [...newsTask, ...domainTask, ...hostingTask, ...designTask, ...imageTasks, ...videoTasks, ...smmTasks, ];
const domains = [...simpleDomains, ...rareDomains, ...unicDomains];

export function rand(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

export const generatenName = () => {
    return names[Math.floor(Math.random() * names.length)];
};

export const generateDomain = () => {
    return domains[Math.floor(Math.random() * domains.length)];
};

export const generateRialtos = (): Array<RialtoInterface> => {
    const rialtos = [];
    for (let i = 0; i < 8; i++) {
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        const isDomain = domainTask.includes(task);
        const isDesigner = designTask.some(t => t === task);
        const isVideo = videoTasks.some(t => t === task);
        const isSmm = smmTasks.some(t => t === task);
        const isCopywiter = 'topic' in task;
        const name = generatenName();
        const work =
            isDesigner ? 'Дизайнер'
            : isVideo ? 'Видео монтажер'
            : isSmm ? 'SMM-мастер'
            : isCopywiter ? 'Копирайтер'
            : isDomain ? 'SEO-разработчик' 
            : 'WEB-программист';

        rialtos.push({
            name: name,
            price: rand(0, 100),
            age:   rand(14, 80),
            work: work,
            domain: isDomain ? generateDomain() : '',
            ...task,
        })
    }
    return rialtos;
};