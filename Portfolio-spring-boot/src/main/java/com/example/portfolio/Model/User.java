package com.example.portfolio.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.HashSet;
import java.util.List;
import java.util.Set;



@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column( name = "firstname" ,nullable = false )
    private String firstName;

    @Column( name = "lastname", nullable = false )
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String verificationCode;

    @Column
    private boolean active = true;

    @Column
    private String headline;

    @Column(length = 500)
    private String about;

    @Column
    private String profilepicpath;

    @Column
    private String profilepictype;

    @Column
    private String backgroundpicpath;

    @Column
    private String backgroundpictype;



    @ManyToMany
    @JoinTable(
            name = "user_liked_posts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id")
    )
    @JsonIgnore
    private Set<Post> likedPosts;

    @OneToMany(mappedBy="user")
    private List<Education> educationSet;

    @OneToMany(mappedBy="user")
    private List<Experience> experienceList;

    @OneToMany(mappedBy="user")
    private List<Skill> skillList;

}
