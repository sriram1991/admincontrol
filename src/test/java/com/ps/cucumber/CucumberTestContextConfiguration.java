package com.ps.cucumber;

import com.ps.PsApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = PsApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
