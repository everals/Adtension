import React from "react";
import { Email as EmailInterface } from '../scripts/types';

interface EmailItemProps extends EmailInterface {}

const EmailItem: React.FC<EmailItemProps> = ({ name, time, text, cost, isNew, }) => {
    return (
        <div className="bg-gray-200 p-4 rounded mb-4 flex flex-wrap items-center">
            <div className="w-2/12 font-semibold flex items-center">
                {
                    <div className={`w-3 h-3 mr-2 rounded-full ${ isNew ? 'bg-green-500' : ''}`}/>
                }
                { name }
            </div>
            <div className="w-8/12" dangerouslySetInnerHTML={{__html: text}} />
            <div className="w-1/12 text-green-600 font-bold">
                { cost } $
            </div>
            <div className="w-1/12 text-gray-500 text-sm">
                { time }
            </div>
        </div>
    );
};

export default EmailItem;
