package com.example.portfolio.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String title; // requied

    private String emptype;
    @Column(nullable = false)
    private String company; // requied

    private String location;

    private String locationtype;
    @Column(nullable = false)
    private boolean currentwork; // requied
    @Column(nullable = false)
    private String startmonth;  // requied
    @Column(nullable = false)
    private int startyear;  // requied

    private String endmonth;

    private int endyear;

    private String description;

}
