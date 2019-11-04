package com.threesimplemen.sneakerbot.RestControllers;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SneakerBotRestController {

    @RequestMapping("/test")
    public void seleniumTest(){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
        WebDriver webDriver = new ChromeDriver();
        webDriver.get("http://google.com");
    }
}
