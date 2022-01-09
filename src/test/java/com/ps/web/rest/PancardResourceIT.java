package com.ps.web.rest;

import static com.ps.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ps.IntegrationTest;
import com.ps.domain.Pancard;
import com.ps.repository.PancardRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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

    private static final String DEFAULT_PAN_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PAN_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_AADHAAR_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_AADHAAR_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_AADHAAR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AADHAAR_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

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
            .panNumber(DEFAULT_PAN_NUMBER)
            .aadhaarNumber(DEFAULT_AADHAAR_NUMBER)
            .aadhaarName(DEFAULT_AADHAAR_NAME)
            .birthDate(DEFAULT_BIRTH_DATE)
            .imageUrl(DEFAULT_IMAGE_URL)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
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
            .panNumber(UPDATED_PAN_NUMBER)
            .aadhaarNumber(UPDATED_AADHAAR_NUMBER)
            .aadhaarName(UPDATED_AADHAAR_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .imageUrl(UPDATED_IMAGE_URL)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
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
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pancard)))
            .andExpect(status().isCreated());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeCreate + 1);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getPanNumber()).isEqualTo(DEFAULT_PAN_NUMBER);
        assertThat(testPancard.getAadhaarNumber()).isEqualTo(DEFAULT_AADHAAR_NUMBER);
        assertThat(testPancard.getAadhaarName()).isEqualTo(DEFAULT_AADHAAR_NAME);
        assertThat(testPancard.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testPancard.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testPancard.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testPancard.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    void createPancardWithExistingId() throws Exception {
        // Create the Pancard with an existing ID
        pancard.setId(1L);

        int databaseSizeBeforeCreate = pancardRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPancardMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pancard)))
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
            .andExpect(jsonPath("$.[*].panNumber").value(hasItem(DEFAULT_PAN_NUMBER)))
            .andExpect(jsonPath("$.[*].aadhaarNumber").value(hasItem(DEFAULT_AADHAAR_NUMBER)))
            .andExpect(jsonPath("$.[*].aadhaarName").value(hasItem(DEFAULT_AADHAAR_NAME)))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))));
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
            .andExpect(jsonPath("$.panNumber").value(DEFAULT_PAN_NUMBER))
            .andExpect(jsonPath("$.aadhaarNumber").value(DEFAULT_AADHAAR_NUMBER))
            .andExpect(jsonPath("$.aadhaarName").value(DEFAULT_AADHAAR_NAME))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.updatedAt").value(sameInstant(DEFAULT_UPDATED_AT)));
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
            .panNumber(UPDATED_PAN_NUMBER)
            .aadhaarNumber(UPDATED_AADHAAR_NUMBER)
            .aadhaarName(UPDATED_AADHAAR_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .imageUrl(UPDATED_IMAGE_URL)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restPancardMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPancard.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getPanNumber()).isEqualTo(UPDATED_PAN_NUMBER);
        assertThat(testPancard.getAadhaarNumber()).isEqualTo(UPDATED_AADHAAR_NUMBER);
        assertThat(testPancard.getAadhaarName()).isEqualTo(UPDATED_AADHAAR_NAME);
        assertThat(testPancard.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testPancard.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testPancard.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testPancard.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
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
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pancard)))
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

        partialUpdatedPancard.panNumber(UPDATED_PAN_NUMBER).aadhaarNumber(UPDATED_AADHAAR_NUMBER).updatedAt(UPDATED_UPDATED_AT);

        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPancard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getPanNumber()).isEqualTo(UPDATED_PAN_NUMBER);
        assertThat(testPancard.getAadhaarNumber()).isEqualTo(UPDATED_AADHAAR_NUMBER);
        assertThat(testPancard.getAadhaarName()).isEqualTo(DEFAULT_AADHAAR_NAME);
        assertThat(testPancard.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testPancard.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testPancard.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testPancard.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
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
            .panNumber(UPDATED_PAN_NUMBER)
            .aadhaarNumber(UPDATED_AADHAAR_NUMBER)
            .aadhaarName(UPDATED_AADHAAR_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .imageUrl(UPDATED_IMAGE_URL)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restPancardMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPancard.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPancard))
            )
            .andExpect(status().isOk());

        // Validate the Pancard in the database
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeUpdate);
        Pancard testPancard = pancardList.get(pancardList.size() - 1);
        assertThat(testPancard.getPanNumber()).isEqualTo(UPDATED_PAN_NUMBER);
        assertThat(testPancard.getAadhaarNumber()).isEqualTo(UPDATED_AADHAAR_NUMBER);
        assertThat(testPancard.getAadhaarName()).isEqualTo(UPDATED_AADHAAR_NAME);
        assertThat(testPancard.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testPancard.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testPancard.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testPancard.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
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
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pancard)))
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
            .perform(delete(ENTITY_API_URL_ID, pancard.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pancard> pancardList = pancardRepository.findAll();
        assertThat(pancardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
