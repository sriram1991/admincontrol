package com.sriram.adminproject.repository;

import com.sriram.adminproject.domain.Pancard;
import com.sriram.adminproject.domain.User;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Pancard entity.
 */
@Repository
public interface PancardRepository extends JpaRepository<Pancard, Long> {
    @Query("select pancard from Pancard pancard where pancard.user.login = ?#{principal.username}")
    Page<Pancard> findByUserIsCurrentUser(Pageable pageable);

    List<Pancard> findByUserId(Long user_id);

    List<Pancard> findAllByCreatedby(User createdBy);
    // List<Pancard> findByCreatedbyId(Long createdbyId);

}
