package com.ps.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ps.IntegrationTest;
import com.ps.domain.PostalAddress;
import com.ps.repository.PostalAddressRepository;
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
 * Integration tests for the {@link PostalAddressResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PostalAddressResourceIT {

    private static final String DEFAULT_TO_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TO_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_LANDMARK = "AAAAAAAAAA";
    private static final String UPDATED_LANDMARK = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_INDIAN_ADDRESS = false;
    private static final Boolean UPDATED_IS_INDIAN_ADDRESS = true;

    private static final String DEFAULT_NOTE = "AAAAAAAAAA";
    private static final String UPDATED_NOTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/postal-addresses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PostalAddressRepository postalAddressRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPostalAddressMockMvc;

    private PostalAddress postalAddress;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PostalAddress createEntity(EntityManager em) {
        PostalAddress postalAddress = new PostalAddress()
            .toName(DEFAULT_TO_NAME)
            .address1(DEFAULT_ADDRESS_1)
            .address2(DEFAULT_ADDRESS_2)
            .city(DEFAULT_CITY)
            .landmark(DEFAULT_LANDMARK)
            .postalCode(DEFAULT_POSTAL_CODE)
            .isIndianAddress(DEFAULT_IS_INDIAN_ADDRESS)
            .note(DEFAULT_NOTE);
        return postalAddress;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PostalAddress createUpdatedEntity(EntityManager em) {
        PostalAddress postalAddress = new PostalAddress()
            .toName(UPDATED_TO_NAME)
            .address1(UPDATED_ADDRESS_1)
            .address2(UPDATED_ADDRESS_2)
            .city(UPDATED_CITY)
            .landmark(UPDATED_LANDMARK)
            .postalCode(UPDATED_POSTAL_CODE)
            .isIndianAddress(UPDATED_IS_INDIAN_ADDRESS)
            .note(UPDATED_NOTE);
        return postalAddress;
    }

    @BeforeEach
    public void initTest() {
        postalAddress = createEntity(em);
    }

    @Test
    @Transactional
    void createPostalAddress() throws Exception {
        int databaseSizeBeforeCreate = postalAddressRepository.findAll().size();
        // Create the PostalAddress
        restPostalAddressMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(postalAddress)))
            .andExpect(status().isCreated());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeCreate + 1);
        PostalAddress testPostalAddress = postalAddressList.get(postalAddressList.size() - 1);
        assertThat(testPostalAddress.getToName()).isEqualTo(DEFAULT_TO_NAME);
        assertThat(testPostalAddress.getAddress1()).isEqualTo(DEFAULT_ADDRESS_1);
        assertThat(testPostalAddress.getAddress2()).isEqualTo(DEFAULT_ADDRESS_2);
        assertThat(testPostalAddress.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testPostalAddress.getLandmark()).isEqualTo(DEFAULT_LANDMARK);
        assertThat(testPostalAddress.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testPostalAddress.getIsIndianAddress()).isEqualTo(DEFAULT_IS_INDIAN_ADDRESS);
        assertThat(testPostalAddress.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    void createPostalAddressWithExistingId() throws Exception {
        // Create the PostalAddress with an existing ID
        postalAddress.setId(1L);

        int databaseSizeBeforeCreate = postalAddressRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostalAddressMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(postalAddress)))
            .andExpect(status().isBadRequest());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPostalAddresses() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        // Get all the postalAddressList
        restPostalAddressMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(postalAddress.getId().intValue())))
            .andExpect(jsonPath("$.[*].toName").value(hasItem(DEFAULT_TO_NAME)))
            .andExpect(jsonPath("$.[*].address1").value(hasItem(DEFAULT_ADDRESS_1)))
            .andExpect(jsonPath("$.[*].address2").value(hasItem(DEFAULT_ADDRESS_2)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].landmark").value(hasItem(DEFAULT_LANDMARK)))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE)))
            .andExpect(jsonPath("$.[*].isIndianAddress").value(hasItem(DEFAULT_IS_INDIAN_ADDRESS.booleanValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)));
    }

    @Test
    @Transactional
    void getPostalAddress() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        // Get the postalAddress
        restPostalAddressMockMvc
            .perform(get(ENTITY_API_URL_ID, postalAddress.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(postalAddress.getId().intValue()))
            .andExpect(jsonPath("$.toName").value(DEFAULT_TO_NAME))
            .andExpect(jsonPath("$.address1").value(DEFAULT_ADDRESS_1))
            .andExpect(jsonPath("$.address2").value(DEFAULT_ADDRESS_2))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.landmark").value(DEFAULT_LANDMARK))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE))
            .andExpect(jsonPath("$.isIndianAddress").value(DEFAULT_IS_INDIAN_ADDRESS.booleanValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE));
    }

    @Test
    @Transactional
    void getNonExistingPostalAddress() throws Exception {
        // Get the postalAddress
        restPostalAddressMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPostalAddress() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();

        // Update the postalAddress
        PostalAddress updatedPostalAddress = postalAddressRepository.findById(postalAddress.getId()).get();
        // Disconnect from session so that the updates on updatedPostalAddress are not directly saved in db
        em.detach(updatedPostalAddress);
        updatedPostalAddress
            .toName(UPDATED_TO_NAME)
            .address1(UPDATED_ADDRESS_1)
            .address2(UPDATED_ADDRESS_2)
            .city(UPDATED_CITY)
            .landmark(UPDATED_LANDMARK)
            .postalCode(UPDATED_POSTAL_CODE)
            .isIndianAddress(UPDATED_IS_INDIAN_ADDRESS)
            .note(UPDATED_NOTE);

        restPostalAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPostalAddress.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPostalAddress))
            )
            .andExpect(status().isOk());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
        PostalAddress testPostalAddress = postalAddressList.get(postalAddressList.size() - 1);
        assertThat(testPostalAddress.getToName()).isEqualTo(UPDATED_TO_NAME);
        assertThat(testPostalAddress.getAddress1()).isEqualTo(UPDATED_ADDRESS_1);
        assertThat(testPostalAddress.getAddress2()).isEqualTo(UPDATED_ADDRESS_2);
        assertThat(testPostalAddress.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testPostalAddress.getLandmark()).isEqualTo(UPDATED_LANDMARK);
        assertThat(testPostalAddress.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testPostalAddress.getIsIndianAddress()).isEqualTo(UPDATED_IS_INDIAN_ADDRESS);
        assertThat(testPostalAddress.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void putNonExistingPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, postalAddress.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(postalAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(postalAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(postalAddress)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePostalAddressWithPatch() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();

        // Update the postalAddress using partial update
        PostalAddress partialUpdatedPostalAddress = new PostalAddress();
        partialUpdatedPostalAddress.setId(postalAddress.getId());

        partialUpdatedPostalAddress.toName(UPDATED_TO_NAME).address2(UPDATED_ADDRESS_2).postalCode(UPDATED_POSTAL_CODE);

        restPostalAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPostalAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPostalAddress))
            )
            .andExpect(status().isOk());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
        PostalAddress testPostalAddress = postalAddressList.get(postalAddressList.size() - 1);
        assertThat(testPostalAddress.getToName()).isEqualTo(UPDATED_TO_NAME);
        assertThat(testPostalAddress.getAddress1()).isEqualTo(DEFAULT_ADDRESS_1);
        assertThat(testPostalAddress.getAddress2()).isEqualTo(UPDATED_ADDRESS_2);
        assertThat(testPostalAddress.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testPostalAddress.getLandmark()).isEqualTo(DEFAULT_LANDMARK);
        assertThat(testPostalAddress.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testPostalAddress.getIsIndianAddress()).isEqualTo(DEFAULT_IS_INDIAN_ADDRESS);
        assertThat(testPostalAddress.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    void fullUpdatePostalAddressWithPatch() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();

        // Update the postalAddress using partial update
        PostalAddress partialUpdatedPostalAddress = new PostalAddress();
        partialUpdatedPostalAddress.setId(postalAddress.getId());

        partialUpdatedPostalAddress
            .toName(UPDATED_TO_NAME)
            .address1(UPDATED_ADDRESS_1)
            .address2(UPDATED_ADDRESS_2)
            .city(UPDATED_CITY)
            .landmark(UPDATED_LANDMARK)
            .postalCode(UPDATED_POSTAL_CODE)
            .isIndianAddress(UPDATED_IS_INDIAN_ADDRESS)
            .note(UPDATED_NOTE);

        restPostalAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPostalAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPostalAddress))
            )
            .andExpect(status().isOk());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
        PostalAddress testPostalAddress = postalAddressList.get(postalAddressList.size() - 1);
        assertThat(testPostalAddress.getToName()).isEqualTo(UPDATED_TO_NAME);
        assertThat(testPostalAddress.getAddress1()).isEqualTo(UPDATED_ADDRESS_1);
        assertThat(testPostalAddress.getAddress2()).isEqualTo(UPDATED_ADDRESS_2);
        assertThat(testPostalAddress.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testPostalAddress.getLandmark()).isEqualTo(UPDATED_LANDMARK);
        assertThat(testPostalAddress.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testPostalAddress.getIsIndianAddress()).isEqualTo(UPDATED_IS_INDIAN_ADDRESS);
        assertThat(testPostalAddress.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void patchNonExistingPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, postalAddress.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(postalAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(postalAddress))
            )
            .andExpect(status().isBadRequest());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPostalAddress() throws Exception {
        int databaseSizeBeforeUpdate = postalAddressRepository.findAll().size();
        postalAddress.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPostalAddressMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(postalAddress))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PostalAddress in the database
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePostalAddress() throws Exception {
        // Initialize the database
        postalAddressRepository.saveAndFlush(postalAddress);

        int databaseSizeBeforeDelete = postalAddressRepository.findAll().size();

        // Delete the postalAddress
        restPostalAddressMockMvc
            .perform(delete(ENTITY_API_URL_ID, postalAddress.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PostalAddress> postalAddressList = postalAddressRepository.findAll();
        assertThat(postalAddressList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
