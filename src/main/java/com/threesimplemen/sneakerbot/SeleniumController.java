package com.threesimplemen.sneakerbot;

import com.threesimplemen.sneakerbot.Models.Order;
import com.threesimplemen.sneakerbot.Models.Shoe;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

public class SeleniumController {

    WebDriver driver;
    Order order;
    Shoe shoe;

    public void findSneaker(Order order){
        System.setProperty("webdriver.chrome.driver","src/main/resources/chromedriver");
        this.driver = new ChromeDriver();
        this.order = order;
        this.shoe = new Shoe();
        driver.get("https://www.nike.com/w/new-3n82y");
        List<WebElement> shoeList = driver.findElements(By.cssSelector("figure"));

        for(WebElement figure: shoeList){
            WebElement shoe = figure.findElement(By.className("product-card__link-overlay"));
            if(shoe.getText().matches(this.order.shoeName)){
                driver.get(shoe.getAttribute("href"));
                this.shoe.shoeName = shoe.getText();
                findSize();
                System.out.println(this.shoe.shoePicture);
            }
        }
    }

    private void findSize(){
        List<WebElement> labelsList = new ArrayList<>();
        List<WebElement> inputSizes = driver.findElements(By.xpath("//*[contains(@name,'skuAndSize')]"));
        for(WebElement input: inputSizes){
            String num = input.getAttribute("value");
            String[] num1 = num.split(":");
            String finalNum = num1[0];
            labelsList.add(driver.findElement(By.xpath("//*[contains(@for,'skuAndSize__"+finalNum+"')]")));
        }
        for(WebElement label: labelsList){
            if(label.getText().matches(this.order.shoeSize)){
                this.shoe.shoeSize = label.getText();
                label.click();
            }
        }
    }

    private void findPicture(){
        String combinedShoe = "Low Resolution "+this.order.shoeName+" "+this.order.shoeType;
        WebElement pictureURL = driver.findElement(By.xpath("//img[contains(@alt,\""+combinedShoe+"\")]"));
        this.shoe.shoePicture = pictureURL.getAttribute("src");
    }
}
