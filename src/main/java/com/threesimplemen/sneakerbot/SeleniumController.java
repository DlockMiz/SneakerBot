package com.threesimplemen.sneakerbot;

import com.threesimplemen.sneakerbot.Models.Order;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

public class SeleniumController {

    public void findSneaker(Order order){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.nike.com/w/new-3n82y");
        List<WebElement> list = driver.findElements(By.cssSelector("figure"));


        for(WebElement figure: list){
            WebElement shoe = figure.findElement(By.className("product-card__link-overlay"));
            if(shoe.getText().matches("Air Jordan 11 Retro")){
                driver.get(shoe.getAttribute("href"));
            }
        }
    }
}
