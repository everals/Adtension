import React from 'react';
import EmailItem from "../components/EmailItem";

const emails = [
    {
        name: "John Doe",
        time: "2 hours ago",
        text: "Hello, how are you?",
        cost: 27,
        isNew: true,
    },
    {
        name: "Pes",
        time: "4 hours ago",
        text: "WTF, DUDE?",
        cost: 12,
    },
];

function Email() {
    return (
        <div className="tab">
            <div>
                {
                    emails.map((email, index) => (
                        <EmailItem
                            key={index}
                            {...email}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Email;
