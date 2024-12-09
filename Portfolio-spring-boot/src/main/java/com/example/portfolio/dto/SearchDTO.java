package com.example.portfolio.dto;

import com.example.portfolio.Model.User;
import com.example.portfolio.utils.FileStorageUtil;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;

public class SearchDTO {
    public static SearchRes toRes(User u){
        SearchRes res = new SearchRes();
        res.setId(u.getId());
        res.setFirstname(u.getFirstName());
        res.setLastname(u.getLastName());
        if(u.getProfilepicpath()==null){
            return res;
        }
        byte[] bytes = null;
        Path path = Path.of(u.getProfilepicpath());
        try{
            if(Files.exists(path)){
                bytes = FileStorageUtil.deCompressFile(Files.readAllBytes(path));
            }
        }catch (IOException | DataFormatException ignored){
        }
        res.setPic(Base64.getEncoder().encodeToString(bytes));
        return res;
    }

    public static List<SearchRes> toListSearch(List<User> list){
        List<SearchRes> l = new ArrayList<>();
        for (User u: list) {
            l.add(toRes(u));
        }
        return l;
    }
}
