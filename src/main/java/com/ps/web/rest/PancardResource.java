package com.ps.web.rest;

import com.ps.domain.Pancard;
import com.ps.repository.PancardRepository;
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
 * REST controller for managing {@link com.ps.domain.Pancard}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PancardResource {

    private final Logger log = LoggerFactory.getLogger(PancardResource.class);

    private static final String ENTITY_NAME = "pancard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PancardRepository pancardRepository;

    public PancardResource(PancardRepository pancardRepository) {
        this.pancardRepository = pancardRepository;
    }

    /**
     * {@code POST  /pancards} : Create a new pancard.
     *
     * @param pancard the pancard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pancard, or with status {@code 400 (Bad Request)} if the pancard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pancards")
    public ResponseEntity<Pancard> createPancard(@Valid @RequestBody Pancard pancard) throws URISyntaxException {
        log.debug("REST request to save Pancard : {}", pancard);
        if (pancard.getId() != null) {
            throw new BadRequestAlertException("A new pancard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pancard result = pancardRepository.save(pancard);
        return ResponseEntity
            .created(new URI("/api/pancards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pancards/:id} : Updates an existing pancard.
     *
     * @param id the id of the pancard to save.
     * @param pancard the pancard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pancard,
     * or with status {@code 400 (Bad Request)} if the pancard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pancard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pancards/{id}")
    public ResponseEntity<Pancard> updatePancard(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Pancard pancard
    ) throws URISyntaxException {
        log.debug("REST request to update Pancard : {}, {}", id, pancard);
        if (pancard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pancard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pancardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Pancard result = pancardRepository.save(pancard);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pancard.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pancards/:id} : Partial updates given fields of an existing pancard, field will ignore if it is null
     *
     * @param id the id of the pancard to save.
     * @param pancard the pancard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pancard,
     * or with status {@code 400 (Bad Request)} if the pancard is not valid,
     * or with status {@code 404 (Not Found)} if the pancard is not found,
     * or with status {@code 500 (Internal Server Error)} if the pancard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pancards/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Pancard> partialUpdatePancard(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Pancard pancard
    ) throws URISyntaxException {
        log.debug("REST request to partial update Pancard partially : {}, {}", id, pancard);
        if (pancard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pancard.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pancardRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Pancard> result = pancardRepository
            .findById(pancard.getId())
            .map(existingPancard -> {
                if (pancard.getPanNumber() != null) {
                    existingPancard.setPanNumber(pancard.getPanNumber());
                }
                if (pancard.getAadhaarNumber() != null) {
                    existingPancard.setAadhaarNumber(pancard.getAadhaarNumber());
                }
                if (pancard.getAadhaarName() != null) {
                    existingPancard.setAadhaarName(pancard.getAadhaarName());
                }
                if (pancard.getBirthDate() != null) {
                    existingPancard.setBirthDate(pancard.getBirthDate());
                }
                if (pancard.getImageUrl() != null) {
                    existingPancard.setImageUrl(pancard.getImageUrl());
                }
                if (pancard.getCreatedAt() != null) {
                    existingPancard.setCreatedAt(pancard.getCreatedAt());
                }
                if (pancard.getUpdatedAt() != null) {
                    existingPancard.setUpdatedAt(pancard.getUpdatedAt());
                }

                return existingPancard;
            })
            .map(pancardRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pancard.getId().toString())
        );
    }

    /**
     * {@code GET  /pancards} : get all the pancards.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pancards in body.
     */
    @GetMapping("/pancards")
    public List<Pancard> getAllPancards() {
        log.debug("REST request to get all Pancards");
        return pancardRepository.findAll();
    }

    /**
     * {@code GET  /pancards/:id} : get the "id" pancard.
     *
     * @param id the id of the pancard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pancard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pancards/{id}")
    public ResponseEntity<Pancard> getPancard(@PathVariable Long id) {
        log.debug("REST request to get Pancard : {}", id);
        Optional<Pancard> pancard = pancardRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pancard);
    }

    /**
     * {@code DELETE  /pancards/:id} : delete the "id" pancard.
     *
     * @param id the id of the pancard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pancards/{id}")
    public ResponseEntity<Void> deletePancard(@PathVariable Long id) {
        log.debug("REST request to delete Pancard : {}", id);
        pancardRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
