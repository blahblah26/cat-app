package com.example.app;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Long>{
    @Query("SELECT u FROM User u WHERE u.username = :username")
    public User getUserByUsername(@Param("username") String username);
    
    @Query("DELETE u FROM User u WHERE u.username = :username")
    public void deleteUserByUsername(@Param("username") String username);

    @Query("UPDATE u SET u.password = :password, u.email = :email, u.profile = :profile FROM User u WHERE u.username = :username")
    public void updateUser(@Param("username") String username, @Param("password") String password, @Param("email") String email, @Param("profile") String profile);

    @Query("INSERT u INTO User u VALUES (:username, :password, :email, :profile, :role)")
    public void insertUser(@Param("username") String username, @Param("password") String password, @Param("email") String email, @Param("profile") String profile, 
    @Param("role") String role);
}
