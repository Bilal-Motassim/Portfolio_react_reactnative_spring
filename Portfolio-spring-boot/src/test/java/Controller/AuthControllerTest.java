package Controller;

import com.example.portfolio.Controller.AuthController;
import com.example.portfolio.Mapper.UserMapper;
import com.example.portfolio.Model.User;
import com.example.portfolio.dto.UserDTO;
import com.example.portfolio.service.AuthService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private AuthController authController;

    private UserDTO userDTO;

    @Before
    public void setUp() {
        userDTO = new UserDTO();
    }

    @Test
    public void testRegisterUser_ValidInput() throws Exception {
        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(false);

        // Mocking user
        User user = new User();
        when(userMapper.toEntity(userDTO)).thenReturn(user);


        doNothing().when(authService).register(user);


        ResponseEntity<String> response = authController.registerUser(userDTO, bindingResult);


        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User registered successfully, please verify your email", response.getBody());


        verify(userMapper, times(1)).toEntity(userDTO);
        verify(authService, times(1)).register(user);
    }

    @Test
    public void testRegisterUser_InvalidInput() throws Exception {

        BindingResult bindingResult = mock(BindingResult.class);
        when(bindingResult.hasErrors()).thenReturn(true);


        ResponseEntity<String> response = authController.registerUser(userDTO, bindingResult);


        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().contains("Failed to register user"));


        verify(userMapper, never()).toEntity(any());
        verify(authService, never()).register(any());
    }
}
