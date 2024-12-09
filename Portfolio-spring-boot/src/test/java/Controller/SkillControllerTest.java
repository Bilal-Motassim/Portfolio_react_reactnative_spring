package Controller;

import com.example.portfolio.Controller.SkillController;
import com.example.portfolio.Model.Skill;
import com.example.portfolio.service.SkillService;
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
public class SkillControllerTest {

    @Mock
    private SkillService skillService;

    @InjectMocks
    private SkillController skillController;

    private List<Skill> skillList;

    @Before
    public void setUp() {
        skillList = new ArrayList<>();
        Skill skill1 = new Skill();
        skill1.setId(1L);


        Skill skill2 = new Skill();
        skill2.setId(2L);


        skillList.add(skill1);
        skillList.add(skill2);

        when(skillService.getSkill(1L)).thenReturn(skillList);
    }

    @Test
    public void testGetSkills() {
        ResponseEntity<List<Skill>> response = skillController.getEducations(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(skillList, response.getBody());

        verify(skillService, times(1)).getSkill(1L);
    }

    @Test
    public void testAddSkill() {
        Skill newSkill = new Skill();
        newSkill.setId(3L);


        when(skillService.addSkill(1L, newSkill)).thenReturn(true);

        ResponseEntity<String> response = skillController.addEducation(1L, newSkill);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Skill added", response.getBody());

        verify(skillService, times(1)).addSkill(1L, newSkill);
    }

    @Test
    public void testDeleteSkill() {
        ResponseEntity<String> response = skillController.deleteEducation(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Experience deleted", response.getBody());

        verify(skillService, times(1)).deleteSkill(1L);
    }

    @Test
    public void testEditSkill() {
        Skill editedSkill = new Skill();
        editedSkill.setId(1L);

        when(skillService.modifySkill(1L, editedSkill)).thenReturn(true);

        ResponseEntity<String> response = skillController.editEducation(1L, editedSkill);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Skill modified", response.getBody());

        verify(skillService, times(1)).modifySkill(1L, editedSkill);
    }
}
