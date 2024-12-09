package com.example.portfolio.service;

import com.example.portfolio.Model.Education;

import java.util.List;

public interface EducationService {
    boolean addEducation(Long id, Education e);

    boolean deleteEducation(Long id);

    boolean modifyEducation(Long id, Education e);

    List<Education> getEducations(Long id);
}
