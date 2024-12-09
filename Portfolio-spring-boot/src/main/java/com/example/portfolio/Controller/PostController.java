package com.example.portfolio.Controller;

import com.example.portfolio.Model.Comment;
import com.example.portfolio.Model.Post;
import com.example.portfolio.dto.CommentDTO;
import com.example.portfolio.dto.CommentsRes;
import com.example.portfolio.dto.PostDTO;
import com.example.portfolio.dto.PostRes;
import com.example.portfolio.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<String> addPost(@PathVariable Long userId, @RequestPart MultipartFile file, @RequestPart String title, @RequestPart String description) {
        boolean result = postService.addPost(userId, new Post(title,description), file);
        if (result) {
            return ResponseEntity.ok("Post created successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PostMapping("/comments/{postId}/{userId}")
    public ResponseEntity<String> addComment(@PathVariable Long postId,@PathVariable Long userId, @RequestBody Comment comment) {
        if (postService.addComment(postId, userId, comment)) {
            return ResponseEntity.ok("Comment added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
        }
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentsRes>> getAllComments(@PathVariable Long postId) {
        List<CommentsRes> comments = CommentDTO.toResList(postService.getAllComments(postId));
        if (!comments.isEmpty()) {
            return ResponseEntity.status(200).body(comments);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/like/{userId}")
    public ResponseEntity<String> toggleLike(@PathVariable Long postId, @PathVariable Long userId) {
        boolean result = postService.toggleLike(postId, userId);
        if (result) {
            return ResponseEntity.ok("Like toggled successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post or User not found");
        }
    }

    @GetMapping("/likes/{postid}")
    public ResponseEntity<String> getLikes(@PathVariable Long postid){
        int likes = postService.getPostLikes(postid);
        return ResponseEntity.status(200).body(String.valueOf(likes));
    }

    @GetMapping("/")
    public ResponseEntity<List<PostRes>> getAllposts(){
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.status(200).body(PostDTO.toResList(posts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<PostRes>> getUserposts(@PathVariable Long id){
        List<Post> posts = postService.getUserPosts(id);
        return ResponseEntity.status(200).body(PostDTO.toResList(posts));
    }
}
