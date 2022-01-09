package com.ps.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PostalAddress.
 */
@Entity
@Table(name = "postal_address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PostalAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 100)
    @Column(name = "to_name", length = 100)
    private String toName;

    @Size(max = 200)
    @Column(name = "address_1", length = 200)
    private String address1;

    @Size(max = 200)
    @Column(name = "address_2", length = 200)
    private String address2;

    @Size(max = 60)
    @Column(name = "city", length = 60)
    private String city;

    @Size(max = 60)
    @Column(name = "landmark", length = 60)
    private String landmark;

    @Size(max = 10)
    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Column(name = "is_indian_address")
    private Boolean isIndianAddress;

    @Size(max = 255)
    @Column(name = "note", length = 255)
    private String note;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PostalAddress id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToName() {
        return this.toName;
    }

    public PostalAddress toName(String toName) {
        this.setToName(toName);
        return this;
    }

    public void setToName(String toName) {
        this.toName = toName;
    }

    public String getAddress1() {
        return this.address1;
    }

    public PostalAddress address1(String address1) {
        this.setAddress1(address1);
        return this;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return this.address2;
    }

    public PostalAddress address2(String address2) {
        this.setAddress2(address2);
        return this;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return this.city;
    }

    public PostalAddress city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLandmark() {
        return this.landmark;
    }

    public PostalAddress landmark(String landmark) {
        this.setLandmark(landmark);
        return this;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getPostalCode() {
        return this.postalCode;
    }

    public PostalAddress postalCode(String postalCode) {
        this.setPostalCode(postalCode);
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Boolean getIsIndianAddress() {
        return this.isIndianAddress;
    }

    public PostalAddress isIndianAddress(Boolean isIndianAddress) {
        this.setIsIndianAddress(isIndianAddress);
        return this;
    }

    public void setIsIndianAddress(Boolean isIndianAddress) {
        this.isIndianAddress = isIndianAddress;
    }

    public String getNote() {
        return this.note;
    }

    public PostalAddress note(String note) {
        this.setNote(note);
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PostalAddress)) {
            return false;
        }
        return id != null && id.equals(((PostalAddress) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PostalAddress{" +
            "id=" + getId() +
            ", toName='" + getToName() + "'" +
            ", address1='" + getAddress1() + "'" +
            ", address2='" + getAddress2() + "'" +
            ", city='" + getCity() + "'" +
            ", landmark='" + getLandmark() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", isIndianAddress='" + getIsIndianAddress() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
