package com.fms.auth;

import com.fms.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    origins = {"http://localhost:5173", "http://localhost:5174"},
    allowCredentials = "true"
)
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

    @GetMapping("/google-user")
    public Object getGoogleUser(Authentication authentication) {
        if (authentication == null) {
            return "User not authenticated";
        }

        return authentication.getPrincipal();
    }

    @GetMapping("/admin/users")
    public ApiResponse<List<User>> getAllUsers() {
        return ApiResponse.success("Users fetched successfully", authService.getAllUsers());
    }

    @GetMapping("/admin/users/count")
    public ApiResponse<Long> getUserCount() {
        return ApiResponse.success("User count fetched successfully", authService.getUserCount());
    }
}
