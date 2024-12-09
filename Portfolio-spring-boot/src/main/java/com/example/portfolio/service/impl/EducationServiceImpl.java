package com.example.portfolio.service.impl;

import com.example.portfolio.Model.Education;
import com.example.portfolio.Repository.EducationRepository;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.service.EducationService;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EducationRepository educationRepository;
    @Override
    public boolean addEducation(Long id, Education e) {
        Education edu = userRepository.findById(id).map(user -> {
            e.setUser(user);
            return educationRepository.save(e);
        }).orElseThrow(() -> new ExecutionException("Not found user with id = " + id));

        if(edu!=null){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteEducation(Long id) {
        educationRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean modifyEducation(Long id, Education e) {
        Education edu = educationRepository.findById(id).get();
        edu.setGrade(e.getGrade());
        edu.setEndyear(e.getEndyear());
        edu.setDegree((e.getDegree()));
        edu.setEndmonth(e.getEndmonth());
        edu.setDescription(e.getDescription());
        edu.setSchool(e.getSchool());
        edu.setStartmonth(e.getStartmonth());
        edu.setStartyear(e.getStartyear());
        edu.setStudyfield(e.getStudyfield());
        Education ed = educationRepository.save(edu);
        if(ed!=null){
            return true;
        }
        return false;
    }

    @Override
    public List<Education> getEducations(Long id) {
        List<Education> edu = userRepository.findById(id).get().getEducationSet();
        return edu;
    }
}
