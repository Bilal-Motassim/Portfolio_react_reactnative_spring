package com.example.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class PostRes {
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private String likes;
    private List<Long> userlikes = new ArrayList<>();
    private String headline;
    private String Profilebase64;
    private Long userid;
    private Long postid;
    private String firstname;
    private String lastname;
    private String base64;
    private String mediatype;

    public void addlike(Long id){
        userlikes.add(id);
    }
}
