import {TRIP_PATHS, USER_PATHS} from "./paths";
import {TripDTO} from "../models/TripDTO";
import {Page} from "../models/Page";

export async function getAllTrips(): Promise<TripDTO[]> {
    const response = await fetch(TRIP_PATHS.ALL_TRIPS);
    return response.json();
}

export async function getTripsAvailableForDuty(): Promise<TripDTO[]> {
    const response = await fetch(TRIP_PATHS.AVAILABLE_FOR_DUTY);
    return response.json();
}

export async function getTripsNotPendingConfirmation(): Promise<TripDTO[]> {
    const response = await fetch(TRIP_PATHS.GET_TRIPS_NOT_PENDING_CONFIRMATION);
    return response.json();
}

const appendParams = (params: URLSearchParams, obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => params.append(key, obj[key]));
};

export async function postFilter(
    minimalDuration: number,
    maximalDuration: number,
    minimalDifficulty: number,
    maximalDifficulty: number,
    minimalGrade: number,
    maximalGrade: number,
    keyWords: string,
    page: number,
    size: number
): Promise<Page<TripDTO>> {
    const params = new URLSearchParams();
    appendParams(params, {
        minimalDuration,
        maximalDuration,
        minimalDifficulty,
        maximalDifficulty,
        minimalGrade,
        maximalGrade,
        keyWords,
        page: page + 1,
        size: 10,
    });
    const response = await fetch(`${TRIP_PATHS.SEARCH}?${params.toString()}`);
    return response.json();
}

export async function getFavouriteTrips(): Promise<number[]> {
    const response = await fetch(USER_PATHS.GET_FAVOURITE_TRIPS);
    return response.json();
}

export async function addToFavourites(tripId: number): Promise<number[]> {
    const params = new URLSearchParams();
    appendParams(params, {tripId});
    const response = await fetch(
        `${USER_PATHS.ADD_TO_FAVOURITES}?${params.toString()}`
    );
    return response.json();
}

export async function removeFromFavourites(tripId: number): Promise<number[]> {
    const params = new URLSearchParams();
    appendParams(params, {tripId});
    const response = await fetch(
        `${USER_PATHS.REMOVE_FROM_FAVOURITES}?${params.toString()}`
    );
    return response.json();
}

export async function getTripById(tripId: number): Promise<TripDTO | null> {
    const params = new URLSearchParams();
    appendParams(params, {tripId});
    const response = await fetch(`${TRIP_PATHS.GET_TRIP}?${params.toString()}`);
    if (response.ok) {
        return response.json();
    }

    return null;
}

export async function getFavouriteTripsDetailed(): Promise<TripDTO[]> {
  const response = await fetch(USER_PATHS.GET_FAVOURITE_TRIPS_DETAILS);
  return response.json();
}

export async function getArchivedTrips(): Promise<TripDTO[]> {
  const response = await fetch(USER_PATHS.GET_ARCHIVED_TRIPS);
  return response.json();
}

export async function addToArchived(tripId: number): Promise<TripDTO[]> {
  const params = new URLSearchParams();
  appendParams(params, { tripId });
  const response = await fetch(
    `${USER_PATHS.ADD_TO_ARCHIVED_TRIPS}?${params.toString()}`
  );
  return response.json();
}

export async function removeFromArchived(tripId: number): Promise<TripDTO[]> {
  const params = new URLSearchParams();
  appendParams(params, { tripId });
  const response = await fetch(
    `${USER_PATHS.REMOVE_FROM_ARCHIVED_TRIPS}?${params.toString()}`
  );
  return response.json();
}

export async function getCreatedTrips(
    userId: number
): Promise<TripDTO[] | null> {
    const params = new URLSearchParams();
    appendParams(params, {userId});
    const response = await fetch(
        `${TRIP_PATHS.GET_TRIPS_CREATED_BY_USER}?${params.toString()}`
    );
    if (response.ok) {
        return response.json();
    }
    return null;
}
