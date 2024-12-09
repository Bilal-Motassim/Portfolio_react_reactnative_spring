package com.example.portfolio.Repository;

import com.example.portfolio.Model.Post;
import com.example.portfolio.Model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long id);
}
