package com.example.portfolio.service.impl;

import com.example.portfolio.Model.Education;
import com.example.portfolio.Model.Experience;
import com.example.portfolio.Repository.ExperienceRepository;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.service.ExperienceService;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExperienceRepository experienceRepository;
    @Override
    public boolean addExperience(Long id, Experience e) {
        Experience edu = userRepository.findById(id).map(user -> {
            e.setUser(user);
            return experienceRepository.save(e);
        }).orElseThrow(() -> new ExecutionException("Not found user with id = " + id));

        if(edu!=null){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteExperience(Long id) {
        experienceRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean modifyExperience(Long id, Experience e) {
        Experience exp = experienceRepository.findById(id).get();
        exp.setCompany(e.getCompany());
        exp.setCurrentwork(e.isCurrentwork());
        exp.setEndyear(e.getEndyear());
        exp.setEmptype(e.getEmptype());
        exp.setEndmonth(e.getEndmonth());
        exp.setDescription(e.getDescription());
        exp.setLocation(e.getLocation());
        exp.setTitle(e.getTitle());
        exp.setLocationtype(e.getLocationtype());
        exp.setStartmonth(e.getStartmonth());
        exp.setEndmonth(e.getEndmonth());
        Experience ep = experienceRepository.save(exp);
        if(ep!=null){
            return true;
        }
        return false;
    }

    @Override
    public List<Experience> getExperiences(Long id) {
        List<Experience> edu = userRepository.findById(id).get().getExperienceList();
        return edu;
    }
}
