package Controller;

import com.example.portfolio.Controller.PostController;
import com.example.portfolio.Model.Comment;
import com.example.portfolio.Model.Post;
import com.example.portfolio.service.PostService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class PostControllerTest {

    @Mock
    private PostService postService;

    @InjectMocks
    private PostController postController;

    private List<Post> postList;

    @Before
    public void setUp() {
        postList = new ArrayList<>();

        Post post1 = new Post();
        post1.setId(1L);
        post1.setTitle("Post 1");
        post1.setDescription("Description for post 1");

        Post post2 = new Post();
        post2.setId(2L);
        post2.setTitle("Post 2");
        post2.setDescription("Description for post 2");

        postList.add(post1);
        postList.add(post2);
    }

    @Test
    public void testAddPost() {
        MultipartFile file = null; // mock file
        String title = "New Post";
        String description = "Description for new post";

        when(postService.addPost(anyLong(), any(Post.class), any(MultipartFile.class))).thenReturn(true);

        ResponseEntity<String> response = postController.addPost(1L, file, title, description);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Post created successfully", response.getBody());

        verify(postService, times(1)).addPost(1L, new Post(title, description), file);
    }

    @Test
    public void testAddComment() {
        Comment comment = new Comment();
        comment.setId(1L);
        comment.setContent("This is a comment");

        when(postService.addComment(anyLong(), anyLong(), any(Comment.class))).thenReturn(true);

        ResponseEntity<String> response = postController.addComment(1L, 1L, comment);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Comment added successfully", response.getBody());

        verify(postService, times(1)).addComment(1L, 1L, comment);
    }

}
