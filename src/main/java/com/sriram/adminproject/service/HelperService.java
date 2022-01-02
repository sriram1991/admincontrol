package com.sriram.adminproject.service;

import com.sriram.adminproject.config.Constants;
import com.sriram.adminproject.domain.User;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class HelperService {

    private final Logger log = LoggerFactory.getLogger(HelperService.class);

    public HelperService() {}

    public Map<String, Object> sendErrorResponse(String errorMsg, HttpStatus httpErrorCode) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(Constants.SUCCESS_KEY, "");
        map.put(Constants.ERROR_KEY, errorMsg);
        map.put("statusCode", httpErrorCode);
        return map;
    }

    public Map<String, Object> sendSuccessResponse(Object resp, HttpStatus httpErrorCode) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(Constants.SUCCESS_KEY, resp);
        map.put(Constants.ERROR_KEY, "");
        map.put("statusCode", httpErrorCode);
        return map;
    }

    public Map<String, Object> prepareUserDetailsForLogInPage(User user) {
        Map<String, Object> respMap = new HashMap<String, Object>();
        respMap.put("id", user.getId());
        respMap.put("login", user.getLogin());
        return respMap;
    }
}
