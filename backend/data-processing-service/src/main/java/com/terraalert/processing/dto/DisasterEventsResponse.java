package com.terraalert.processing.dto;

import java.util.List;

public class DisasterEventsResponse {

    private List<DisasterEventResponse> events;

    public DisasterEventsResponse() {
    }

    public DisasterEventsResponse(
            List<DisasterEventResponse> events) {

        this.events = events;
    }

    public List<DisasterEventResponse> getEvents() {
        return events;
    }

    public void setEvents(
            List<DisasterEventResponse> events) {

        this.events = events;
    }
}