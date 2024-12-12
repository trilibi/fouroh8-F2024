export default function Avatar({object}) {
    console.log(object);
    return <div className="other-avatar">
        {object.name}
    </div>
}