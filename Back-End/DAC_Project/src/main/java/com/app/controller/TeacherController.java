package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.app.model.Teacher;
import com.app.model.TeacherLogin;
import com.app.repository.TeacherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
@RequestMapping("/teacher")
@CrossOrigin("http://localhost:5173")

public class TeacherController {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping("/teachers")
    public ResponseEntity<List<Teacher>> getTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return ResponseEntity.ok(teachers);
    }

    @SuppressWarnings("unchecked")
    @GetMapping("/teachers/{value}")
    public ResponseEntity<List<Teacher>> getTeachersByName(@PathVariable String value) {
        String sql = "Select * from Teachers Where first_name Like :name";
        Query query = entityManager.createNativeQuery(sql, Teacher.class);
        query.setParameter("name", "%" + value + "%");
        List<Teacher> result = query.getResultList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/teachers")
    public ResponseEntity<Teacher> saveTeacher(@RequestBody Teacher teacher) {
        Teacher saved = teacherRepository.save(teacher);
        return ResponseEntity.status(201).body(saved);
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        Optional<Teacher> temp = teacherRepository.findById(id);

        if (!temp.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        teacherRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/checkLogin")
    public ResponseEntity<?> checkLogin(@RequestBody TeacherLogin teacherLogin){
        
        Optional<Teacher> temp = teacherRepository.findByMailAndPassword(teacherLogin.getEmail(), teacherLogin.getPassword());

        if(!temp.isPresent()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User");
        }
        
        return ResponseEntity.ok(temp.get());
    }

    // Get teacher profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            return ResponseEntity.ok(teacher.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Get classes for a teacher (placeholder)
    @GetMapping("/{id}/classes")
    public ResponseEntity<List<Teacher>> getTeacherClasses(@PathVariable Long id) {
        // Placeholder - return empty list or sample data
        return ResponseEntity.ok(List.of());
    }

    // Get students for a teacher (placeholder)
    @GetMapping("/{id}/students")
    public ResponseEntity<List<Teacher>> getTeacherStudents(@PathVariable Long id) {
        // Placeholder - return empty list or sample data
        return ResponseEntity.ok(List.of());
    }
}
