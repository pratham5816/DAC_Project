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
@Table(name="Notice")
@Getter
@Setter
public class Notice {
    @Id
    @GeneratedValue
    private Long id;
    @Column(length = 1000)
    private String paragraph;
    private String instituteCoordinator;
    private String courseCoordinator;
    private LocalDate date;
}
