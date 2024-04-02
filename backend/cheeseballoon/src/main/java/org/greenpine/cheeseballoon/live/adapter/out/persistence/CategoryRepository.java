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

    @Query(value ="SELECT c.* FROM live_logs ll "+
    "JOIN categories c ON ll.category_id = c.category_id " +
    "JOIN ( SELECT cycle_log_id FROM cycle_logs "+
        "ORDER BY cycle_log_id DESC LIMIT 10) lc "+
        "ON ll.cycle_log_id = lc.cycle_log_id "+
    "GROUP BY ll.category_id "+
    "ORDER BY SUM(ll.viewer_cnt) DESC "+
    "LIMIT :limit "
    , nativeQuery = true)
    List<CategoryEntity> findHot(Integer limit);

}
