export default function board({object}) {
    console.log(object);
    return <div className="other-avatar">
        {object.name}
    </div>
}