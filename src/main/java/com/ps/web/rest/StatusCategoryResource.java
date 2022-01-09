package com.ps.web.rest;

import com.ps.domain.StatusCategory;
import com.ps.repository.StatusCategoryRepository;
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
 * REST controller for managing {@link com.ps.domain.StatusCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatusCategoryResource {

    private final Logger log = LoggerFactory.getLogger(StatusCategoryResource.class);

    private static final String ENTITY_NAME = "statusCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatusCategoryRepository statusCategoryRepository;

    public StatusCategoryResource(StatusCategoryRepository statusCategoryRepository) {
        this.statusCategoryRepository = statusCategoryRepository;
    }

    /**
     * {@code POST  /status-categories} : Create a new statusCategory.
     *
     * @param statusCategory the statusCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statusCategory, or with status {@code 400 (Bad Request)} if the statusCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/status-categories")
    public ResponseEntity<StatusCategory> createStatusCategory(@Valid @RequestBody StatusCategory statusCategory)
        throws URISyntaxException {
        log.debug("REST request to save StatusCategory : {}", statusCategory);
        if (statusCategory.getId() != null) {
            throw new BadRequestAlertException("A new statusCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatusCategory result = statusCategoryRepository.save(statusCategory);
        return ResponseEntity
            .created(new URI("/api/status-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /status-categories/:id} : Updates an existing statusCategory.
     *
     * @param id the id of the statusCategory to save.
     * @param statusCategory the statusCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statusCategory,
     * or with status {@code 400 (Bad Request)} if the statusCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statusCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/status-categories/{id}")
    public ResponseEntity<StatusCategory> updateStatusCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StatusCategory statusCategory
    ) throws URISyntaxException {
        log.debug("REST request to update StatusCategory : {}, {}", id, statusCategory);
        if (statusCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, statusCategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!statusCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StatusCategory result = statusCategoryRepository.save(statusCategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statusCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /status-categories/:id} : Partial updates given fields of an existing statusCategory, field will ignore if it is null
     *
     * @param id the id of the statusCategory to save.
     * @param statusCategory the statusCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statusCategory,
     * or with status {@code 400 (Bad Request)} if the statusCategory is not valid,
     * or with status {@code 404 (Not Found)} if the statusCategory is not found,
     * or with status {@code 500 (Internal Server Error)} if the statusCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/status-categories/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StatusCategory> partialUpdateStatusCategory(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StatusCategory statusCategory
    ) throws URISyntaxException {
        log.debug("REST request to partial update StatusCategory partially : {}, {}", id, statusCategory);
        if (statusCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, statusCategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!statusCategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StatusCategory> result = statusCategoryRepository
            .findById(statusCategory.getId())
            .map(existingStatusCategory -> {
                if (statusCategory.getName() != null) {
                    existingStatusCategory.setName(statusCategory.getName());
                }
                if (statusCategory.getDescription() != null) {
                    existingStatusCategory.setDescription(statusCategory.getDescription());
                }

                return existingStatusCategory;
            })
            .map(statusCategoryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statusCategory.getId().toString())
        );
    }

    /**
     * {@code GET  /status-categories} : get all the statusCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statusCategories in body.
     */
    @GetMapping("/status-categories")
    public List<StatusCategory> getAllStatusCategories() {
        log.debug("REST request to get all StatusCategories");
        return statusCategoryRepository.findAll();
    }

    /**
     * {@code GET  /status-categories/:id} : get the "id" statusCategory.
     *
     * @param id the id of the statusCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statusCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/status-categories/{id}")
    public ResponseEntity<StatusCategory> getStatusCategory(@PathVariable Long id) {
        log.debug("REST request to get StatusCategory : {}", id);
        Optional<StatusCategory> statusCategory = statusCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statusCategory);
    }

    /**
     * {@code DELETE  /status-categories/:id} : delete the "id" statusCategory.
     *
     * @param id the id of the statusCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/status-categories/{id}")
    public ResponseEntity<Void> deleteStatusCategory(@PathVariable Long id) {
        log.debug("REST request to delete StatusCategory : {}", id);
        statusCategoryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
