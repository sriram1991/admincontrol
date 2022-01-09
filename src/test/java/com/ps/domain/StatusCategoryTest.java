package com.ps.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ps.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StatusCategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatusCategory.class);
        StatusCategory statusCategory1 = new StatusCategory();
        statusCategory1.setId(1L);
        StatusCategory statusCategory2 = new StatusCategory();
        statusCategory2.setId(statusCategory1.getId());
        assertThat(statusCategory1).isEqualTo(statusCategory2);
        statusCategory2.setId(2L);
        assertThat(statusCategory1).isNotEqualTo(statusCategory2);
        statusCategory1.setId(null);
        assertThat(statusCategory1).isNotEqualTo(statusCategory2);
    }
}
