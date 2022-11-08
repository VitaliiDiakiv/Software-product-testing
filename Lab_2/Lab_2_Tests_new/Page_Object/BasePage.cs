using OpenQA.Selenium;
using System;

namespace Page_Object
{
    public class BasePage
    {
        protected static IWebDriver driver;
        public BasePage(IWebDriver webDriver)
        {
            driver = webDriver;
        }
    }
}