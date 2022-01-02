package com.sriram.adminproject.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GloablRestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ BadReqException.class })
    public ResponseEntity<Object> handleBadRequestException(Exception ex, WebRequest request) {
        return new ResponseEntity<Object>(prepareErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
    }

    public Map<String, Object> prepareErrorResponse(String errorMsg, int statusCode) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", "");
        map.put("error", errorMsg);
        map.put("statusCode", statusCode);
        return map;
    }
}
