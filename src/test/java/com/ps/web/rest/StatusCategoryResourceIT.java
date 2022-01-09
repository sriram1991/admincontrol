package com.ps.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ps.IntegrationTest;
import com.ps.domain.StatusCategory;
import com.ps.repository.StatusCategoryRepository;
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
 * Integration tests for the {@link StatusCategoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class StatusCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/status-categories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private StatusCategoryRepository statusCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStatusCategoryMockMvc;

    private StatusCategory statusCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusCategory createEntity(EntityManager em) {
        StatusCategory statusCategory = new StatusCategory().name(DEFAULT_NAME).description(DEFAULT_DESCRIPTION);
        return statusCategory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusCategory createUpdatedEntity(EntityManager em) {
        StatusCategory statusCategory = new StatusCategory().name(UPDATED_NAME).description(UPDATED_DESCRIPTION);
        return statusCategory;
    }

    @BeforeEach
    public void initTest() {
        statusCategory = createEntity(em);
    }

    @Test
    @Transactional
    void createStatusCategory() throws Exception {
        int databaseSizeBeforeCreate = statusCategoryRepository.findAll().size();
        // Create the StatusCategory
        restStatusCategoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isCreated());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        StatusCategory testStatusCategory = statusCategoryList.get(statusCategoryList.size() - 1);
        assertThat(testStatusCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStatusCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    void createStatusCategoryWithExistingId() throws Exception {
        // Create the StatusCategory with an existing ID
        statusCategory.setId(1L);

        int databaseSizeBeforeCreate = statusCategoryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatusCategoryMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllStatusCategories() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        // Get all the statusCategoryList
        restStatusCategoryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statusCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    void getStatusCategory() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        // Get the statusCategory
        restStatusCategoryMockMvc
            .perform(get(ENTITY_API_URL_ID, statusCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(statusCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    void getNonExistingStatusCategory() throws Exception {
        // Get the statusCategory
        restStatusCategoryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewStatusCategory() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();

        // Update the statusCategory
        StatusCategory updatedStatusCategory = statusCategoryRepository.findById(statusCategory.getId()).get();
        // Disconnect from session so that the updates on updatedStatusCategory are not directly saved in db
        em.detach(updatedStatusCategory);
        updatedStatusCategory.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restStatusCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedStatusCategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedStatusCategory))
            )
            .andExpect(status().isOk());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
        StatusCategory testStatusCategory = statusCategoryList.get(statusCategoryList.size() - 1);
        assertThat(testStatusCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStatusCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void putNonExistingStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, statusCategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(statusCategory)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateStatusCategoryWithPatch() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();

        // Update the statusCategory using partial update
        StatusCategory partialUpdatedStatusCategory = new StatusCategory();
        partialUpdatedStatusCategory.setId(statusCategory.getId());

        partialUpdatedStatusCategory.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restStatusCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStatusCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStatusCategory))
            )
            .andExpect(status().isOk());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
        StatusCategory testStatusCategory = statusCategoryList.get(statusCategoryList.size() - 1);
        assertThat(testStatusCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStatusCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void fullUpdateStatusCategoryWithPatch() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();

        // Update the statusCategory using partial update
        StatusCategory partialUpdatedStatusCategory = new StatusCategory();
        partialUpdatedStatusCategory.setId(statusCategory.getId());

        partialUpdatedStatusCategory.name(UPDATED_NAME).description(UPDATED_DESCRIPTION);

        restStatusCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedStatusCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedStatusCategory))
            )
            .andExpect(status().isOk());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
        StatusCategory testStatusCategory = statusCategoryList.get(statusCategoryList.size() - 1);
        assertThat(testStatusCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStatusCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    void patchNonExistingStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, statusCategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamStatusCategory() throws Exception {
        int databaseSizeBeforeUpdate = statusCategoryRepository.findAll().size();
        statusCategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restStatusCategoryMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(statusCategory))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the StatusCategory in the database
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteStatusCategory() throws Exception {
        // Initialize the database
        statusCategoryRepository.saveAndFlush(statusCategory);

        int databaseSizeBeforeDelete = statusCategoryRepository.findAll().size();

        // Delete the statusCategory
        restStatusCategoryMockMvc
            .perform(delete(ENTITY_API_URL_ID, statusCategory.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatusCategory> statusCategoryList = statusCategoryRepository.findAll();
        assertThat(statusCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
