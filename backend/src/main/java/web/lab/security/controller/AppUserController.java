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

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private AppUserRepository appUserRepository;

    // Endpoint ranjiv na SQL Injection
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

    // Sigurni endpoint koji štiti od SQL Injectiona
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

    // Endpoint za ažuriranje lozinke koristeći PUT mapping na glavnoj ruti

    @GetMapping("/password")
    public String updatePassword(@RequestParam Long id, @RequestParam String newPassword) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(newPassword);
        appUserRepository.save(user);
        return "Password updated successfully";
    }
}
