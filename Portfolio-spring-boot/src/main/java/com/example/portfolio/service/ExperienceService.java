package com.example.portfolio.service;

import com.example.portfolio.Model.Experience;

import java.util.List;

public interface ExperienceService {
    boolean addExperience(Long id, Experience e);

    boolean deleteExperience(Long id);

    boolean modifyExperience(Long id, Experience e);

    List<Experience> getExperiences(Long id);
}
