package com.example.portfolio.Controller;

import com.example.portfolio.Model.Education;
import com.example.portfolio.service.EducationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/education")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Education>> getEducations(@PathVariable Long id){
        List<Education> edus = educationService.getEducations(id);
        return ResponseEntity.status(200).body(edus);
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> addEducation(@PathVariable Long id, @RequestBody Education e){
        boolean res = educationService.addEducation(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add education");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Education added");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEducation(@PathVariable Long id){
        educationService.deleteEducation(id);
        return ResponseEntity.status(HttpStatus.OK).body("Education deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editEducation(@PathVariable Long id, @RequestBody Education e){
        boolean res = educationService.modifyEducation(id, e);
        if(!res){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to modify education");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Education modified");
    }
}
