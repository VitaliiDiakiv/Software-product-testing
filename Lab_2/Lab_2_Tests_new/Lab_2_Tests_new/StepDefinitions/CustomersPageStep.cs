using Lab_2_web_testing.Steps;
using NUnit.Framework;
using Page_Object;


namespace Lab_2_Tests_new.StepDefinitions
{
    [Binding]
    public class CustomersPageStep : BaseStep
    {
        private CustomersPage customersPage;
        List<string> actualLastNames = new List<string>();
        List<string> expectedLastNames = new List<string>();

        [When(@"click on the Last Name header")]
        public void WhenClickOnTheLastNameHeader()
        {
            customersPage = new CustomersPage(driver);
            Thread.Sleep(1000);
            expectedLastNames = customersPage.GetLastNames();
            expectedLastNames.Sort((a, b) => b.CompareTo(a));
            customersPage.ClickLastName();            
            actualLastNames = customersPage.GetLastNames();
          
        }

        [Then(@"should see customers sorted in descending order")]
        public void ThenShouldSeeCustomersSortedInDescendingOrder()
        {
            Assert.AreEqual(actualLastNames, expectedLastNames);
        }
    }
}
