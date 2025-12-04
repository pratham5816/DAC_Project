package com.app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Admin")         // admin workspace will be separate and will be provided with additional operations;
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue
    private Long id;
    private String fullName;
    private String password;
    private String userName;
    private String hiddenDetails;
}
