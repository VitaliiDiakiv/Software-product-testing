using Lab_3.Models;
using NUnit.Framework;
using RestSharp;
using System.Net;


namespace Lab_3.Tests
{
    [Binding]
    public class ReadBookingsTest
    {
        private RestClient client = new RestClient("https://restful-booker.herokuapp.com/");
        private IRestResponse response;

        [When(@"send read the bookings request")]
        public void WhenSendReadTheBookingsRequest()
        {
            RestRequest request = new RestRequest("booking", Method.GET);
            response = client.Execute<BookingModel>(request);
        }

        [Then(@"expected OK response code")]
        public void ThenExpectedOKResponseCode()
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }
    }
}
