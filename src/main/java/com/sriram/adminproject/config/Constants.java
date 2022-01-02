package com.sriram.adminproject.config;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "en";

    public static final String ERROR_KEY = "error";
    public static final String SUCCESS_KEY = "success";
    public static final String INPUT_FIELD_ERROR_MSG = " cannot be null/empty";
    public static final String CREATE_SUCCSSFUL_MSG = "Created successfully";
    public static final String LOGIN_SUCCSSFUL_MSG = "Login successfull";
    public static final String DELETE_SUCCSSFUL_MSG = "Deleted successfully";
    public static final String UPDATE_SUCCSSFUL_MSG = "Updated successfully";
    public static final String CANCEL_SUCCSSFUL_MSG = "Cancelled successfully";

    private Constants() {}
}
