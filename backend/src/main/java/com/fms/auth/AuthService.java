package com.fms.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    public String register(RegisterRequest request) {

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser.isPresent()) {
            return "User already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());
        user.setProvider("LOCAL");

        userRepository.save(user);

        return "User registered successfully";
    }

    // LOGIN
    public String login(LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }

    public User getUserByEmail(String email) {
             return userRepository.findByEmail(email).orElse(null);
    }

    public long getUserCount() {
        return userRepository.count();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveGoogleUser(String name, String email) {

    Optional<User> existingUser = userRepository.findByEmail(email);

    // already exist → return it
    if (existingUser.isPresent()) {
        return existingUser.get();
    }

    // new user → create
    User user = new User();
    user.setName(name);
    user.setEmail(email);
    user.setPassword(""); // Google user → no password
    user.setRole("USER");
    user.setProvider("GOOGLE");

    return userRepository.save(user);
}
}
