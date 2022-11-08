using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;


namespace Page_Object
{
    public class CustomersPage : BasePage
    {
        private static WebDriverWait wait;
        public CustomersPage(IWebDriver webDriver) : base(webDriver)
        {
            wait = new WebDriverWait(webDriver, TimeSpan.FromSeconds(3));
        }

        private IWebElement BtnLastName => wait.Until(e => e.FindElement(By.XPath("//tr/td[2]")));
        private List<IWebElement> LastNameElements => wait.Until(e => e.FindElements(By.XPath("//tr/td[2][@class='ng-binding']")).ToList<IWebElement>());

        public void ClickLastName() => BtnLastName.Click();
        public List<string> GetLastNames() => LastNameElements.Select(el => el.Text).ToList<string>();
    }
}
