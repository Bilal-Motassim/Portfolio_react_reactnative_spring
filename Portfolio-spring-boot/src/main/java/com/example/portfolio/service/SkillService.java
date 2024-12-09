package com.example.portfolio.service;

import com.example.portfolio.Model.Skill;

import java.util.List;

public interface SkillService {
    boolean addSkill(Long id, Skill e);

    boolean deleteSkill(Long id);

    boolean modifySkill(Long id, Skill e);

    List<Skill> getSkill(Long id);
}
