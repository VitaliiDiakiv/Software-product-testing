using Lab_2_web_testing.Steps;
using Page_Object;
using System;
using TechTalk.SpecFlow;

namespace Lab_2_Tests_new.StepDefinitions
{
    [Binding]
    public class ChoicePageStep : BaseStep
    {
        private ChoicePage choicePage;
        [Given(@"click on the Customers button")]
        public void GivenClickOnTheCustomersButton()
        {
            choicePage = new ChoicePage(driver);
            choicePage.ClickCustomers();
        }
    }
}
