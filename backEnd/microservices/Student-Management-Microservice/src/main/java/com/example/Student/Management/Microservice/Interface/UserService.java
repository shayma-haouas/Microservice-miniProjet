package com.example.Student.Management.Microservice.Interface;


import com.example.Student.Management.Microservice.Entities.User;

public interface UserService {


    User register(User user);
    String login(String email, String password);
    void verifyUser(String token);

}
