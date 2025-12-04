package com.app.model;

import org.springframework.beans.factory.annotation.Configurable;


import lombok.Getter;
import lombok.Setter;

@Configurable
@Getter
@Setter
public class StudentLogin {
    private String email;
     private String password;
}
