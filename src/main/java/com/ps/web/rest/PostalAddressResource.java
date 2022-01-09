package com.ps.web.rest;

import com.ps.domain.PostalAddress;
import com.ps.repository.PostalAddressRepository;
import com.ps.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ps.domain.PostalAddress}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PostalAddressResource {

    private final Logger log = LoggerFactory.getLogger(PostalAddressResource.class);

    private static final String ENTITY_NAME = "postalAddress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PostalAddressRepository postalAddressRepository;

    public PostalAddressResource(PostalAddressRepository postalAddressRepository) {
        this.postalAddressRepository = postalAddressRepository;
    }

    /**
     * {@code POST  /postal-addresses} : Create a new postalAddress.
     *
     * @param postalAddress the postalAddress to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new postalAddress, or with status {@code 400 (Bad Request)} if the postalAddress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/postal-addresses")
    public ResponseEntity<PostalAddress> createPostalAddress(@Valid @RequestBody PostalAddress postalAddress) throws URISyntaxException {
        log.debug("REST request to save PostalAddress : {}", postalAddress);
        if (postalAddress.getId() != null) {
            throw new BadRequestAlertException("A new postalAddress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PostalAddress result = postalAddressRepository.save(postalAddress);
        return ResponseEntity
            .created(new URI("/api/postal-addresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /postal-addresses/:id} : Updates an existing postalAddress.
     *
     * @param id the id of the postalAddress to save.
     * @param postalAddress the postalAddress to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated postalAddress,
     * or with status {@code 400 (Bad Request)} if the postalAddress is not valid,
     * or with status {@code 500 (Internal Server Error)} if the postalAddress couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/postal-addresses/{id}")
    public ResponseEntity<PostalAddress> updatePostalAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PostalAddress postalAddress
    ) throws URISyntaxException {
        log.debug("REST request to update PostalAddress : {}, {}", id, postalAddress);
        if (postalAddress.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, postalAddress.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!postalAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PostalAddress result = postalAddressRepository.save(postalAddress);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, postalAddress.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /postal-addresses/:id} : Partial updates given fields of an existing postalAddress, field will ignore if it is null
     *
     * @param id the id of the postalAddress to save.
     * @param postalAddress the postalAddress to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated postalAddress,
     * or with status {@code 400 (Bad Request)} if the postalAddress is not valid,
     * or with status {@code 404 (Not Found)} if the postalAddress is not found,
     * or with status {@code 500 (Internal Server Error)} if the postalAddress couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/postal-addresses/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PostalAddress> partialUpdatePostalAddress(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PostalAddress postalAddress
    ) throws URISyntaxException {
        log.debug("REST request to partial update PostalAddress partially : {}, {}", id, postalAddress);
        if (postalAddress.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, postalAddress.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!postalAddressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PostalAddress> result = postalAddressRepository
            .findById(postalAddress.getId())
            .map(existingPostalAddress -> {
                if (postalAddress.getToName() != null) {
                    existingPostalAddress.setToName(postalAddress.getToName());
                }
                if (postalAddress.getAddress1() != null) {
                    existingPostalAddress.setAddress1(postalAddress.getAddress1());
                }
                if (postalAddress.getAddress2() != null) {
                    existingPostalAddress.setAddress2(postalAddress.getAddress2());
                }
                if (postalAddress.getCity() != null) {
                    existingPostalAddress.setCity(postalAddress.getCity());
                }
                if (postalAddress.getLandmark() != null) {
                    existingPostalAddress.setLandmark(postalAddress.getLandmark());
                }
                if (postalAddress.getPostalCode() != null) {
                    existingPostalAddress.setPostalCode(postalAddress.getPostalCode());
                }
                if (postalAddress.getIsIndianAddress() != null) {
                    existingPostalAddress.setIsIndianAddress(postalAddress.getIsIndianAddress());
                }
                if (postalAddress.getNote() != null) {
                    existingPostalAddress.setNote(postalAddress.getNote());
                }

                return existingPostalAddress;
            })
            .map(postalAddressRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, postalAddress.getId().toString())
        );
    }

    /**
     * {@code GET  /postal-addresses} : get all the postalAddresses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of postalAddresses in body.
     */
    @GetMapping("/postal-addresses")
    public List<PostalAddress> getAllPostalAddresses() {
        log.debug("REST request to get all PostalAddresses");
        return postalAddressRepository.findAll();
    }

    /**
     * {@code GET  /postal-addresses/:id} : get the "id" postalAddress.
     *
     * @param id the id of the postalAddress to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the postalAddress, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/postal-addresses/{id}")
    public ResponseEntity<PostalAddress> getPostalAddress(@PathVariable Long id) {
        log.debug("REST request to get PostalAddress : {}", id);
        Optional<PostalAddress> postalAddress = postalAddressRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(postalAddress);
    }

    /**
     * {@code DELETE  /postal-addresses/:id} : delete the "id" postalAddress.
     *
     * @param id the id of the postalAddress to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/postal-addresses/{id}")
    public ResponseEntity<Void> deletePostalAddress(@PathVariable Long id) {
        log.debug("REST request to delete PostalAddress : {}", id);
        postalAddressRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
