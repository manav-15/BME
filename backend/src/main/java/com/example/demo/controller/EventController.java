package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class EventController {

	@Autowired
	private EventRepository eventRepository;
	
	// get all events
	@GetMapping("/events")
	public List<Event> getAllEvents(){
		return eventRepository.findAll();
	}
	
	
	//get by id
	@GetMapping("/events/{id}")
	public Event getEventByID(@PathVariable Long id) {
		Event event = eventRepository.findById(id)
				.orElseThrow( () -> new ResourceNotFoundException("Event does not exist with id :" + id));
		return event;
	}
	
	//post
	@PostMapping("/events")
	public Event createEvent(@RequestBody Event event) {
		return eventRepository.save(event);
	}
	
	
	//update event api
	@PutMapping("/events/{id}")
	public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails){
		Event event = eventRepository.findById(id)
				.orElseThrow( () -> new ResourceNotFoundException("Event does not exist with id :" + id));
		event.setEventName(eventDetails.getEventName());
		event.setEventOrganiser(eventDetails.getEventOrganiser());
		event.setEventStartDate(eventDetails.getEventStartDate());
		event.setEventStartTime(eventDetails.getEventStartTime());
		event.setEventEndDate(eventDetails.getEventEndDate());
		event.setEventEndTime(eventDetails.getEventEndTime());
		event.setImageUrl(eventDetails.getImageUrl());
		
		Event updatedEvent = eventRepository.save(event);
		return ResponseEntity.ok(updatedEvent);
		
	}
	
	
	//delete event
	@DeleteMapping("/events/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable Long id){
		Event event = eventRepository.findById(id)
				.orElseThrow( () -> new ResourceNotFoundException("Event does not exist with id :" + id));
		eventRepository.delete(event);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
