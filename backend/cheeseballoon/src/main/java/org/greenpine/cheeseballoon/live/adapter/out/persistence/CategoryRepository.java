package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
    @Query(value = "SELECT * " +
            "FROM  categories " +
            "WHERE category LIKE CONCAT(:query, '%') ", nativeQuery = true)
    List<CategoryEntity> findAllByQuery(String query);
}
