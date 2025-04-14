package com.example.Reclamation.Response.Management.Microservice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRec;

    private String description;



    @Enumerated(EnumType.STRING)
    private TypeReclamation typeRec;

    public Long getIdRec() {
        return idRec;
    }

    public void setIdRec(Long idRec) {
        this.idRec = idRec;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public TypeReclamation getTypeRec() {
        return typeRec;
    }

    public void setTypeRec(TypeReclamation typeRec) {
        this.typeRec = typeRec;
    }

    public TypeStatus getTypeStatus() {
        return typeStatus;
    }

    public void setTypeStatus(TypeStatus typeStatus) {
        this.typeStatus = typeStatus;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Reponse getReponse() {
        return reponse;
    }

    public void setReponse(Reponse reponse) {
        this.reponse = reponse;
    }





    @Enumerated(EnumType.STRING)
    private TypeStatus typeStatus;

    @Temporal(TemporalType.DATE)
    private Date createDate;

    @OneToOne(mappedBy = "reclamation", cascade = CascadeType.ALL)
    @JsonIgnore
    private Reponse reponse;

}

