package com.example.portfolio.Controller;

import com.example.portfolio.Model.Experience;
import com.example.portfolio.service.ExperienceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/experience")
public class ExperienceController {
    @Autowired
    private ExperienceService experienceService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Experience>> getEducations(@PathVariable Long id){
        List<Experience> edus = experienceService.getExperiences(id);
        return ResponseEntity.status(200).body(edus);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> addEducation(@PathVariable Long id, @RequestBody Experience e){
        boolean res = experienceService.addExperience(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add Experience");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Experience added");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEducation(@PathVariable Long id){
        experienceService.deleteExperience(id);
        return ResponseEntity.status(HttpStatus.OK).body("Experience deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editEducation(@PathVariable Long id, @RequestBody Experience e){
        boolean res = experienceService.modifyExperience(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to modify Experience");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Experience modified");
    }
}
