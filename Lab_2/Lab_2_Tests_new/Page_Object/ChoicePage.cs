using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace Page_Object
{
    public class ChoicePage : BasePage
    {
        private static WebDriverWait wait;
        public ChoicePage(IWebDriver webDriver) : base(webDriver)
        {
            wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(3));
        }

        private IWebElement BtnCustomers => wait.Until(e => e.FindElement(By.XPath("//button[@ng-click='showCust()']")));
        public void ClickCustomers() => BtnCustomers.Click();

    }
}
