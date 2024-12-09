package com.example.portfolio.service.impl;

import com.example.portfolio.Model.User;
import com.example.portfolio.Repository.UserRepository;
import com.example.portfolio.dto.AboutDTO;
import com.example.portfolio.dto.HeadlineDTO;
import com.example.portfolio.service.UserService;
import com.example.portfolio.utils.FileStorageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.zip.DataFormatException;


@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Value("${spring.profile.pics}")
    private String path;

    @Value("${spring.background.pics}")
    private String path2;


    @Override
    public boolean changeProfilePic(Long id, MultipartFile data) {
        Optional<User> user = userRepository.findById(id);
        String uniqueFileName = UUID.randomUUID() + "_propic_" + id;
        Path uploadPath  = Path.of(path);
        Path filePath = uploadPath.resolve(uniqueFileName);
        log.error(String.valueOf(filePath));
        user.get().setProfilepicpath(filePath.toString());
        user.get().setProfilepictype(data.getContentType());

        try{
            byte[] imageCompressed = FileStorageUtil.compressFile(data.getBytes());
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(new ByteArrayInputStream(imageCompressed), filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException e){
            e.printStackTrace();
        }

        User us = userRepository.save(user.get());
        if(us.getProfilepicpath()!=null){
            return true;
        }
        return false;
    }

    @Override
    public byte[] getProfilePic(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.get().getProfilepicpath()==null)
            return null;
        Path path = Path.of(user.get().getProfilepicpath());
        try{
            if(Files.exists(path)){
                return FileStorageUtil.deCompressFile(Files.readAllBytes(path));
            }
        }catch (IOException | DataFormatException e){
            log.error(e.getMessage());
        }
        return null;
    }




    @Override
    public boolean changeBackgroundPic(Long id, MultipartFile data) throws IOException {
        Optional<User> user = userRepository.findById(id);

        String uniqueFileName = UUID.randomUUID() + "_background_" + id;
        Path uploadPath  = Path.of(path2);
        Path filePath = uploadPath.resolve(uniqueFileName);
        user.get().setBackgroundpicpath(filePath.toString());
        user.get().setBackgroundpictype(data.getContentType());

        try{
            byte[] imageCompressed = FileStorageUtil.compressFile(data.getBytes());
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(new ByteArrayInputStream(imageCompressed), filePath, StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException e){
            e.printStackTrace();
        }

        User us = userRepository.save(user.get());
        if(us.getProfilepicpath()!=null){
            return true;
        }
        return false;
    }

    @Override
    public byte[] getBackgroundPic(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.get().getBackgroundpicpath()==null)
            return null;
        Path path = Path.of(user.get().getBackgroundpicpath());
        try{
            if(Files.exists(path)){
                return FileStorageUtil.deCompressFile(Files.readAllBytes(path));
            }
        }catch (IOException | DataFormatException e){
            log.error(e.getMessage());
        }
        return null;
    }

    @Override
    public boolean changeAbout(Long id, String about) {
        User user = userRepository.findById(id).orElseThrow();
        if(about!=null){
            user.setAbout(about);
            User user1 = userRepository.save(user);
            if(user1!=null){
                return true;
            }
        }
        return false;
    }

    @Override
    public AboutDTO getAbout(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        AboutDTO aboutDTO = new AboutDTO();
        aboutDTO.setAbout(user.getAbout());
        return aboutDTO;
    }

    @Override
    public boolean changeHeadline(Long id, String headline) {
        User user = userRepository.findById(id).orElseThrow();
        if(headline!=null){
            user.setHeadline(headline);
            User user1 = userRepository.save(user);
            if(user1!=null){
                return true;
            }
        }
        return false;
    }

    @Override
    public HeadlineDTO getHeadline(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        HeadlineDTO headlineDTO = new HeadlineDTO();
        headlineDTO.setHeadline(user.getHeadline());
        return headlineDTO;
    }

    @Override
    public List<User> SearchByName(String txt) {
        return userRepository.findUsersByFirstNameContaining(txt);
    }


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }
}
