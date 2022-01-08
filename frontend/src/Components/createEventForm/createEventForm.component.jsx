import axios from 'axios';
import React, { Component } from 'react';
import './createEvent.styles.scss'

class createEventForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            eventName : '',
            eventOrganizer: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            selectedFile: null,
            imageUrl:''
        };
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeEventOrganizer = this.onChangeEventOrganizer.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndDate =  this.onChangeEndDate.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);

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
        //console.log(event.target.files[0].size)
        this.getBase64(event.target.files[0]).then(
            data => {
                
                this.setState( {
                    selectedFile:event.target.files[0] ,
                    imageUrl: data 
                });
            }
        );  
         
      };
    

    onChangeEventName = event => {
        // Update the state
        this.setState({ eventName: event.target.value });
    };

    onChangeEventOrganizer = event => {
        // Update the state
        this.setState({ eventOrganizer: event.target.value });
    };

    onChangeStartDate = event => {
        // Update the state
        //console.log(event.target.value);
        this.setState({ startDate: event.target.value });
    };

    onChangeStartTime = event => {
        // Update the state
        //console.log(event.target.value);
        this.setState({ startTime: event.target.value });
    };
      
    onChangeEndDate = event => {
        // Update the state
        this.setState({ endDate: event.target.value });
    };

    onChangeEndTime = event => {
        // Update the state
        this.setState({ endTime: event.target.value });
    };

    saveEvent = (e) =>{
        
        e.preventDefault();
        let event = {
            eventName:this.state.eventName,
            eventOrganizer: this.state.eventOrganizer,
            startDate: this.state.startDate,
            startTime: this.state.startTime,
            endDate: this.state.endDate,
            endTime: this.state.endTime,
            imageUrl:this.state.imageUrl
            };
        console.log(event);
        axios.post("http://localhost:4040/events/new",event,{withCredentials:true})
        .then(res => {
            window.alert("Event added successfully!!! :)");
            window.location.href='/add-event'
        })
        .catch(e => {
            window.alert("Error encontered! :(");
            console.log(e);
        });

    };

    cancel(){
        this.props.history('/add-event');
    }

    render() {
        return (
            <div className="container">
                <h3 className="text-center" > Add Your Event</h3><br/>
                <div className="row justify-content-md-center">
                <div className="col-sm"></div>
                <div className="col-md-auto  ">
                    
                    {/* <div className="card-body overflow-auto"> */}
                        <form >
                            <div className="form-group text-center">
                                <label > Event Name: </label>
                                <input placeholder="Event Name" name="firstName" className="form-control" 
                                value={this.state.eventName} onChange={this.onChangeEventName}/> <br/>

                                <label > Event Organizer: </label>
                                <input placeholder="Event Organizer" name="firstName" className="form-control" 
                                value={this.state.eventOrganizer} onChange={this.onChangeEventOrganizer}/> <br/>

                                <label>Event Start Date: </label>
                                <input type="date" className="form-control" value={this.state.startDate} onChange={this.onChangeStartDate} /> <br/>
                                
                            
                                <label>Event Start Time: </label>
                                <input type="time" className="form-control" step="1" value={this.state.startTime} onChange={this.onChangeStartTime} /><br/>

                                <label>Event End Date: </label>
                                <input type="date" className="form-control" value={this.state.endDate} onChange={this.onChangeEndDate} /><br/>

                                <label>Event End Time: </label>
                                <input type="time" className="form-control" step="1" value={this.state.endTime} onChange={this.onChangeEndTime} /><br/>

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
                    {/* </div> */}
                </div>
                <div className="col-sm"></div>
                </div>

            </div>
        );
    }
}


export default createEventForm;