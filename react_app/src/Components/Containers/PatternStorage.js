import React, { useEffect, useState } from "react";

const PatternStorage = (props) => {
    const [pattern, setPattern] = useState([]);
    const curPlId=props.cp[0].plantid;
    //console.log(props.cp[0].plantid,props.cp[0].plantName);

    useEffect(() => {
       // console.log("PatternStorage Working");
        const newPattern = [];
        props.plantsData.forEach((item) => {
            if (item !== undefined) {
                const newItems = item[0].plantid;
                newPattern.push(newItems);
            }
        });

        // Reorder the pattern if cp changes
        const currentIndex = newPattern.indexOf(props.cp[0].plantid);
        if (currentIndex !== -1) {
            newPattern.splice(currentIndex, 1);
            newPattern.unshift(props.cp[0].plantid);
        }

        setPattern(newPattern);
        // Store the pattern in sessionStorage
        sessionStorage.setItem('plantPattern', JSON.stringify(newPattern));
    }, [props.plantsData, curPlId]);

   // console.log(sessionStorage.getItem('plantPattern'));
//sessionStorage.clear();
    // Render your component
    return <></>;
};

export default PatternStorage;
