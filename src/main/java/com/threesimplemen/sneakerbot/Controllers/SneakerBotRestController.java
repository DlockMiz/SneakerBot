package com.threesimplemen.sneakerbot.Controllers;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.Models.FoundShoe;
import com.threesimplemen.sneakerbot.SeleniumController;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SneakerBotRestController {
    private SeleniumController seleniumController;

    public SneakerBotRestController(SimpMessageSendingOperations template){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
//        WebDriver driver = new ChromeDriver();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-gpu", "--blink-settings=imagesEnabled=false");
        WebDriver driver = new ChromeDriver(options);

        driver.get("https://www.nike.com/w/new-3n82y");
        this.seleniumController = new SeleniumController(new FoundShoe(), driver, template);
    }

    @PostMapping("/findSneaker")
        public FoundShoe findSneaker(@RequestBody Order order){
        FoundShoe foundShoe = this.seleniumController.findSneaker(order);
        return foundShoe;
    }

    @GetMapping("/buySneakerConfirmation")
    public void buySneakerConfirmation(){
        seleniumController.completePayment();
    }
}
