package com.threesimplemen.sneakerbot.Controllers;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.SeleniumController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SneakerBotRestController {
    private SeleniumController seleniumController = new SeleniumController();

    @RequestMapping("/findSneaker")
    public void findSneaker(Order order){
        order = new Order();
        seleniumController.findSneaker(order);
    }
}
