package com.steflab.budgetmanager.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserDAO userDAO;
	
	public Optional<UserDTO> getUserById(long id) {
		
		User userEntity = userDAO.findById(id).orElse(null);
		if(userEntity == null) {
			return Optional.empty();
		}
		return Optional.of(toUserDTO(userEntity));
	}
	
	public Optional<UserDTO> getUserByUsernameOrEmail(String usernameOrEmail) {
		User user = userDAO.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail).orElse(null);
		if(user == null) {
			return Optional.empty();
		}
		
		return Optional.of(toUserDTO(user));
	}
	
//	public UserDTO createUser(User userIn) {
//		User userEntity = new User();
//	}
//	
//	private User toUserEntity(UserDTO userDto) {
//		User userEntity = new User();
//		
//		userEntity.setUsername(userDto.getUsername());
//		userEntity.setEmail(userDto.getEmail());
//		userEntity.set
//	}
	
	private UserDTO toUserDTO(User user) {
		UserDTO userDto = new UserDTO();
		
		userDto.setId(user.getId());
		userDto.setUsername(user.getUsername());
		userDto.setEmail(user.getEmail());
		userDto.setUpdateAt(user.getUpdateAt());
		userDto.setCreatedAt(user.getCreatedAt());
		
		return userDto;
	}
	
	
}
