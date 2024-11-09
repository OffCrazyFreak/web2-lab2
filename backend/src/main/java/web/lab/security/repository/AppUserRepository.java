package web.lab.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.lab.security.model.AppUser;

import java.util.List;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findByUsername(String username);
}
