import React from "react";

export class FlagButton extends React.Component {
    
    flag = false;

    render() {
        return (
            <button onClick = {this.handleClick}> Flag  </button>
        )
    }

    handleClick() {
        this.flag = !this.flag
    }
}
