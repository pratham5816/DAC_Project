package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.app.model.Student;
import com.app.repository.StudentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
public class StudentController {
    
     
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students")
    public List<Student> getStudents(){
        return studentRepository.findAll();
    }



    @SuppressWarnings("unchecked")
    @GetMapping("/students/{value}")
    public List<Student> getUsersbyName(@PathVariable String value){
        String sql = "Select * from Students Where first_name Like :name";
        Query query = entityManager.createNativeQuery(sql, Student.class);
        query.setParameter("name", "%" + value + "%");

        return query.getResultList();
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable Long id){

         Optional<Student> temp = studentRepository.findById(id);
         
         if(!temp.isPresent()){ return ResponseEntity.notFound().build();}
        
            studentRepository.deleteById(id);

         return ResponseEntity.ok().build();
    }


    @PostMapping("/students")
    public ResponseEntity<Student> saveStudent(@RequestBody Student student){
        studentRepository.save(student);
        return ResponseEntity.accepted().body(student);
    }

    

}
