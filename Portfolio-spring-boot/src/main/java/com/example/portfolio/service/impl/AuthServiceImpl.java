package com.example.portfolio.service.impl;

import com.example.portfolio.Model.User;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.dto.LoginDTO;
import com.example.portfolio.dto.LoginResponse;
import com.example.portfolio.dto.VerifyDTO;
import com.example.portfolio.service.AuthService;
import com.example.portfolio.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;
import java.util.logging.Logger;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailSenderService emailSenderService;


    @Override
    public void register(User user) throws Exception {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email already exists");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);


        String verificationCode = generateRandomCode(6);
        user.setVerificationCode(verificationCode);

        emailSenderService.sendEmail(user.getEmail(), "Registration Confirmation",
                "Congratulations! Please verify your email using this code: " + verificationCode);

        user.setActive(false);

        userRepository.save(user);
    }


    @Override
    public LoginResponse login(LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDTO.getEmail(),
                loginDTO.getPassword()
        ));

        if(authentication.isAuthenticated()){
            User user = userRepository.findByEmail(loginDTO.getEmail());
            LoginResponse response = new LoginResponse();
            response.setAuthToken(jwtUtils.GenerateToken(loginDTO.getEmail()));
            response.setId(user.getId());
            response.setFirstname(user.getFirstName());
            response.setLastname(user.getLastName());
            response.setEmail(user.getEmail());
            return response;
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }

    @Override
    public boolean verifUser(VerifyDTO verifyDTO) {
        User user = userRepository.findByEmail(verifyDTO.getEmail());
        if(Objects.equals(user.getVerificationCode(), verifyDTO.getCode())){
            user.setActive(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean resend(String email) {
        User user = userRepository.findByEmail(email);
        if(user==null){
            return false;
        }
        emailSenderService.sendEmail(user.getEmail(), "Registration Confirmation",
                "Congratulations! Please verify your email using this code: " + user.getVerificationCode());
        return true;
    }


    private String generateRandomCode(int length) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < length) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }
}
