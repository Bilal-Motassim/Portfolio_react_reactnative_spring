package com.example.portfolio.Controller;

import com.example.portfolio.Model.Education;
import com.example.portfolio.dto.*;
import com.example.portfolio.Mapper.UserMapper;
import com.example.portfolio.Model.User;
import com.example.portfolio.service.EducationService;
import com.example.portfolio.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private EducationService educationService;

    @GetMapping("/getall")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> userDTOs = userMapper.toDTOList(userService.getAllUsers());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = userService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/profilepic/{id}")
    public ResponseEntity<?> getProfilePicture(@PathVariable("id") Long id){
        User user = userService.getUser(id);
        byte[] image = userService.getProfilePic(id);
        if(image==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile image");
        }
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(user.getProfilepictype())).body(image);

    }

    @GetMapping("/profilepicbase64/{id}")
    public ResponseEntity<?> getProfilePicturebase64(@PathVariable("id") Long id){
        User user = userService.getUser(id);
        byte[] image = userService.getProfilePic(id);
        if(image==null){
            return ResponseEntity.status(200).body("user has no profilepic");
        }
        ImageDTO base64 = new ImageDTO(user.getProfilepictype(), image);
        return ResponseEntity.status(HttpStatus.OK).body(base64);
    }

    @PutMapping("/profilepic/{id}")
    public ResponseEntity<String> changeProfilePicture(@PathVariable Long id, @RequestPart MultipartFile image) throws IOException {
        boolean response = userService.changeProfilePic(id, image);
        if(response){
            return new ResponseEntity<>(String.format("Image uploaded successfully", image.getOriginalFilename()), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(String.format("Image Failed to upload", image.getOriginalFilename()), HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/backgroundpic/{id}")
    public ResponseEntity<?> getBackgroundPicture(@PathVariable("id") Long id){
        User user = userService.getUser(id);
        byte[] image = userService.getBackgroundPic(id);
        if(image==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile image");
        }
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(user.getProfilepictype())).body(image);

    }

    @GetMapping("/backgroundpicbase64/{id}")
    public ResponseEntity<?> getBackgroundPicturebase64(@PathVariable("id") Long id){
        User user = userService.getUser(id);
        byte[] image = userService.getBackgroundPic(id);
        if(image==null){
            return ResponseEntity.status(200).body("user has no background pic");
        }
        ImageDTO base64 = new ImageDTO(user.getBackgroundpictype(), image);
        return ResponseEntity.status(HttpStatus.OK).body(base64);
    }

    @PutMapping("/backgroundpic/{id}")
    public ResponseEntity<String> changeBackgroundPicture(@PathVariable Long id, @RequestPart MultipartFile image) throws IOException {
        boolean response = userService.changeBackgroundPic(id, image);
        if(response){
            return new ResponseEntity<>(String.format("Image uploaded successfully", image.getOriginalFilename()), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(String.format("Image Failed to upload", image.getOriginalFilename()), HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/about/{id}")
    public ResponseEntity<AboutDTO> getAbout(@PathVariable("id") Long id) {
        AboutDTO about = userService.getAbout(id);
        return ResponseEntity.status(200).body(about);
    }

    @PutMapping("/about/{id}")
    public ResponseEntity<String> setAbout(@PathVariable Long id,@RequestBody AboutDTO about) {
        log.info(about.getAbout());
        boolean res = userService.changeAbout(id, about.getAbout());
        if(res==false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change about");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("About changed");
    }

    @GetMapping("/headline/{id}")
    public ResponseEntity<HeadlineDTO> getHeadline(@PathVariable("id") Long id) {
        HeadlineDTO headline = userService.getHeadline(id);
        return ResponseEntity.status(200).body(headline);

    }

    @PutMapping("/headline/{id}")
    public ResponseEntity<String> setHeadline(@PathVariable Long id, @RequestBody HeadlineDTO headline) {
        boolean res = userService.changeHeadline(id, headline.getHeadline());
        if(res==false){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change Headline");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Headline changed");
    }


    @PostMapping("/search")
    public ResponseEntity<List<SearchRes>> searchUser(@RequestBody String text){
        List<User> users = userService.SearchByName(text);
        return ResponseEntity.status(200).body(SearchDTO.toListSearch(users));
    }


}
