package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Find student by email and password
     */
    Optional<Student> findByMailAndPassword(String mail, String password);

    /**
     * Find student by username
     */
    Optional<Student> findByUserName(String userName);

    /**
     * Find student by email
     */
    Optional<Student> findByMail(String mail);

    /**
     * Find student by contact number
     */
    Optional<Student> findByContactNumber(String contactNumber);
    
}
