package com.ps.repository;

import com.ps.domain.PartyType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PartyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartyTypeRepository extends JpaRepository<PartyType, Long> {}
