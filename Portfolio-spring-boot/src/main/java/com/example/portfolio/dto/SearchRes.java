package com.example.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchRes {
    private Long id;
    private String firstname;
    private String lastname;
    private String pic;
}
