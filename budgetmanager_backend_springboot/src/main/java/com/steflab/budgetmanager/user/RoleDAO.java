package com.steflab.budgetmanager.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<Role, Long>{
	Optional<Role> findByName(RoleName roleName);
}
