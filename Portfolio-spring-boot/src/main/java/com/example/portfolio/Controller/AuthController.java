package com.example.portfolio.Controller;

import com.example.portfolio.Mapper.UserMapper;
import com.example.portfolio.Model.User;
import com.example.portfolio.dto.LoginDTO;
import com.example.portfolio.dto.LoginResponse;
import com.example.portfolio.dto.UserDTO;
import com.example.portfolio.dto.VerifyDTO;
import com.example.portfolio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserMapper userMapper;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>("Failed to register user: " + bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }

        try {
            User user = userMapper.toEntity(userDTO);

            authService.register(user);
            return new ResponseEntity<>("User registered successfully, please verify your email", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to register user: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody VerifyDTO verification) {

        try {
            boolean res = authService.verifUser(verification);
            if (!res) {
                return new ResponseEntity<>("Email verified failed", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>("Email verified successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Verification failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO loginDTO) {
        return new ResponseEntity<>(authService.login(loginDTO), HttpStatus.CREATED);
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resendCode(@RequestBody VerifyDTO verifyDTO) {
        try {
            boolean res = authService.resend(verifyDTO.getEmail());
            if(res){
                return new ResponseEntity<>("Verification code resent successfully", HttpStatus.OK);
            }
            return new ResponseEntity<>("User not found or already active", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to resend code: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
