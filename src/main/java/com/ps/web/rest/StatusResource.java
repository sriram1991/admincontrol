package com.ps.web.rest;

import com.ps.domain.Status;
import com.ps.repository.StatusRepository;
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
 * REST controller for managing {@link com.ps.domain.Status}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StatusResource {

    private final Logger log = LoggerFactory.getLogger(StatusResource.class);

    private static final String ENTITY_NAME = "status";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatusRepository statusRepository;

    public StatusResource(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    /**
     * {@code POST  /statuses} : Create a new status.
     *
     * @param status the status to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new status, or with status {@code 400 (Bad Request)} if the status has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/statuses")
    public ResponseEntity<Status> createStatus(@Valid @RequestBody Status status) throws URISyntaxException {
        log.debug("REST request to save Status : {}", status);
        if (status.getId() != null) {
            throw new BadRequestAlertException("A new status cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Status result = statusRepository.save(status);
        return ResponseEntity
            .created(new URI("/api/statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /statuses/:id} : Updates an existing status.
     *
     * @param id the id of the status to save.
     * @param status the status to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated status,
     * or with status {@code 400 (Bad Request)} if the status is not valid,
     * or with status {@code 500 (Internal Server Error)} if the status couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/statuses/{id}")
    public ResponseEntity<Status> updateStatus(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Status status
    ) throws URISyntaxException {
        log.debug("REST request to update Status : {}, {}", id, status);
        if (status.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, status.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!statusRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Status result = statusRepository.save(status);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, status.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /statuses/:id} : Partial updates given fields of an existing status, field will ignore if it is null
     *
     * @param id the id of the status to save.
     * @param status the status to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated status,
     * or with status {@code 400 (Bad Request)} if the status is not valid,
     * or with status {@code 404 (Not Found)} if the status is not found,
     * or with status {@code 500 (Internal Server Error)} if the status couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/statuses/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Status> partialUpdateStatus(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Status status
    ) throws URISyntaxException {
        log.debug("REST request to partial update Status partially : {}, {}", id, status);
        if (status.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, status.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!statusRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Status> result = statusRepository
            .findById(status.getId())
            .map(existingStatus -> {
                if (status.getName() != null) {
                    existingStatus.setName(status.getName());
                }
                if (status.getSequenceNo() != null) {
                    existingStatus.setSequenceNo(status.getSequenceNo());
                }
                if (status.getDescription() != null) {
                    existingStatus.setDescription(status.getDescription());
                }

                return existingStatus;
            })
            .map(statusRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, status.getId().toString())
        );
    }

    /**
     * {@code GET  /statuses} : get all the statuses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statuses in body.
     */
    @GetMapping("/statuses")
    public List<Status> getAllStatuses() {
        log.debug("REST request to get all Statuses");
        return statusRepository.findAll();
    }

    /**
     * {@code GET  /statuses/:id} : get the "id" status.
     *
     * @param id the id of the status to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the status, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/statuses/{id}")
    public ResponseEntity<Status> getStatus(@PathVariable Long id) {
        log.debug("REST request to get Status : {}", id);
        Optional<Status> status = statusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(status);
    }

    /**
     * {@code DELETE  /statuses/:id} : delete the "id" status.
     *
     * @param id the id of the status to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/statuses/{id}")
    public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
        log.debug("REST request to delete Status : {}", id);
        statusRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
