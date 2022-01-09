package com.ps.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ps.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PartyTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Party.class);
        Party party1 = new Party();
        party1.setId(1L);
        Party party2 = new Party();
        party2.setId(party1.getId());
        assertThat(party1).isEqualTo(party2);
        party2.setId(2L);
        assertThat(party1).isNotEqualTo(party2);
        party1.setId(null);
        assertThat(party1).isNotEqualTo(party2);
    }
}
