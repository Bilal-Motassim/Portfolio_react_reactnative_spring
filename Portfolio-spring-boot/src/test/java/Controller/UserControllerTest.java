package Controller;

import com.example.portfolio.Controller.UserController;
import com.example.portfolio.Model.User;
import com.example.portfolio.dto.AboutDTO;
import com.example.portfolio.dto.HeadlineDTO;
import com.example.portfolio.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;
    private AboutDTO aboutDTO;
    private HeadlineDTO headlineDTO;



    @Test
    public void testGetUser() {
        ResponseEntity<User> response = userController.getUser(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());

        verify(userService, times(1)).getUser(1L);
    }

    @Test
    public void testGetAbout() {
        ResponseEntity<AboutDTO> response = userController.getAbout(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(aboutDTO, response.getBody());

        verify(userService, times(1)).getAbout(1L);
    }

    @Test
    public void testGetHeadline() {
        ResponseEntity<HeadlineDTO> response = userController.getHeadline(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(headlineDTO, response.getBody());

        verify(userService, times(1)).getHeadline(1L);
    }

}
