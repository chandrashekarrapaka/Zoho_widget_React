import React, { useState } from "react";
import './Header.css';

function Header(props) {
const [optionChoose,setOptionChoose]=useState();
    
    function handleSelectChange(e){
        setOptionChoose(e.target.value);
    }
    
    return (
        <div className="nav">
        <form className="formSP">
            <label>
                Select Plant: 
            </label>
            <select value={optionChoose} onChange={handleSelectChange} className="options">
                { props.options.map((ele)=>
            <option value={ele}>{ele}</option>
                )}
            </select>
        </form>
        </div>

    );
}
export default Header;