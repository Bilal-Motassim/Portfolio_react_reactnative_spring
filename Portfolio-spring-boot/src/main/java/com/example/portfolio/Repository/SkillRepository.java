package com.example.portfolio.Repository;

import com.example.portfolio.Model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    Skill findByUserId(Long id);
}
