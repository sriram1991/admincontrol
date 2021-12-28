package com.sriram.adminproject.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Pancard.
 */
@Entity
@Table(name = "pancard")
public class Pancard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 254)
    @Column(name = "email", length = 254)
    private String email;

    @Min(value = 10)
    @Max(value = 13)
    @Column(name = "mobile")
    private Integer mobile;

    @Size(max = 11)
    @Column(name = "panid", length = 11)
    private String panid;

    @Max(value = 12)
    @Column(name = "aadhaarno")
    private Integer aadhaarno;

    @Size(max = 254)
    @Column(name = "nameasaadhaar", length = 254)
    private String nameasaadhaar;

    @Size(max = 10)
    @Column(name = "panstatus", length = 10)
    private String panstatus;

    @Column(name = "dob")
    private LocalDate dob;

    @Size(max = 500)
    @Column(name = "address", length = 500)
    private String address;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pancard id(Long id) {
        this.id = id;
        return this;
    }

    public String getEmail() {
        return this.email;
    }

    public Pancard email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getMobile() {
        return this.mobile;
    }

    public Pancard mobile(Integer mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(Integer mobile) {
        this.mobile = mobile;
    }

    public String getPanid() {
        return this.panid;
    }

    public Pancard panid(String panid) {
        this.panid = panid;
        return this;
    }

    public void setPanid(String panid) {
        this.panid = panid;
    }

    public Integer getAadhaarno() {
        return this.aadhaarno;
    }

    public Pancard aadhaarno(Integer aadhaarno) {
        this.aadhaarno = aadhaarno;
        return this;
    }

    public void setAadhaarno(Integer aadhaarno) {
        this.aadhaarno = aadhaarno;
    }

    public String getNameasaadhaar() {
        return this.nameasaadhaar;
    }

    public Pancard nameasaadhaar(String nameasaadhaar) {
        this.nameasaadhaar = nameasaadhaar;
        return this;
    }

    public void setNameasaadhaar(String nameasaadhaar) {
        this.nameasaadhaar = nameasaadhaar;
    }

    public String getPanstatus() {
        return this.panstatus;
    }

    public Pancard panstatus(String panstatus) {
        this.panstatus = panstatus;
        return this;
    }

    public void setPanstatus(String panstatus) {
        this.panstatus = panstatus;
    }

    public LocalDate getDob() {
        return this.dob;
    }

    public Pancard dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return this.address;
    }

    public Pancard address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return this.user;
    }

    public Pancard user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
            ", email='" + getEmail() + "'" +
            ", mobile=" + getMobile() +
            ", panid='" + getPanid() + "'" +
            ", aadhaarno=" + getAadhaarno() +
            ", nameasaadhaar='" + getNameasaadhaar() + "'" +
            ", panstatus='" + getPanstatus() + "'" +
            ", dob='" + getDob() + "'" +
            ", address='" + getAddress() + "'" +
            "}";
    }
}
