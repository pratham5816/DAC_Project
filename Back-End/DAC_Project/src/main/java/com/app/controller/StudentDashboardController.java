package com.app.controller;

import com.app.model.Student;
import com.app.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin("http://localhost:5173")
public class StudentDashboardController {

    @Autowired
    private StudentService studentService;

    /**
     * Get student profile by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentProfile(@PathVariable Long id) {
        try {
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isPresent()) {
                return ResponseEntity.ok(student.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching student profile: " + e.getMessage());
        }
    }

    /**
     * Get student grades
     */
    @GetMapping("/{id}/grades")
    public ResponseEntity<?> getStudentGrades(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return sample grades - Replace with actual StudentMarks query
            List<Map<String, Object>> grades = List.of(
                Map.of(
                    "subject", "Data Structures",
                    "courseName", "Data Structures",
                    "grade", "A+",
                    "score", 92
                ),
                Map.of(
                    "subject", "Web Development",
                    "courseName", "Web Development",
                    "grade", "A",
                    "score", 88
                ),
                Map.of(
                    "subject", "Database Design",
                    "courseName", "Database Design",
                    "grade", "A",
                    "score", 85
                )
            );

            return ResponseEntity.ok(grades);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching grades: " + e.getMessage());
        }
    }

    /**
     * Get student attendance percentage
     */
    @GetMapping("/{id}/attendance")
    public ResponseEntity<?> getStudentAttendance(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return attendance percentage
            Map<String, Object> attendance = new HashMap<>();
            attendance.put("percentage", 85);
            attendance.put("totalClasses", 50);
            attendance.put("attendedClasses", 42);

            return ResponseEntity.ok(attendance);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching attendance: " + e.getMessage());
        }
    }

    /**
     * Get student courses
     */
    @GetMapping("/{id}/courses")
    public ResponseEntity<?> getStudentCourses(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return sample courses - Replace with actual course enrollment query
            List<Map<String, Object>> courses = List.of(
                Map.of(
                    "courseId", 1,
                    "courseName", "Data Structures",
                    "instructor", "Dr. Smith",
                    "progress", 75
                ),
                Map.of(
                    "courseId", 2,
                    "courseName", "Web Development",
                    "instructor", "Prof. Johnson",
                    "progress", 80
                ),
                Map.of(
                    "courseId", 3,
                    "courseName", "Database Design",
                    "instructor", "Dr. Williams",
                    "progress", 70
                )
            );

            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching courses: " + e.getMessage());
        }
    }

    /**
     * Get student assignments
     */
    @GetMapping("/{id}/assignments")
    public ResponseEntity<?> getStudentAssignments(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return assignment statistics
            Map<String, Object> assignments = new HashMap<>();
            assignments.put("completed", 8);
            assignments.put("total", 12);
            assignments.put("pending", 4);

            return ResponseEntity.ok(assignments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching assignments: " + e.getMessage());
        }
    }

    /**
     * Get upcoming events/deadlines
     */
    @GetMapping("/{id}/events")
    public ResponseEntity<?> getStudentEvents(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return sample events
            List<Map<String, Object>> events = List.of(
                Map.of(
                    "eventId", 1,
                    "title", "Math Exam",
                    "date", "2025-12-10",
                    "type", "Exam"
                ),
                Map.of(
                    "eventId", 2,
                    "title", "Project Submission",
                    "date", "2025-12-15",
                    "type", "Assignment"
                ),
                Map.of(
                    "eventId", 3,
                    "title", "Class Presentation",
                    "date", "2025-12-20",
                    "type", "Presentation"
                )
            );

            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching events: " + e.getMessage());
        }
    }

    /**
     * Get student marks
     */
    @GetMapping("/{id}/marks")
    public ResponseEntity<?> getStudentMarks(@PathVariable Long id) {
        try {
            // Check if student exists
            Optional<Student> student = studentService.getStudentById(id);
            if (student.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Return sample marks
            List<Map<String, Object>> marks = List.of(
                Map.of("subject", "English", "marks", 85),
                Map.of("subject", "Math", "marks", 92),
                Map.of("subject", "Science", "marks", 88)
            );

            return ResponseEntity.ok(marks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching marks: " + e.getMessage());
        }
    }

    /**
     * Get all students
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllStudents() {
        try {
            List<Student> students = studentService.getAllStudents();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching students: " + e.getMessage());
        }
    }

    /**
     * Update student profile
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudentProfile(@PathVariable Long id, @RequestBody Student student) {
        try {
            Optional<Student> existingStudent = studentService.getStudentById(id);
            if (existingStudent.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
            }

            // Update logic here
            return ResponseEntity.ok("Student profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating profile: " + e.getMessage());
        }
    }
}
