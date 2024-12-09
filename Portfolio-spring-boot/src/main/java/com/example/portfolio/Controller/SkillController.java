package com.example.portfolio.Controller;

import com.example.portfolio.Model.Skill;
import com.example.portfolio.service.SkillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/skill")
public class SkillController {
    @Autowired
    private SkillService skillService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Skill>> getEducations(@PathVariable Long id){
        List<Skill> edus = skillService.getSkill(id);
        return ResponseEntity.status(200).body(edus);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> addEducation(@PathVariable Long id, @RequestBody Skill e){
        boolean res = skillService.addSkill(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add Skill");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Skill added");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEducation(@PathVariable Long id){
        skillService.deleteSkill(id);
        return ResponseEntity.status(HttpStatus.OK).body("Experience deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editEducation(@PathVariable Long id, @RequestBody Skill e){
        boolean res = skillService.modifySkill(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to modify Skill");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Skill modified");
    }
}
