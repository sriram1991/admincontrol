package com.sriram.adminproject.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

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

    @Column(name = "pancardupload")
    private String pancardupload;

    @Size(max = 10)
    @Column(name = "panstatus", length = 10)
    private String panstatus;

    @Column(name = "dob")
    private LocalDate dob;

    @Size(max = 500)
    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "created_by")
    private User createdby;

    public User getCreatedby() {
        return createdby;
    }

    public void setCreatedby(User createdby) {
        this.createdby = createdby;
    }

    @Generated(GenerationTime.INSERT)
    @Basic(optional = false)
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Generated(GenerationTime.ALWAYS)
    @Column(name = "updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @ManyToOne
    private User user;

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

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

    public String getPanstatus() {
        return panstatus;
    }

    public void setPanstatus(String panstatus) {
        this.panstatus = panstatus;
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

    public String getPancardupload() {
        return pancardupload;
    }

    public void setPancardupload(String pancardupload) {
        this.pancardupload = pancardupload;
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
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return (
            "Pancard [id=" +
            id +
            ", email=" +
            email +
            ", mobile=" +
            mobile +
            ", panid=" +
            panid +
            ", aadhaarno=" +
            aadhaarno +
            ", nameasaadhaar=" +
            nameasaadhaar +
            ", pancardupload=" +
            pancardupload +
            ", panstatus=" +
            panstatus +
            ", dob=" +
            dob +
            ", address=" +
            address +
            ", createdby=" +
            createdby +
            ", createdAt=" +
            createdAt +
            ", updatedAt=" +
            updatedAt +
            ", user=" +
            user +
            "]"
        );
    }
}
