package org.greenpine.cheeseballoon.live.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
    @Query(value = "SELECT * " +
            "FROM  categories " +
            "WHERE category LIKE CONCAT(:query, '%') " +
            "ORDER BY category ASC ", nativeQuery = true)
    List<CategoryEntity> findAllByQuery(String query);

    @Query(value = "SELECT * " +
            "FROM  categories " +
            "WHERE category LIKE CONCAT(:head, '%') "
            //+"AND SUBSTRING(chosung, :idx, 1 = :tail "
            , nativeQuery = true)
    List<CategoryEntity> findAllByHeadAndTail(String head);//, String tail,int idx

    List<CategoryEntity> findAllByChosungIsNull();

}
