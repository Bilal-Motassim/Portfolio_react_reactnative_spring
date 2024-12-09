package com.example.portfolio.dto;

import com.example.portfolio.Model.Comment;
import com.example.portfolio.utils.FileStorageUtil;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.zip.DataFormatException;

public class CommentDTO {
    public static CommentsRes toRes(Comment c){
        if(c.getUser().getProfilepicpath()==null){
            return new CommentsRes(c.getUser().getId(),c.getContent(), c.getUser().getFirstName(), c.getUser().getLastName(), null, null);
        }
        byte[] bytes = null;
        Path path = Path.of(c.getUser().getProfilepicpath());
        try{
            if(Files.exists(path)){
                bytes = FileStorageUtil.deCompressFile(Files.readAllBytes(path));
            }
        }catch (IOException | DataFormatException ignored){
        }
        return new CommentsRes(c.getUser().getId(),c.getContent(), c.getUser().getFirstName(), c.getUser().getLastName(), Base64.getEncoder().encodeToString(bytes), c.getUser().getProfilepictype());
    }

    public static List<CommentsRes> toResList(List<Comment> c){
        List<CommentsRes> list = new ArrayList<>();
        for (Comment cmt:c) {
            list.add(toRes(cmt));
        }
        return list;
    }
}
