package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import com.app.model.Teacher;
import com.app.repository.TeacherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

@RestController
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
}
