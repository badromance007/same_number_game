import { Component } from "react";

export default class Number extends Component {
    render() {
        return (
            <div
                className={`number ${this.props.number.isHeld && 'bg-light-green'}`}
                onClick={() => this.props.holdNumber(this.props.number.id)}
            >
                <span>{this.props.number.value}</span>
            </div>
        )
    }
}