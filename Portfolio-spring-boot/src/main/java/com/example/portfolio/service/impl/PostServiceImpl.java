package com.example.portfolio.service.impl;

import com.example.portfolio.Model.Comment;
import com.example.portfolio.Model.Post;
import com.example.portfolio.Model.User;
import com.example.portfolio.Repository.CommentRepository;
import com.example.portfolio.Repository.PostRepository;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.service.PostService;
import com.example.portfolio.utils.FileStorageUtil;
import org.hibernate.sql.exec.ExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Value("${spring.post.pics}")
    private String path;

    @Override
    public boolean addPost(Long userId, Post post, MultipartFile file) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            String uniqueFileName = UUID.randomUUID().toString();
            Path uploadPath  = Path.of(path);
            Path filePath = uploadPath.resolve(uniqueFileName);

            post.setMediaurl(filePath.toString());
            post.setMediatype(file.getContentType());

            try{
                byte[] imageCompressed = FileStorageUtil.compressFile(file.getBytes());
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Files.copy(new ByteArrayInputStream(imageCompressed), filePath, StandardCopyOption.REPLACE_EXISTING);
            }catch (IOException e){
                e.printStackTrace();
            }
            post.setCreatedAt(LocalDateTime.now());
            post.setUser(user);
            postRepository.save(post);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean addComment(Long postId, Long userId, Comment comment) {
        Optional<User> user = userRepository.findById(userId);
        if(!user.isPresent())
            return false;
        Optional<Post> post = postRepository.findById(postId);
        if(!post.isPresent())
            return false;

        comment.setPost(post.get());
        comment.setUser(user.get());
        commentRepository.save(comment);
        return true;
    }

    @Override
    public boolean toggleLike(Long postId, Long userId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (post.getLikedByUsers().contains(user)) {
                    user.getLikedPosts().remove(post);
                    post.getLikedByUsers().remove(user);
                } else {
                    user.getLikedPosts().add(post);
                    post.getLikedByUsers().add(user);
                }
                userRepository.save(user);
                postRepository.save(post);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Comment> getAllComments(Long postId) {
        List<Comment> list = commentRepository.findByPostId(postId);
        return list;
    }

    @Override
    public int getPostLikes(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        return post.getLikedByUsers().size();
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getUserPosts(Long id) {
        return postRepository.findByUserId(id);
    }
}
