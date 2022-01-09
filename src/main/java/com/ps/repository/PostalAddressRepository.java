package com.ps.repository;

import com.ps.domain.PostalAddress;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PostalAddress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostalAddressRepository extends JpaRepository<PostalAddress, Long> {}
