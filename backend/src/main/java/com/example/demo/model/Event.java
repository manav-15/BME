
package com.example.demo.model;
import java.util.*;
import java.time.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "events")


public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long eventId;
	
	@Column(name = "eventName")
	public String eventName;
	
	@Column(name = "eventOrganiser")
	public String eventOrganiser;
	
	/*@Column(name = "eventStartTime")
	public Date eventStartTime;
	
	@Column(name = "eventEndTime")
	public Date eventEndTime;*/
	
	@Column(name = "eventStartDate")
	public LocalDate eventStartDate;
	
	@Column(name = "eventEndDate")
	public LocalDate eventEndDate;
	
	@Column(name = "eventStartTime")
	public LocalTime eventStartTime;
	
	@Column(name = "eventEndTime")
	public LocalTime eventEndTime;
	
	//@Lob
	//@Column(name = "photo")
	//public byte[] photo;
	
	@Lob
	@Column(name = "imageUrl")
	public String imageUrl;

	
	public Event(long eventId, String eventName, String eventOrganiser, LocalDate eventStartDate,
			LocalDate eventEndDate, LocalTime eventStartTime, LocalTime eventEndTime, String imageUrl) {
		super();
		
		this.eventName = eventName;
		this.eventOrganiser = eventOrganiser;
		this.eventStartDate = eventStartDate;
		this.eventEndDate = eventEndDate;
		this.eventStartTime = eventStartTime;
		this.eventEndTime = eventEndTime;
		//this.photo = photo;
		this.imageUrl = imageUrl;
	}

	public Event() {
		
	}

	
	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	/*public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}*/

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}
	
	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventOrganiser() {
		return eventOrganiser;
	}

	public void setEventOrganiser(String eventOrganiser) {
		this.eventOrganiser = eventOrganiser;
	}

	public LocalDate getEventStartDate() {
		return eventStartDate;
	}

	public void setEventStartDate(LocalDate eventStartDate) {
		this.eventStartDate = eventStartDate;
	}

	public LocalDate getEventEndDate() {
		return eventEndDate;
	}

	public void setEventEndDate(LocalDate eventEndDate) {
		this.eventEndDate = eventEndDate;
	}

	public LocalTime getEventStartTime() {
		return eventStartTime;
	}

	public void setEventStartTime(LocalTime eventStartTime) {
		this.eventStartTime = eventStartTime;
	}

	public LocalTime getEventEndTime() {
		return eventEndTime;
	}

	public void setEventEndTime(LocalTime eventEndTime) {
		this.eventEndTime = eventEndTime;
	}

	/*public Event(String eventName, String eventOrganiser, Date eventStartTime, Date eventEndTime) {
		super();
		this.eventName = eventName;
		this.eventOrganiser = eventOrganiser;
		this.eventStartTime = eventStartTime;
		this.eventEndTime = eventEndTime;
		
	}

	public long getEventId() {
		return eventId;
	}

	public void setEventId(long eventId) {
		this.eventId = eventId;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public String getEventOrganiser() {
		return eventOrganiser;
	}

	public void setEventOrganiser(String eventOrganiser) {
		this.eventOrganiser = eventOrganiser;
	}

	public Date getEventStartTime() {
		return eventStartTime;
	}

	public void setEventStartTime(Date eventStartTime) {
		this.eventStartTime = eventStartTime;
	}

	public Date getEventEndTime() {
		return eventEndTime;
	}

	public void setEventEndTime(Date eventEndTime) {
		this.eventEndTime = eventEndTime;
	}*/
	
	
	
	 
	 
}
