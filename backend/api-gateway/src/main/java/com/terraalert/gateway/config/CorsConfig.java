package com.terraalert.gateway.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.io.IOException;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public Filter corsDeduplicationFilter() {
        return new Filter() {
            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                    throws IOException, ServletException {

                HttpServletResponse httpServletResponse = (HttpServletResponse) response;

                HttpServletResponseWrapper wrappedResponse = new HttpServletResponseWrapper(httpServletResponse) {
                    @Override
                    public void addHeader(String name, String value) {
                        if ("Access-Control-Allow-Origin".equalsIgnoreCase(name)) {
                            if (containsHeader("Access-Control-Allow-Origin")) {
                                return;
                            }
                        }
                        if ("Access-Control-Allow-Credentials".equalsIgnoreCase(name)) {
                            if (containsHeader("Access-Control-Allow-Credentials")) {
                                return;
                            }
                        }
                        super.addHeader(name, value);
                    }

                    @Override
                    public void setHeader(String name, String value) {
                        if ("Access-Control-Allow-Origin".equalsIgnoreCase(name)) {
                            super.setHeader("Access-Control-Allow-Origin", value);
                            return;
                        }
                        if ("Access-Control-Allow-Credentials".equalsIgnoreCase(name)) {
                            super.setHeader("Access-Control-Allow-Credentials", value);
                            return;
                        }
                        super.setHeader(name, value);
                    }
                };

                chain.doFilter(request, wrappedResponse);
            }
        };
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://127.0.0.1:5173"
        ));
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS",
                "PATCH"
        ));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
