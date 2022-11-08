using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using TechTalk.SpecFlow;

namespace Lab_2_web_testing.Steps
{
    [Binding]
    public class BaseStep
    {
       protected static WebDriverWait wait;
        protected static IWebDriver driver;

        [BeforeFeature]
        public static void BeforeFeauture()
        {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(3));

        }

        [AfterFeature]
        public static void AfterFeature()
        {
            driver.Close();
        }
    }
}
