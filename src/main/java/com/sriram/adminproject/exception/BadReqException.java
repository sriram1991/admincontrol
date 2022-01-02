package com.sriram.adminproject.exception;

@SuppressWarnings("serial")
public class BadReqException extends RuntimeException {

    public BadReqException(String msg) {
        super(msg);
    }
}
