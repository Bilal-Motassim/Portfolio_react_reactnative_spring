package com.example.portfolio.dto;

import lombok.Data;

import java.util.Base64;

@Data
public class ImageDTO {
    String type;
    String base64;

    public ImageDTO(String t, byte[] i){
        type = t;
        base64 = Base64.getEncoder().encodeToString(i);
    }
}
