package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.model.Student;
import com.app.repository.StudentRepository;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    // Register/Create new student
    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }
    
    // Update student
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setMail(studentDetails.getMail());
        student.setUserName(studentDetails.getUserName());
        student.setPassword(studentDetails.getPassword());
        student.setContactNumber(studentDetails.getContactNumber());
        student.setCourse(studentDetails.getCourse());
        
        return studentRepository.save(student);
    }
    
    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    
    // Authenticate student (login)
    public Optional<Student> authenticateStudent(String mail, String password) {
        return studentRepository.findByMailAndPassword(mail, password);
    }
    
    // Check if student exists by email
    public boolean existsByMail(String mail) {
        return studentRepository.findByMail(mail).isPresent();
    }
    
    // Check if student exists by username
    public boolean existsByUserName(String userName) {
        return studentRepository.findByUserName(userName).isPresent();
    }
    
    // Get student by email
    public Optional<Student> getStudentByMail(String mail) {
        return studentRepository.findByMail(mail);
    }
    
    // Get student by username
    public Optional<Student> getStudentByUserName(String userName) {
        return studentRepository.findByUserName(userName);
    }
    
    // Get student count
    public long getStudentCount() {
        return studentRepository.count();
    }
    
   
}
