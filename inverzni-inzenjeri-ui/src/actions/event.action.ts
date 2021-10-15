import {EVENT_PATHS} from "./paths";
import {EventDetailsDTO} from "../models/EventDetailsDTO";

export async function getEvent(eventId: number): Promise<EventDetailsDTO> {
    const params = new URLSearchParams();
    appendParams(params, {eventId});

    const response = await fetch(`${EVENT_PATHS.GET_EVENT}?${params.toString()}`);

    return response.json();
}

const appendParams = (params: URLSearchParams, obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => params.append(key, obj[key]));
};

export async function acceptEventInvitation(eventId: number) {
    await fetch(EVENT_PATHS.ACCEPT_INVITATION, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventId),
    });
}