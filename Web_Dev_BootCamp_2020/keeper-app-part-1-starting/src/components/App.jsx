import React from "react";
import HEADER from "./Header";
import FOOTER from "./Footer";
import NOTE from "./Note"; 
import notes from "../notes"; 

// Pretty good use of ES6 arrow notation and mapping, 
// Remember: the value of each prop field must be wrapped in curly braces 

function App() {
    return <div>
    <HEADER/>
    { notes.map(note => <NOTE
    key={note.key}
    title={note.title}
    content={note.content}
    />) }
    <FOOTER/>
    </div>
}

export default App; 