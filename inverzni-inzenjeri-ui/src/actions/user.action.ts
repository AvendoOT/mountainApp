import {UserDetails} from "../models/UserDetails";
import {USER_PATHS} from "./paths";
import {UserProfileDetails} from "../models/UserProfileDetails";
import {Page} from "../models/Page";

export async function getLoggedInUserDetails(): Promise<UserDetails | null> {
    const response = await fetch(USER_PATHS.FIND_LOGGED_IN_USER_DETAILS);
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

export async function getLoggedInUserProfileDetails(): Promise<UserProfileDetails | null> {
    const response = await fetch(USER_PATHS.FIND_LOGGED_IN_USER_PROFILE_DETAILS);
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

export async function getUserProfileDetails(
    id: number
): Promise<UserProfileDetails | null> {
    const params = new URLSearchParams();
    appendParams(params, {
        id,
    });
    const response = await fetch(
        `${USER_PATHS.FIND_USER_PROFILE_DETAILS}?${params.toString()}`
    );
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

export async function getOnDutyStatus(): Promise<boolean> {
    const response = await fetch(USER_PATHS.ON_DUTY_STATUS);
    return response.json();
}

export async function sendFriendRequest(
    userId: number,
    friendId: number
): Promise<UserProfileDetails | null> {
    const params = new URLSearchParams();
    appendParams(params, {userId, friendId});
    const response = await fetch(
        `${USER_PATHS.SEND_FRIEND_REQUEST}?${params.toString()}`
    );
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

export async function makeFriends(
    firstUserId: number,
    secondUserId: number
): Promise<UserProfileDetails | null> {
    const params = new URLSearchParams();
    appendParams(params, {firstUserId, secondUserId});
    const response = await fetch(
        `${USER_PATHS.MAKE_FRIENDS}?${params.toString()}`
    );
    if (response.ok) {
        return response.json();
    } else {
        return null;
    }
}

export async function peopleFilter(
    keyWords: string,
    size: number,
    page: number
): Promise<Page<UserDetails>> {
    const params = new URLSearchParams();
    appendParams(params, {
        keyWords,
        page: page + 1,
        size: 10,
    });
    const response = await fetch(`${USER_PATHS.FILTER}?${params.toString()}`);
    return response.json();
}

const appendParams = (params: URLSearchParams, obj: Record<string, any>) => {
    Object.keys(obj).forEach((key) => params.append(key, obj[key]));
};
