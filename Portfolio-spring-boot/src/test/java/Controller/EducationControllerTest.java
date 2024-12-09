package Controller;

import com.example.portfolio.Controller.EducationController;
import com.example.portfolio.Model.Education;
import com.example.portfolio.service.EducationService;
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
import static org.mockito.Mockito.*;
@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class EducationControllerTest {

    @Mock
    private EducationService educationService;

    @InjectMocks
    private EducationController educationController;

    private List<Education> educationList;

    @Before
    public void setUp() {
        educationList = new ArrayList<>();
        Education education1 = new Education();
        education1.setId(1L);
        education1.setDegree("Licence");

        Education education2 = new Education();
        education2.setId(2L);
        education2.setDegree("Master");

        educationList.add(education1);
        educationList.add(education2);

        when(educationService.getEducations(1L)).thenReturn(educationList);
    }

    @Test
    public void testGetEducations() {
        ResponseEntity<List<Education>> response = educationController.getEducations(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(educationList, response.getBody());

        verify(educationService, times(1)).getEducations(1L);
    }

    @Test
    public void testAddEducation() {
        Education newEducation = new Education();
        newEducation.setId(3L);
        newEducation.setDegree("Doctorat");

        when(educationService.addEducation(1L, newEducation)).thenReturn(true);

        ResponseEntity<String> response = educationController.addEducation(1L, newEducation);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Education added", response.getBody());

        verify(educationService, times(1)).addEducation(1L, newEducation);
    }

    @Test
    public void testDeleteEducation() {
        ResponseEntity<String> response = educationController.deleteEducation(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Education deleted", response.getBody());

        verify(educationService, times(1)).deleteEducation(1L);
    }

    @Test
    public void testEditEducation() {
        Education editedEducation = new Education();
        editedEducation.setId(1L);
        editedEducation.setDegree("Licence (Edited)");

        when(educationService.modifyEducation(1L, editedEducation)).thenReturn(true);

        ResponseEntity<String> response = educationController.editEducation(1L, editedEducation);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Education modified", response.getBody());

        verify(educationService, times(1)).modifyEducation(1L, editedEducation);
    }
}
