package com.threesimplemen.sneakerbot;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.Models.FoundShoe;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

import java.util.ArrayList;
import java.util.List;

public class SeleniumController {
    SimpMessageSendingOperations template;
    WebDriverWait wait;
    WebDriver driver;
    Order order;
    FoundShoe foundShoe;

    public SeleniumController(FoundShoe foundShoe, WebDriver driver, SimpMessageSendingOperations template){
        this.foundShoe = foundShoe;
        this.driver = driver;
        this.template = template;
        this.wait = new WebDriverWait(driver, 20);
    }

    public FoundShoe findSneaker(Order order){
        this.order = order;
//        findPicture();
        List<WebElement> shoeList = driver.findElements(By.cssSelector("figure"));

        for(WebElement figure: shoeList){
            WebElement shoe = figure.findElement(By.className("product-card__link-overlay"));
            if(shoe.getText().matches(this.order.shoe.shoeName)){
                this.foundShoe.shoeName = shoe.getText();
                template.convertAndSend("/shoe_status", "Finding Shoe");
                driver.get(shoe.getAttribute("href"));
                findSize();
                addToCart();
                fillShipping();
                fillPayment();
                return this.foundShoe;
            }
        }
        return this.foundShoe;
    }

    private void findSize(){
        WebElement sizeField = driver.findElement(By.xpath("//fieldset[contains(@class,'body-baseline-base')]"));
        List<WebElement> labelsList = sizeField.findElements(By.tagName("label"));
        for(WebElement label: labelsList){
            if(label.getText().matches(this.order.shoe.shoeSize)){
                template.convertAndSend("/shoe_status", "Finding Size");
                this.foundShoe.shoeSize = label.getText();
                label.click();
            }
        }
    }

    private void addToCart(){
        WebElement addToCartBtn = driver.findElement(By.xpath("//button[contains(@class,'addToCartBtn')]"));
        addToCartBtn.click();
        stallThread(2000);
        template.convertAndSend("/shoe_status", "Adding to Cart");
        driver.get("https://www.nike.com/us/en/checkout");
    }

    private void findPicture(){
        String combinedShoeName = this.order.shoe.shoeName +" "+ this.order.shoe.shoeType;
        WebElement shoeUrl = driver.findElement(By.xpath("//img[contains(@alt,'"+combinedShoeName+"')]"));
        this.foundShoe.shoePicture = shoeUrl.getAttribute("src");
    }

    private void fillShipping() {
        String address = this.order.shippingDetails.billingAddress +" "+ this.order.shippingDetails.billingCity +" "+ this.order.shippingDetails.billingState +" "+ this.order.shippingDetails.billingPostalCode;
        template.convertAndSend("/shoe_status", "Filling Shipping Information");
        stallThread(1000);
        driver.findElement(By.id("firstName")).sendKeys(this.order.shippingDetails.billingFirstName);
        driver.findElement(By.id("lastName")).sendKeys(this.order.shippingDetails.billingLastName);
        driver.findElement(By.id("address1")).sendKeys(address);
        driver.findElement(By.id("email")).sendKeys(this.order.shippingDetails.email);
        driver.findElement(By.id("phoneNumber")).sendKeys(this.order.shippingDetails.phoneNumber + Keys.RETURN);
        stallThread(1000);
        driver.findElement(By.xpath("//button[contains(@class,'saveAddressBtn')]")).click();
        stallThread(1000);
        driver.findElement(By.xpath("//button[contains(@class,'continuePaymentBtn')]")).click();
    }

    private void fillPayment(){
        stallThread(1000);
        if(this.order.shippingDetails.billingMatchesShipping){
            template.convertAndSend("/shoe_status", "Filling Payment Information");
            driver.switchTo().frame(driver.findElement(By.className("credit-card-iframe")));
            stallThread(1500);
            driver.findElement(By.id("creditCardNumber")).sendKeys("375240452507246");
            stallThread(1500);
            driver.findElement(By.id("expirationDate")).sendKeys(this.order.paymentInformation.expiryDate);
            driver.findElement(By.id("cvNumber")).sendKeys(this.order.paymentInformation.securityCode);
            stallThread(1500);
            driver.switchTo().defaultContent();
            stallThread(1500);
            driver.findElement(By.xpath("//button[contains(@class,'d-lg-ib')]")).click();
        }
    }

    public void completePayment(){
        stallThread(1000);
        driver.findElement(By.xpath("//button[contains(@class,'d-lg-ib')]")).click();
//        driver.get("https://www.nike.com/w/new-3n82y");
    }

    private void stallThread(int time){
        try{
            Thread.sleep(time);
        }catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
