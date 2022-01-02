package com.sriram.adminproject.service;

import com.sriram.adminproject.domain.Pancard;
import com.sriram.adminproject.repository.PancardRepository;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PancardService {

    private final Logger log = LoggerFactory.getLogger(PancardService.class);

    private final PancardRepository pancardRepository;

    public PancardService(PancardRepository pancardRepository) {
        this.pancardRepository = pancardRepository;
    }

    public List<Pancard> getPancardDetailByUserId(Long id) {
        log.info("user id is :: {}", id);
        return pancardRepository.findByUserId(id);
    }
}
