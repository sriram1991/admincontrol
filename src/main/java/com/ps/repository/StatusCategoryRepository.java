package com.ps.repository;

import com.ps.domain.StatusCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the StatusCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatusCategoryRepository extends JpaRepository<StatusCategory, Long> {}
