package com.sriram.adminproject.repository;

import com.sriram.adminproject.domain.Pancard;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Pancard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PancardRepository extends JpaRepository<Pancard, Long> {
    @Query("select pancard from Pancard pancard where pancard.user.login = ?#{principal.username}")
    List<Pancard> findByUserIsCurrentUser();
}
