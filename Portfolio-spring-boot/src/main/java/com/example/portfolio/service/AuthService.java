package com.example.portfolio.service;

import com.example.portfolio.Model.User;
import com.example.portfolio.dto.LoginDTO;
import com.example.portfolio.dto.LoginResponse;
import com.example.portfolio.dto.VerifyDTO;

public interface AuthService {
    void register(User user) throws Exception;
    LoginResponse login(LoginDTO loginDTO);
    boolean verifUser(VerifyDTO verifyDTO);

    boolean resend(String email);
}
