package com.threesimplemen.sneakerbot;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.Models.FoundShoe;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.ArrayList;
import java.util.List;

public class SeleniumController {
    SimpMessageSendingOperations template;
    WebDriver driver;
    Order order;
    FoundShoe foundShoe;

    public SeleniumController(FoundShoe foundShoe, WebDriver driver, SimpMessageSendingOperations template){
        this.foundShoe = foundShoe;
        this.driver = driver;
        this.template = template;
    }

    public FoundShoe findSneaker(Order order){
        driver.get("https://www.nike.com/w/new-3n82y");
        List<WebElement> shoeList = driver.findElements(By.cssSelector("figure"));

        for(WebElement figure: shoeList){
            WebElement shoe = figure.findElement(By.className("product-card__link-overlay"));
            if(shoe.getText().matches(this.order.shoeName)){
                this.foundShoe.shoeName = shoe.getText();
                template.convertAndSend("/shoe_status", this.foundShoe);
                driver.get(shoe.getAttribute("href"));
                findSize();
                addToCart();
                return this.foundShoe;
            }
        }
        return this.foundShoe;
    }

    private void findSize(){
        List<WebElement> labelsList = new ArrayList<>();
        List<WebElement> inputSizes = driver.findElements(By.xpath("//*[contains(@name,'skuAndSize')]"));
        for(WebElement input: inputSizes){
            String finalNum = input.getAttribute("value").split(":")[0];
            labelsList.add(driver.findElement(By.xpath("//*[contains(@for,'skuAndSize__"+finalNum+"')]")));
        }
        for(WebElement label: labelsList){
            if(label.getText().matches(this.order.shoeSize)){
                template.convertAndSend("/shoe_status", this.foundShoe);
                this.foundShoe.shoeSize = label.getText();
                label.click();
            }
        }
    }

    private void addToCart(){
        WebElement addToCartBtn = driver.findElement(By.xpath("//button[contains(@class,'addToCartBtn')]"));
        addToCartBtn.click();
        try{
            Thread.sleep(2000);
        }catch (InterruptedException e) {
            e.printStackTrace();
        }
        template.convertAndSend("/shoe_status", this.foundShoe);
        driver.get("https://www.nike.com/us/en/checkout");
    }
}
