package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

import com.app.model.Student;
import com.app.model.StudentLogin;

import com.app.repository.StudentRepository;
import com.app.service.StudentService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
@RequestMapping("/student")
@CrossOrigin("http://localhost:5173")
public class StudentController {
    
     
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentService studentService;

    @GetMapping("/getAll")
    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/getById/{value}")
    public List<Student> getUsersbyName(@PathVariable String value){
        String sql = "Select * from Students Where first_name Like :name";
        Query query = entityManager.createNativeQuery(sql, Student.class);
        query.setParameter("name", "%" + value + "%");

        return query.getResultList();
    }

    @DeleteMapping("/DelById/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable Long id){

         Optional<Student> temp = studentRepository.findById(id);

         if(!temp.isPresent()){ return ResponseEntity.notFound().build();}
        
            studentRepository.deleteById(id);

         return ResponseEntity.ok().build();
    }


    @GetMapping("/getCount")
    public Long count(){
        return studentRepository.count();
    }

    @PostMapping("/save")
    public ResponseEntity<Student> saveStudent(@RequestBody Student student){
        studentRepository.save(student);
        return ResponseEntity.accepted().body(student);
    }

    @PostMapping("/checkLogin") // this will give the authentication that student is registered.
    public ResponseEntity<?> checkStudent(@RequestBody StudentLogin studentLogin){
        System.out.println("Inside checkLogin of StudentController");
        Optional<Student> temp = studentService.authenticateStudent(studentLogin.getEmail().trim() , studentLogin.getPassword().trim());
        if(temp.isPresent()) {
            return ResponseEntity.ok(temp.get());  // Return full Student object
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    

}
