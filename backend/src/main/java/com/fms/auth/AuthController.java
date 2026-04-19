package com.fms.auth;

import com.fms.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);

        if ("User registered successfully".equals(message)) {
            return new ApiResponse<>(true, message, null);
        }

        return new ApiResponse<>(false, message, null);
    }

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request) {
        String message = authService.login(request);

        if ("Login successful".equals(message)) {
            return new ApiResponse<>(true, message, null);
        }

        return new ApiResponse<>(false, message, null);
    }

    @GetMapping("/me")
    public ApiResponse<User> getCurrentUser(@RequestParam String email) {
    User user = authService.getUserByEmail(email);

        if (user == null) {
            return new ApiResponse<>(false, "User not found", null);
        }

        return new ApiResponse<>(true, "User fetched successfully", user);
}
}