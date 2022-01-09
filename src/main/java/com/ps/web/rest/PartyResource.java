package com.ps.web.rest;

import com.ps.domain.Party;
import com.ps.repository.PartyRepository;
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
 * REST controller for managing {@link com.ps.domain.Party}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PartyResource {

    private final Logger log = LoggerFactory.getLogger(PartyResource.class);

    private static final String ENTITY_NAME = "party";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartyRepository partyRepository;

    public PartyResource(PartyRepository partyRepository) {
        this.partyRepository = partyRepository;
    }

    /**
     * {@code POST  /parties} : Create a new party.
     *
     * @param party the party to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new party, or with status {@code 400 (Bad Request)} if the party has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parties")
    public ResponseEntity<Party> createParty(@Valid @RequestBody Party party) throws URISyntaxException {
        log.debug("REST request to save Party : {}", party);
        if (party.getId() != null) {
            throw new BadRequestAlertException("A new party cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Party result = partyRepository.save(party);
        return ResponseEntity
            .created(new URI("/api/parties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parties/:id} : Updates an existing party.
     *
     * @param id the id of the party to save.
     * @param party the party to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated party,
     * or with status {@code 400 (Bad Request)} if the party is not valid,
     * or with status {@code 500 (Internal Server Error)} if the party couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parties/{id}")
    public ResponseEntity<Party> updateParty(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Party party)
        throws URISyntaxException {
        log.debug("REST request to update Party : {}, {}", id, party);
        if (party.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, party.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!partyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Party result = partyRepository.save(party);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, party.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /parties/:id} : Partial updates given fields of an existing party, field will ignore if it is null
     *
     * @param id the id of the party to save.
     * @param party the party to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated party,
     * or with status {@code 400 (Bad Request)} if the party is not valid,
     * or with status {@code 404 (Not Found)} if the party is not found,
     * or with status {@code 500 (Internal Server Error)} if the party couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/parties/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Party> partialUpdateParty(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Party party
    ) throws URISyntaxException {
        log.debug("REST request to partial update Party partially : {}, {}", id, party);
        if (party.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, party.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!partyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Party> result = partyRepository
            .findById(party.getId())
            .map(existingParty -> {
                if (party.getFirstName() != null) {
                    existingParty.setFirstName(party.getFirstName());
                }
                if (party.getMiddleName() != null) {
                    existingParty.setMiddleName(party.getMiddleName());
                }
                if (party.getLastName() != null) {
                    existingParty.setLastName(party.getLastName());
                }
                if (party.getGender() != null) {
                    existingParty.setGender(party.getGender());
                }
                if (party.getBirthDate() != null) {
                    existingParty.setBirthDate(party.getBirthDate());
                }
                if (party.getMobileNumber() != null) {
                    existingParty.setMobileNumber(party.getMobileNumber());
                }
                if (party.getEmail() != null) {
                    existingParty.setEmail(party.getEmail());
                }
                if (party.getIsTemporaryPassword() != null) {
                    existingParty.setIsTemporaryPassword(party.getIsTemporaryPassword());
                }
                if (party.getProfileImageUrl() != null) {
                    existingParty.setProfileImageUrl(party.getProfileImageUrl());
                }
                if (party.getNotes() != null) {
                    existingParty.setNotes(party.getNotes());
                }

                return existingParty;
            })
            .map(partyRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, party.getId().toString())
        );
    }

    /**
     * {@code GET  /parties} : get all the parties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parties in body.
     */
    @GetMapping("/parties")
    public List<Party> getAllParties() {
        log.debug("REST request to get all Parties");
        return partyRepository.findAll();
    }

    /**
     * {@code GET  /parties/:id} : get the "id" party.
     *
     * @param id the id of the party to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the party, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parties/{id}")
    public ResponseEntity<Party> getParty(@PathVariable Long id) {
        log.debug("REST request to get Party : {}", id);
        Optional<Party> party = partyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(party);
    }

    /**
     * {@code DELETE  /parties/:id} : delete the "id" party.
     *
     * @param id the id of the party to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parties/{id}")
    public ResponseEntity<Void> deleteParty(@PathVariable Long id) {
        log.debug("REST request to delete Party : {}", id);
        partyRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
