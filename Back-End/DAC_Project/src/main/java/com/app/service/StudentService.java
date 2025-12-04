package com.app.service;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.StudentLogin;

@RestController
public class StudentService {
    
    @PostMapping("/CheckStudent")
    public boolean checkStudent(@RequestBody StudentLogin studentLogin){
        if(studentLogin.getPassword().equals("123")){
            return true;
        }
        return false;
    }
}
