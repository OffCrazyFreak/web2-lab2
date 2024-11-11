package web.lab.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import web.lab.security.model.AppUser;
import web.lab.security.repository.AppUserRepository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class AppUserController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private AppUserRepository appUserRepository;

    private final ConcurrentHashMap<String, String> csrfTokens = new ConcurrentHashMap<>();

    @GetMapping("/injection")
    public List<AppUser> vulnerableSearch(@RequestParam String username) throws Exception {
        List<AppUser> users = new ArrayList<>();
        String sql = "SELECT * FROM app_user WHERE username = '" + username + "'";
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {

            while (resultSet.next()) {
                AppUser user = new AppUser();
                user.setId(resultSet.getLong("id"));
                user.setUsername(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                users.add(user);
            }
        }
        return users;
    }

    @GetMapping
    public List<AppUser> secureSearch(@RequestParam String username) {
        return appUserRepository.findByUsername(username);
    }

    @PostMapping
    public String addUser(@RequestBody AppUser user) {
        user.setPassword(String.valueOf(user.getPassword().hashCode()));
        appUserRepository.save(user);
        return "User added successfully";
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Optional<AppUser> optionalUser = appUserRepository.findByUsername(username).stream().findFirst();
        String hashedPassword = String.valueOf(password.hashCode());

        if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(hashedPassword)) {
            throw new RuntimeException("Invalid username or password");
        }

        String csrfToken = UUID.randomUUID().toString();
        csrfTokens.put(username, csrfToken);

        return csrfToken;
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String username) {
        csrfTokens.remove(username);
        return "User logged out successfully";
    }

    @GetMapping("/change-data-csrf")
    public String updateUsernameCSRF(@RequestParam String username, @RequestParam String newUsername, @RequestParam String token) {
        String storedToken = csrfTokens.get(username);
        if (storedToken == null || !storedToken.equals(token)) {
            throw new RuntimeException("Invalid CSRF token");
        }

        AppUser user = appUserRepository.findByUsername(username).stream().findFirst()
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(newUsername);
        appUserRepository.save(user);

        return "Username updated successfully";
    }

    @GetMapping("/change-data")
    public String updateUsername(@RequestParam String username, @RequestParam String newUsername) {
        AppUser user = appUserRepository.findByUsername(username).stream().findFirst()
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(newUsername);
        appUserRepository.save(user);
        return "Username updated successfully";
    }
}
