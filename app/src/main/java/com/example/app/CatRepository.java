package com.example.app;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CatRepository extends CrudRepository<Cat, Long> {
    @Query("SELECT c FROM Cat c WHERE c.name = :name")
    public Cat getCatByName(@Param("name") String name);

    @Query("Select c FROM Cat c WHERE c.username = :username") 
    public List<Cat> getCatByUsername(@Param("username") String username);
    
    @Modifying
    @Query("UPDATE Cat c SET c.picture = :picture WHERE c.name = :name")
    public void updateCat(@Param("name") String name, @Param("picture") String picture);

    @Modifying
    @Query(value = "INSERT INTO Cat (name, user, picture) VALUES (:name, :user, :picture)", nativeQuery = true)
    public void insertCat(@Param("name") String name, @Param("user") long user, @Param("picture") String picture);
}
