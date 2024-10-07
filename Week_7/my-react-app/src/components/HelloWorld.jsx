
//By placing in {name} instead of props will only take the names property
function HelloWorld(props) {
    return <><div>Hello: {props.name}. Your age is: {props.age}</div>
    <div><HowManyDays days={props.days} /></div></>
}

//Props drilling is just passing the props further down
function HowManyDays(props){
    return <><strong>{props.days} days old</strong></>
}

export default HelloWorld