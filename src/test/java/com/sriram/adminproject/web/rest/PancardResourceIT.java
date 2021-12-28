package com.sriram.adminproject.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.sriram.adminproject.IntegrationTest;
import com.sriram.adminproject.domain.Pancard;
import com.sriram.adminproject.repository.PancardRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PancardResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PancardResourceIT {

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_MOBILE = 10;
    private static final Integer UPDATED_MOBILE = 11;

    private static final String DEFAULT_PANID = "AAAAAAAAAA";
    private static final String UPDATED_PANID = "BBBBBBBBBB";

    private static final Integer DEFAULT_AADHAARNO = 12;
    private static final Integer UPDATED_AADHAARNO = 11;

    private static final String DEFAULT_NAMEASAADHAAR = "AAAAAAAAAA";
    private static final String UPDATED_NAMEASAADHAAR = "BBBBBBBBBB";

    private static final String DEFAULT_PANSTATUS = "AAAAAAAAAA";
    private static final String UPDATED_PANSTATUS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOB = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pancards";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PancardRepository pancardRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPancardMockMvc;

    private Pancard pancard;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pancard createEntity(EntityManager em) {
        Pancard pancard = new Pancard()
            .email(DEFAULT_EMAIL)
            .mobile(DEFAULT_MOBILE)
            .panid(DEFAULT_PANID)
            .aadhaarno(DEFAULT_AADHAARNO)
            .nameasaadhaar(DEFAULT_NAMEASAADHAAR)
            .panstatus(DEFAULT_PANSTATUS)
            .dob(DEFAULT_DOB)
            .address(DEFAULT_ADDRESS);
        return pancard;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pancard createUpdatedEntity(EntityManager em) {
        Pancard pancard = new Pancard()
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .panid(UPDATED_PANID)
            .aadhaarno(UPDATED_AADHAARNO)
            .nameasaadhaar(UPDATED_NAMEASAADHAAR)
            .panstatus(UPDATED_PANSTATUS)
            .dob(UPDATED_DOB)
            .address(UPDATED_ADDRESS);
        return pancard;
    }

    @BeforeEach
    public void initTest() {
        pancard = createEntity(em);
    }

    @Test
    @Transactional
    void createPancard() throws Exception {
        int databaseSizeBeforeCreate = pancardRepository.findAll().size();
        // Create the Pancard
        restPancardMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isCreated());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeCreate + 1);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPancard.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testPancard.getPanid()).isEqualTo(DEFAULT_PANID);
        assertThat(testPancard.getAadhaarno()).isEqualTo(DEFAULT_AADHAARNO);
        assertThat(testPancard.getNameasaadhaar()).isEqualTo(DEFAULT_NAMEASAADHAAR);
        assertThat(testPancard.getPanstatus()).isEqualTo(DEFAULT_PANSTATUS);
        assertThat(testPancard.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testPancard.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    void createPancardWithExistingId() throws Exception {
        // Create the Pancard with an existing ID
        pancard.setId(1L);

        int databaseSizeBeforeCreate = pancardRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPancardMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPancards() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        // Get all the pancardList
        restPancardMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pancard.getId().intValue())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)))
            .andExpect(jsonPath("$.[*].panid").value(hasItem(DEFAULT_PANID)))
            .andExpect(jsonPath("$.[*].aadhaarno").value(hasItem(DEFAULT_AADHAARNO)))
            .andExpect(jsonPath("$.[*].nameasaadhaar").value(hasItem(DEFAULT_NAMEASAADHAAR)))
            .andExpect(jsonPath("$.[*].panstatus").value(hasItem(DEFAULT_PANSTATUS)))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)));
    }

    @Test
    @Transactional
    void getPancard() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        // Get the pancard
        restPancardMockMvc
            .perform(get(ENTITY_API_URL_ID, pancard.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pancard.getId().intValue()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
            .andExpect(jsonPath("$.panid").value(DEFAULT_PANID))
            .andExpect(jsonPath("$.aadhaarno").value(DEFAULT_AADHAARNO))
            .andExpect(jsonPath("$.nameasaadhaar").value(DEFAULT_NAMEASAADHAAR))
            .andExpect(jsonPath("$.panstatus").value(DEFAULT_PANSTATUS))
            .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS));
    }

    @Test
    @Transactional
    void getNonExistingPancard() throws Exception {
        // Get the pancard
        restPancardMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPancard() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();

        // Update the pancard
        Pancard updatedPancard = pancardRepository.findById(pancard.getId()).get();
        // Disconnect from session so that the updates on updatedPancard are not directly saved in db
        em.detach(updatedPancard);
        updatedPancard
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .panid(UPDATED_PANID)
            .aadhaarno(UPDATED_AADHAARNO)
            .nameasaadhaar(UPDATED_NAMEASAADHAAR)
            .panstatus(UPDATED_PANSTATUS)
            .dob(UPDATED_DOB)
            .address(UPDATED_ADDRESS);

        restPancardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPancard.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPancard.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testPancard.getPanid()).isEqualTo(UPDATED_PANID);
        assertThat(testPancard.getAadhaarno()).isEqualTo(UPDATED_AADHAARNO);
        assertThat(testPancard.getNameasaadhaar()).isEqualTo(UPDATED_NAMEASAADHAAR);
        assertThat(testPancard.getPanstatus()).isEqualTo(UPDATED_PANSTATUS);
        assertThat(testPancard.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testPancard.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    void putNonExistingPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pancard.getId())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                put(ENTITY_API_URL).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePancardWithPatch() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();

        // Update the pancard using partial update
        Pancard partialUpdatedPancard = new Pancard();
        partialUpdatedPancard.setId(pancard.getId());

        partialUpdatedPancard.email(UPDATED_EMAIL).mobile(UPDATED_MOBILE).dob(UPDATED_DOB);

        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPancard.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPancard.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testPancard.getPanid()).isEqualTo(DEFAULT_PANID);
        assertThat(testPancard.getAadhaarno()).isEqualTo(DEFAULT_AADHAARNO);
        assertThat(testPancard.getNameasaadhaar()).isEqualTo(DEFAULT_NAMEASAADHAAR);
        assertThat(testPancard.getPanstatus()).isEqualTo(DEFAULT_PANSTATUS);
        assertThat(testPancard.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testPancard.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    void fullUpdatePancardWithPatch() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();

        // Update the pancard using partial update
        Pancard partialUpdatedPancard = new Pancard();
        partialUpdatedPancard.setId(pancard.getId());

        partialUpdatedPancard
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .panid(UPDATED_PANID)
            .aadhaarno(UPDATED_AADHAARNO)
            .nameasaadhaar(UPDATED_NAMEASAADHAAR)
            .panstatus(UPDATED_PANSTATUS)
            .dob(UPDATED_DOB)
            .address(UPDATED_ADDRESS);

        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPancard.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPancard.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testPancard.getPanid()).isEqualTo(UPDATED_PANID);
        assertThat(testPancard.getAadhaarno()).isEqualTo(UPDATED_AADHAARNO);
        assertThat(testPancard.getNameasaadhaar()).isEqualTo(UPDATED_NAMEASAADHAAR);
        assertThat(testPancard.getPanstatus()).isEqualTo(UPDATED_PANSTATUS);
        assertThat(testPancard.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testPancard.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    void patchNonExistingPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pancard.getId())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isBadRequest());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPancard() throws Exception {
        int databaseSizeBeforeUpdate = pancardRepository.findAll().size();
        pancard.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .with(csrf())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pancard))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePancard() throws Exception {
        // Initialize the database
        pancardRepository.saveAndFlush(pancard);

        int databaseSizeBeforeDelete = pancardRepository.findAll().size();

        // Delete the pancard
        restPancardMockMvc
            .perform(delete(ENTITY_API_URL_ID, pancard.getId()).with(csrf()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
