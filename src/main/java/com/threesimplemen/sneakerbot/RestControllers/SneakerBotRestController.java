package com.threesimplemen.sneakerbot.RestControllers;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.openqa.selenium.support.ui.ExpectedConditions.presenceOfElementLocated;

@RestController
public class SneakerBotRestController {

    @RequestMapping("/buySneaker")
    public void buySneaker(){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, 10);
        driver.get("https://www.nike.com/w/new-3n82y");

        //driver.findElement(By.name("hf-modal-btn-close")).sendKeys(Keys.ENTER);
        //WebElement firstResult = wait.until(presenceOfElementLocated(By.cssSelector("h3>div")));
//        List<WebElement> list = driver.findElements(By.tagName("img"));
    }
}
