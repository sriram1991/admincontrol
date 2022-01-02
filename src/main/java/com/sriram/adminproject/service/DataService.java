package com.sriram.adminproject.service;

import com.sriram.adminproject.domain.User;
import com.sriram.adminproject.exception.BadReqException;
import com.sriram.adminproject.repository.UserRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DataService {

    private final Logger log = LoggerFactory.getLogger(DataService.class);

    @Autowired
    private UserService userService;

    private final UserRepository userRepository;

    public DataService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserWithAuthorities() {
        return userService.getUserWithAuthorities();
    }

    // User Methods
    public User getUserById(Long id, String errorKey, boolean isExceReq) {
        Optional<User> userObj = userRepository.findById(id);
        if (isExceReq && !userObj.isPresent()) throw new BadReqException(errorKey + ": " + id + " not found"); else if (
            !userObj.isPresent()
        ) return null;
        return userObj.get();
    }
}
