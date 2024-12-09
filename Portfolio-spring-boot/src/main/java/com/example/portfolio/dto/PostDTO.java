package com.example.portfolio.dto;

import com.example.portfolio.Model.Post;
import com.example.portfolio.Model.User;
import com.example.portfolio.utils.FileStorageUtil;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;

public class PostDTO {
    public static PostRes toRes(Post p){
        PostRes res = new PostRes();
        res.setFirstname(p.getUser().getFirstName());
        res.setLastname(p.getUser().getLastName());

        res.setTitle(p.getTitle());
        res.setDescription(p.getDescription());
        res.setUserid(p.getUser().getId());
        res.setPostid(p.getId());
        res.setCreatedAt(p.getCreatedAt());
        res.setLikes(String.valueOf(p.getLikedByUsers().size()));
        res.setHeadline(p.getUser().getHeadline());

        for (User u: p.getLikedByUsers()) {
            res.addlike(u.getId());
        }

        if(p.getUser().getProfilepicpath()!=null){
            byte[] bytes = null;
            Path path = Path.of(p.getUser().getProfilepicpath());
            try{
                if(Files.exists(path)){
                    bytes = FileStorageUtil.deCompressFile(Files.readAllBytes(path));
                }
            }catch (IOException | DataFormatException ignored){
            }
            res.setProfilebase64(Base64.getEncoder().encodeToString(bytes));
        }

        if(p.getMediaurl() == null){
            return res;
        }
        byte[] bytes = null;
        Path path = Path.of(p.getMediaurl());
        try{
            if(Files.exists(path)){
                bytes = FileStorageUtil.deCompressFile(Files.readAllBytes(path));
            }
        }catch (IOException | DataFormatException ignored){
        }
        res.setMediatype(p.getMediatype());
        res.setBase64(Base64.getEncoder().encodeToString(bytes));
        
        return res;
    }
    
    public static List<PostRes> toResList(List<Post> posts){
        List<PostRes> list = new ArrayList<>();
        for (Post p: posts) {
            list.add(toRes(p));
        }
        return list;
    }
}
