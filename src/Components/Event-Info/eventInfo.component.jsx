import React from 'react'

export default React.createClass({
    render(){
        return(
            <div><h1>{this.props.params.eventId}</h1></div>
        )
    }

})