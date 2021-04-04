import axios from 'axios';
import React, { Component } from 'react';
import './createEvent.styles.scss'

class createEventForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            eventName : '',
            selectedFile: null,
            imageUrl:''
        };
        this.onChangeEventName=this.onChangeEventName.bind(this);
        // this.onFileChange=this.onFileChange.bind(this);
        // this.onFileUpload=this.onFileUpload(this);

    }
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    onFileChange = event => {
    
        // Update the state
        this.getBase64(event.target.files[0]).then(
            data => {
            this.setState( {selectedFile:event.target.files[0] ,imageUrl: data });
            }
        );  

              
      };
    
    // onFileUpload = () => {
    //     this.getBase64(this.selectedFile).then(
    //         data => {
    //         this.setState( {imageUrl: data });
    //         }
    //     );
        
    // };

    onChangeEventName = event => {
    
        // Update the state
        this.setState({ eventName: event.target.value });
      
      };
      
      saveEvent = (e) =>{
        
        e.preventDefault();
        let event = {eventName:this.state.eventName,imageUrl:this.state.imageUrl};
        console.log(event);
        axios.post("http://localhost:8080/api/v1/events",event).then(() => window.location.href='/add-event');

      };

      cancel(){
          this.props.history('/add-event');
      }

    render() {
        return (
            <div className="container">
                <div className="roow">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center" > Add Your Event</h3>
                    <div className="card-body">
                        <form >
                            <div className="form-group">
                                <label > Event Name: </label>
                                <input placeholder="Event Name" name="firstName" className="form-control" 
                                value={this.state.eventName} onChange={this.onChangeEventName}/> <br/>
                                <label > Event Poster: </label><br/>
                                <input placeholder="Event Poster" className="form-control"   type="file" onChange={this.onFileChange} />
                                {/* <button className="btn btn-primary" onClick={this.onFileUpload}>
                                Upload!
                                </button> */}
                                <br/><br/> 
                                <button className="btn btn-success" onClick={this.saveEvent}>Post Event</button>&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>

            </div>
        );
    }
}


export default createEventForm;