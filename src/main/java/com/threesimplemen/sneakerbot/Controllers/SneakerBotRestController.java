package com.threesimplemen.sneakerbot.Controllers;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.Models.FoundShoe;
import com.threesimplemen.sneakerbot.SeleniumController;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SneakerBotRestController {
    private SeleniumController seleniumController;

    public SneakerBotRestController(SimpMessageSendingOperations template){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
        this.seleniumController = new SeleniumController(new FoundShoe(), new ChromeDriver(), template);
    }

    @RequestMapping("/findSneaker")
    public FoundShoe findSneaker(Order order){
        FoundShoe foundShoe = this.seleniumController.findSneaker(order);
        return foundShoe;
    }
}
