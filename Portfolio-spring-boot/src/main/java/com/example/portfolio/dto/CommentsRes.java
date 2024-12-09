package com.example.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentsRes {
    private Long userid;
    private String content;
    private String firstname;
    private String lastname;
    private String iconBase64;
    private String icontype;
}
