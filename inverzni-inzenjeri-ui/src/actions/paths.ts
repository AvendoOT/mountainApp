export const USER_PATHS = {
    REGISTER_USER: "/api/register",
    FIND_LOGGED_IN_USER_DETAILS: "/api/user",
    FIND_USER_PROFILE_DETAILS: "/api/user/profile/",
    GET_USER_REPORTS: "/api/user/reports",
    FIND_LOGGED_IN_USER_PROFILE_DETAILS: "/api/user/myProfile",
    SEND_FRIEND_REQUEST: "/api/user/addPendingFriend/",
    MAKE_FRIENDS: "/api/user/makeFriends/",
    FILTER: "/api/user/filter",
    GET_FAVOURITE_TRIPS: "/api/user/getFavouriteTrips",
    ADD_TO_FAVOURITES: "/api/user/addToFavourites",
    REMOVE_FROM_FAVOURITES: "/api/user/removeFromFavourites",
    GET_FAVOURITE_TRIPS_DETAILS: "/api/user/getFavouriteTripsDetailed",
    ON_DUTY_STATUS: "/api/user/onDutyStatus",
    GET_FRIEND_TRIPS: "/api/user/getTrips",
    GET_FRIEND_EVENT: "/api/user/getEvents",
    GET_FRIEND_BADGES: "/api/user/getBadges",
    ADD_TO_ARCHIVED_TRIPS: "/api/user/addToArchivedTrips/",
    REMOVE_FROM_ARCHIVED_TRIPS: "/api/user/removeFromArchivedTrips/",
    GET_ARCHIVED_TRIPS: "/api/user/getArchivedTrips",
};

export const AUTHENTICATION_PATHS = {
    LOGIN_USER: "/api/login",
    LOGOUT_USER: "/api/logout",
};

export const TRIP_PATHS = {
    ALL_TRIPS: "/api/trips",
    SEARCH: "/api/trips/search/",
    CREATE_TRIP: "/api/trips/createTrip",
    GET_TRIP: "/api/trips/get/",
    AVAILABLE_FOR_DUTY: "/api/trips/availableForDuty",
    GET_ERROR_REPORTS_BY_TRIP_ID: "/api/trips/errorReports/",
    GET_TRIPS_CREATED_BY_USER: "api/trips/getCreatedByUser/",
    GET_TRIPS_NOT_PENDING_CONFIRMATION: "/api/trips/getNotPendingConfirmation",
    EDIT_TRIP: "/api/trips/editTrip",
};

export const REPORT_PATHS = {
    CREATE_ERROR_REPORT: "/api/trips/errorReport",
    REMOVE_ERROR_REPORT: "/api/user/removeReport",
};

export const GRADE_PATHS = {
    ADD_GRADE: "/api/trips/gradeTrip",
    GET_GRADES: "/api/trips/getGrades",
    GET_REVIEWERS: "/api/trips/getReviewers",
};

export const NOTIFICATION_PATHS = {
    RECEIVE_MESSAGES: "/api/topic/messages/",
    GET_NOTIFICATIONS: "/api/notification",
    WEBSOCKET_URL_FOR_STOMP_CLIENT_LOCAL_TESTING: "ws://inverzni-inzenjeri-frontend.herokuapp.com/api/ws",
    GET_CHAT: "/api/chat/",
    GET_CHAT_DETAILS: "/api/chat/details/",
    GET_CONVERSATIONS: "/api/inbox/",
    CONVERSATIONS_TOPIC: "/api/topic/inbox/",
    NOTIFICATION_TOPIC: "/api/topic/notification/",
    SET_MESSAGE_SEEN: "/api/notification/setMessageSeen/",
    COUNT_UNSEEN_MESSAGES: "/api/notification/countUnseenMessages",
    SET_CONVERSATION_STATUS: "/api/chat/conversation",
    MESSAGES_TOPIC: "/api/topic/messages/",
    CHAT_CONVERSATION_STATUS_TOPIC: "/api/topic/chat/conversationStatus/",
    INBOX_CONVERSATION_STATUS_TOPIC: "/api/topic/inbox/conversationStatus/",
    CHAT_SEND_FILE: "/api/chat/file",
};

export const EVENT_PATHS = {
    CREATE_EVENT: "/api/events/create",
    GET_EVENT: "/api/events/get/",
    ACCEPT_INVITATION: "/api/events/accept",
};

export const ON_DUTY_PATHS = {
    ON_DUTY_SIGNUP: "/api/request/send",
    ON_DUTY_GET_REQUESTS: "/api/request/get",
    ON_DUTY_REQUEST_ACCEPT: "/api/request/accept",
};

export const CONFIRM_TRIP_PATHS = {
    SEND_REQUEST: "/api/tripRequest/send",
    CONFIRM_TRIP_GET_REQUESTS: "/api/tripRequest/get",
    CONFIRM_TRIP_REQUEST_ACCEPT: "/api/tripRequest/accept",
};
