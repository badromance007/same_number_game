export default function Number({ number, holdNumber }) {
    return (
        <div
            className={`number ${number.isHeld && 'bg-light-green'}`}
            onClick={() => holdNumber(number.id)}
        >
            <span>{number.value}</span>
        </div>
    )
}