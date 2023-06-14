import React, { useState } from "react";
import './Header.css';

function Header(props) {
    const [optionChoose,setOptionChoose]=useState();
    
    return (
        <div className="nav">
        <form className="formSP">
            <label>
                Select Plant: 
            </label>
            <select value={optionChoose} onChange={props.handleSelectChange} className="options">
                { props.options.map((ele)=>
            <option value={ele}>{ele}</option>
                )}
            </select>
        </form>
        </div>

    );
}
export default Header;