import {USER_PATHS} from "./paths";
import {TripResponseDTO} from "../models/TripResponseDTO";
import {EventResponseDTO} from "../models/EventResponseDTO";
import {BadgeResponseDTO} from "../models/BadgeResponseDTO";

export async function getTrips(): Promise<TripResponseDTO[]> {
    const response = await fetch(USER_PATHS.GET_FRIEND_TRIPS);
    return response.json();
}

export async function getEvents(): Promise<EventResponseDTO[]> {
    const response = await fetch(USER_PATHS.GET_FRIEND_EVENT);
    return response.json();
}

export async function getBadges(): Promise<BadgeResponseDTO[]> {
    const response = await fetch(USER_PATHS.GET_FRIEND_BADGES);
    return response.json();
}