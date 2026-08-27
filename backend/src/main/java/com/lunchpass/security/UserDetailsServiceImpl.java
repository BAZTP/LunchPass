package com.lunchpass.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Note: Inject UserRepository here to fetch real users.
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Temporary placeholder logic for compiling
        if ("admin".equals(username)) {
            return UserPrincipal.create(1L, "admin", "$2a$10$xyz...", "ROLE_ADMIN");
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
