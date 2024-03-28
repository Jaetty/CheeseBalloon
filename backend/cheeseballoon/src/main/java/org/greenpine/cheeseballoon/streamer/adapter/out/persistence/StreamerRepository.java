package org.greenpine.cheeseballoon.streamer.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StreamerRepository extends JpaRepository<StreamerEntity,Long> {

    List<StreamerEntity> findAllByNameContaining(String query);

    StreamerEntity findByStreamerId(Long id);

}
