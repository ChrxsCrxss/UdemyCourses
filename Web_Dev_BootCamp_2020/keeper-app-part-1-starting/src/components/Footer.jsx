import React from "react"; 

function Footer(){
    const CurrentYear = new Date().getFullYear(); 
    console.log(CurrentYear); 

    return <footer className="footer">
        <p>`Copyright @{CurrentYear}`</p>
    </footer>
}

export default Footer; 