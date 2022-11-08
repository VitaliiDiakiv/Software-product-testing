using Lab_2_web_testing.Steps;
using Page_Object;
using System;
using TechTalk.SpecFlow;

namespace Lab_2_Tests_new.StepDefinitions
{
    [Binding]
    public class HomePageStep : BaseStep
    {
        private HomePage homePage;

        [Given(@"open the site globalsqa")]
        public void GivenOpenTheSiteGlobalsqa()
        {
            driver.Url = "https://www.globalsqa.com/angularJs-protractor/BankingProject/";
            homePage = new HomePage(driver);
        }

        [Given(@"click on the Bank Manager Login button")]
        public void GivenClickOnTheBankManagerLoginButton()
        {
            homePage.ClickHome();
        }
    }
}
