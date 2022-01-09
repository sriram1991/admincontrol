package com.ps.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ps.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PancardTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pancard.class);
        Pancard pancard1 = new Pancard();
        pancard1.setId(1L);
        Pancard pancard2 = new Pancard();
        pancard2.setId(pancard1.getId());
        assertThat(pancard1).isEqualTo(pancard2);
        pancard2.setId(2L);
        assertThat(pancard1).isNotEqualTo(pancard2);
        pancard1.setId(null);
        assertThat(pancard1).isNotEqualTo(pancard2);
    }
}
