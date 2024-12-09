package com.example.portfolio.service.impl;

import com.example.portfolio.Model.Experience;
import com.example.portfolio.Model.Skill;
import com.example.portfolio.Repository.SkillRepository;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.service.SkillService;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public boolean addSkill(Long id, Skill e) {
        Skill edu = userRepository.findById(id).map(user -> {
            e.setUser(user);
            return skillRepository.save(e);
        }).orElseThrow(() -> new ExecutionException("Not found user with id = " + id));

        if(edu!=null){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteSkill(Long id) {
        skillRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean modifySkill(Long id, Skill e) {
        Skill s = skillRepository.findById(id).get();
        s.setSkill(e.getSkill());
        Skill ep = skillRepository.save(s);
        if(ep!=null){
            return true;
        }
        return false;
    }

    @Override
    public List<Skill> getSkill(Long id) {
        List<Skill> edu = userRepository.findById(id).get().getSkillList();
        return edu;
    }
}
