package com.example.portfolio.service;

import com.example.portfolio.Model.Comment;
import com.example.portfolio.Model.Post;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    boolean addPost(Long userId, Post post, MultipartFile file);
    boolean addComment(Long postId, Long userId, Comment comment);
    boolean toggleLike(Long postId, Long userId);
    List<Comment> getAllComments(Long postId);

    int getPostLikes(Long postId);

    List<Post> getAllPosts();

    List<Post> getUserPosts(Long id);
}
