package com.sriram.adminproject.web.rest;

import com.sriram.adminproject.domain.Pancard;
import com.sriram.adminproject.domain.User;
import com.sriram.adminproject.repository.PancardRepository;
import com.sriram.adminproject.security.AuthoritiesConstants;
import com.sriram.adminproject.service.DataService;
import com.sriram.adminproject.service.HelperService;
import com.sriram.adminproject.service.PancardService;
import com.sriram.adminproject.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.sriram.adminproject.domain.Pancard}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PancardResource {

    private final Logger log = LoggerFactory.getLogger(PancardResource.class);

    private static final String ENTITY_NAME = "pancard";

    @Autowired
    private PancardService pancardService;

    @Autowired
    private DataService dataService;

    @Autowired
    private HelperService helperService;

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
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Pancard> createPancard(@Valid @RequestBody Pancard pancard) throws URISyntaxException {
        log.debug("REST request to save Pancard : {}", pancard);
        if (pancard.getId() != null) {
            throw new BadRequestAlertException("A new pancard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pancard result = pancardRepository.save(pancard);
        return ResponseEntity
            .created(new URI("/api/pancards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
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
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
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
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pancard.getId().toString()))
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
    @PatchMapping(value = "/pancards/{id}", consumes = "application/merge-patch+json")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
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

        Optional<User> userObj = dataService.getUserWithAuthorities();
        Optional<Pancard> result = pancardRepository
            .findById(pancard.getId())
            .map(
                existingPancard -> {
                    if (pancard.getEmail() != null) {
                        existingPancard.setEmail(pancard.getEmail());
                    }
                    if (pancard.getMobile() != null) {
                        existingPancard.setMobile(pancard.getMobile());
                    }
                    if (pancard.getPanid() != null) {
                        existingPancard.setPanid(pancard.getPanid());
                    }
                    if (pancard.getAadhaarno() != null) {
                        existingPancard.setAadhaarno(pancard.getAadhaarno());
                    }
                    if (pancard.getNameasaadhaar() != null) {
                        existingPancard.setNameasaadhaar(pancard.getNameasaadhaar());
                    }
                    if (pancard.getPancardupload() != null) {
                        existingPancard.setPancardupload(pancard.getPancardupload());
                    }
                    if (pancard.getPanstatus() != null) {
                        existingPancard.setPanstatus(pancard.getPanstatus());
                    }
                    if (pancard.getDob() != null) {
                        existingPancard.setDob(pancard.getDob());
                    }
                    if (pancard.getAddress() != null) {
                        existingPancard.setAddress(pancard.getAddress());
                    }
                    if (pancard.getCreatedby() != null) {
                        existingPancard.setCreatedby(userObj.get());
                    }

                    return existingPancard;
                }
            )
            .map(pancardRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pancard.getId().toString())
        );
    }

    /**
     * {@code GET  /pancards} : get all the pancards.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pancards in body.
     */
    @GetMapping("/pancards")
    public ResponseEntity<List<Pancard>> getAllPancards(Pageable pageable) {
        log.debug("REST request to get a page of Pancards");

        Page<Pancard> page = pancardRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
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
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deletePancard(@PathVariable Long id) {
        log.debug("REST request to delete Pancard : {}", id);
        // pancardRepository.deleteById(id);
        pancardRepository
            .findById(id)
            .map(
                existingPancard -> {
                    existingPancard.setPanstatus("INACTIVE");
                    return existingPancard;
                }
            )
            .map(pancardRepository::save);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    // ###################### User Pancard API endpoints started #########################################################

    // Getting all the Pancard list of current logged User.
    @GetMapping("/users/pancards")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Object> getUserPancards() {
        log.debug("REST request to get a page of Pancards");
        Map<String, Object> result = pancardService.getPancardDetailsByCreatedBy();
        return new ResponseEntity<Object>(result, (HttpStatus) result.get("statusCode"));
    }

    @DeleteMapping("/users/pancards/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Void> deleteUserPancard(@Valid @PathVariable Long id) {
        log.debug("REST request to delete Pancard : {}", id);
        // pancardRepository.deleteById(id);
        pancardRepository
            .findById(id)
            .map(
                existingPancard -> {
                    existingPancard.setPanstatus("INACTIVE");
                    return existingPancard;
                }
            )
            .map(pancardRepository::save);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/user/current/details")
    public ResponseEntity<Object> getCurrentLoggedInUserDetails() {
        Map<String, Object> result = pancardService.getCurrentLoggedInUserDetails();
        return new ResponseEntity<Object>(result, (HttpStatus) result.get("statusCode"));
    }

    @GetMapping("/user/id/{id}/details")
    public ResponseEntity<Object> getUserDetailsById(@Valid @PathVariable Long id) {
        Map<String, Object> result = pancardService.getUserDetailsById(id);
        return new ResponseEntity<Object>(result, (HttpStatus) result.get("statusCode"));
    }
}
