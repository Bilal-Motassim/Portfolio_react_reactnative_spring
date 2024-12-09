package com.example.portfolio.service;

import com.example.portfolio.Model.User;
import com.example.portfolio.dto.AboutDTO;
import com.example.portfolio.dto.HeadlineDTO;
import com.example.portfolio.dto.LoginDTO;
import com.example.portfolio.dto.LoginResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUser(Long id);

    boolean changeProfilePic(Long id, MultipartFile pic) throws IOException;

    byte[] getProfilePic(Long id);

    boolean changeBackgroundPic(Long id, MultipartFile pic) throws IOException;

    byte[] getBackgroundPic(Long id);

    boolean changeAbout(Long id, String about);

    AboutDTO getAbout(Long id);

    boolean changeHeadline(Long id, String headline);

    HeadlineDTO getHeadline(Long id);

    List<User> SearchByName(String txt);
}
