import { useState } from "react";

//By placing in {name} instead of props will only take the names property
function HelloWorld(props) {
    const [count, setCount] = useState(0);

    return <><div className='card' onClick={() => setCount(count + 1 )}><div className="card-title"><b>Hello: {props.name}({count})</b></div> Your age is: {props.age}
    <div className="card-content"><HowManyDays age={props.age} /></div>
    <div className="card-action"></div>
    </div>

    </>
}

//Props drilling is just passing the props further down
function HowManyDays(props){
    return <><strong>{props.age * 365} days old</strong></>
}


export default HelloWorld