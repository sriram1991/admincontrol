package com.ps.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pancard.
 */
@Entity
@Table(name = "pancard")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pancard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 15)
    @Column(name = "pan_number", length = 15)
    private String panNumber;

    @Size(max = 12)
    @Column(name = "aadhaar_number", length = 12)
    private String aadhaarNumber;

    @Size(max = 200)
    @Column(name = "aadhaar_name", length = 200)
    private String aadhaarName;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    private PostalAddress postalAddress;

    @ManyToOne
    @JsonIgnoreProperties(value = { "category" }, allowSetters = true)
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "partyType" }, allowSetters = true)
    private Party party;

    @ManyToOne
    private User modified;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pancard id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPanNumber() {
        return this.panNumber;
    }

    public Pancard panNumber(String panNumber) {
        this.setPanNumber(panNumber);
        return this;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getAadhaarNumber() {
        return this.aadhaarNumber;
    }

    public Pancard aadhaarNumber(String aadhaarNumber) {
        this.setAadhaarNumber(aadhaarNumber);
        return this;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getAadhaarName() {
        return this.aadhaarName;
    }

    public Pancard aadhaarName(String aadhaarName) {
        this.setAadhaarName(aadhaarName);
        return this;
    }

    public void setAadhaarName(String aadhaarName) {
        this.aadhaarName = aadhaarName;
    }

    public LocalDate getBirthDate() {
        return this.birthDate;
    }

    public Pancard birthDate(LocalDate birthDate) {
        this.setBirthDate(birthDate);
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public Pancard imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Pancard createdAt(ZonedDateTime createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public Pancard updatedAt(ZonedDateTime updatedAt) {
        this.setUpdatedAt(updatedAt);
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public PostalAddress getPostalAddress() {
        return this.postalAddress;
    }

    public void setPostalAddress(PostalAddress postalAddress) {
        this.postalAddress = postalAddress;
    }

    public Pancard postalAddress(PostalAddress postalAddress) {
        this.setPostalAddress(postalAddress);
        return this;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Pancard status(Status status) {
        this.setStatus(status);
        return this;
    }

    public Party getParty() {
        return this.party;
    }

    public void setParty(Party party) {
        this.party = party;
    }

    public Pancard party(Party party) {
        this.setParty(party);
        return this;
    }

    public User getModified() {
        return this.modified;
    }

    public void setModified(User user) {
        this.modified = user;
    }

    public Pancard modified(User user) {
        this.setModified(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pancard)) {
            return false;
        }
        return id != null && id.equals(((Pancard) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pancard{" +
            "id=" + getId() +
            ", panNumber='" + getPanNumber() + "'" +
            ", aadhaarNumber='" + getAadhaarNumber() + "'" +
            ", aadhaarName='" + getAadhaarName() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
