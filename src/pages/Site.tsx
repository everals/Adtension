import React from 'react';
import Banner from "../components/Banner";

function Site() {
    return (
        <div className="tab relative">
            <Banner
                color="#000"
                left={100}
                top={100}
                title="My Banner"
                text="This is a banner component."
                initialWidth={300}
                initialHeight={300}
            />
        </div>
    );
}

export default Site;
