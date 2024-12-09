package Controller;

import com.example.portfolio.Controller.ExperienceController;
import com.example.portfolio.Model.Experience;
import com.example.portfolio.service.ExperienceService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class ExperienceControllerTest {

    @Mock
    private ExperienceService experienceService;

    @InjectMocks
    private ExperienceController experienceController;

    private List<Experience> experienceList;

    @Before
    public void setUp() {
        experienceList = new ArrayList<>();

        Experience experience1 = new Experience();
        experience1.setId(1L);
        experience1.setTitle("Experience 1");
        experience1.setDescription("Description for experience 1");

        Experience experience2 = new Experience();
        experience2.setId(2L);
        experience2.setTitle("Experience 2");
        experience2.setDescription("Description for experience 2");

        experienceList.add(experience1);
        experienceList.add(experience2);
    }

    @Test
    public void testGetEducations() {
        when(experienceService.getExperiences(anyLong())).thenReturn(experienceList);

        ResponseEntity<List<Experience>> response = experienceController.getEducations(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(experienceList, response.getBody());

        verify(experienceService, times(1)).getExperiences(1L);
    }

    @Test
    public void testAddEducation() {
        Experience experience = new Experience();
        experience.setId(3L);
        experience.setTitle("New Experience");
        experience.setDescription("Description for new experience");

        when(experienceService.addExperience(anyLong(), any(Experience.class))).thenReturn(true);

        ResponseEntity<String> response = experienceController.addEducation(1L, experience);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Experience added", response.getBody());

        verify(experienceService, times(1)).addExperience(1L, experience);
    }

}
