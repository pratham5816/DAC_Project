package com.app.model;

import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="teachers")
@Getter
@Setter
public class Teacher {
    
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String mail;
    private Long instituteId;
    private String userName;
    private String firstName;
    private String lastName;
    private int Salary;
    private LocalDate date_of_joining;
    private String descAbout;
    private String streamOrSubject;
    private String ContactNumber;
    private String Address;
    @Column(nullable = false)
    private String password;

}
