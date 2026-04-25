package com.fms.config;

import com.fms.auth.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Value("${FRONTEND_URL:http://localhost:5173}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/oauth2/**", "/login/**").permitAll()
                .anyRequest().permitAll()
            )
            .oauth2Login(oauth -> oauth
                .successHandler((request, response, authentication) -> {
                    var principal = (org.springframework.security.oauth2.core.user.OAuth2User) authentication.getPrincipal();
                    String name = principal.getAttribute("name");
                    String email = principal.getAttribute("email");

                    // get AuthService bean from Spring context
                    var context = org.springframework.web.context.support.WebApplicationContextUtils
                            .getRequiredWebApplicationContext(request.getServletContext());
                    AuthService authService = context.getBean(AuthService.class);

                    // save user in DB
                    authService.saveGoogleUser(name, email);

                    // redirect to frontend home
                    response.sendRedirect(frontendUrl + "/");
                })
            )
            .logout(logout -> logout
                .logoutSuccessUrl(frontendUrl + "/")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
            )
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }
}
