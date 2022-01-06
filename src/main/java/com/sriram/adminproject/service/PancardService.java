package com.sriram.adminproject.service;

import com.sriram.adminproject.domain.Pancard;
import com.sriram.adminproject.domain.User;
import com.sriram.adminproject.repository.PancardRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PancardService {

    private final Logger log = LoggerFactory.getLogger(PancardService.class);

    @Autowired
    private DataService dataService;

    @Autowired
    private HelperService helperService;

    private final PancardRepository pancardRepository;

    public PancardService(PancardRepository pancardRepository) {
        this.pancardRepository = pancardRepository;
    }

    public Map<String, Object> getUserDetailsById(Long id) {
        return helperService.sendSuccessResponse(
            helperService.prepareUserDetailsForLogInPage(dataService.getUserById(id, "id", true)),
            HttpStatus.OK
        );
    }

    public Map<String, Object> getCurrentLoggedInUserDetails() {
        Optional<User> userObj = dataService.getUserWithAuthorities();
        if (!userObj.isPresent()) {
            log.info("User not logged in");
            return helperService.sendErrorResponse("User not logged in", HttpStatus.UNAUTHORIZED);
        }

        return helperService.sendSuccessResponse(helperService.prepareUserDetailsForLogInPage(userObj.get()), HttpStatus.OK);
    }

    public List<Pancard> getPancardDetailByUserId(Long id) {
        log.info("user id is :: {}", id);
        return pancardRepository.findByUserId(id);
    }

    public Map<String, Object> getPancardDetailsByCreatedBy() {
        Optional<User> userObj = dataService.getUserWithAuthorities();
        return helperService.sendSuccessResponse(dataService.getPancardDetailsByUser(userObj.get()), HttpStatus.OK);
        //        return helperService.sendSuccessResponse(pancardRepository.findAllByCreatedbyId(userObj.get().getId()), HttpStatus.OK);
    }
}
