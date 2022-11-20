using Lab_3.Models;
using NUnit.Framework;
using RestSharp;
using RestSharp.Extensions;
using System;
using System.Net;
using System.Text.Json;
using TechTalk.SpecFlow;


namespace Lab_3.Tests
{
    [Binding]
    public class UpdateBookingTest
    {
        private RestClient client = new RestClient("https://restful-booker.herokuapp.com/");
        private IRestResponse<BookingModel> response;
        private IRestResponse responsed;
        private string token;
        private int bookingid;

        private void GetToken()
        {
            RestRequest request = new RestRequest("auth", Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddHeaders(new Dictionary<string, string>
            {
                { "Accept", "application/json" },
                { "Content-Type", "application/json" }
            });
            request.AddBody(new Dictionary<string, string> {
                { "username", "admin" },
                { "password", "password123" }
            });
            responsed = client.Execute(request);
            token = JsonSerializer.Deserialize<TokenModel>(client.Execute(request).Content).token;
            bookingid = JsonSerializer.Deserialize<List<BookingIdModel>>(client.Execute(new RestRequest("booking?firstname=Jim", Method.GET)).Content)[0].bookingid;
        }

        [When(@"make update request")]
        public void WhenMakeUpdateRequest()
        {
            GetToken();
            RestRequest request = new RestRequest($"booking/{bookingid}", Method.PUT);
            request.RequestFormat = DataFormat.Json;

            request.AddHeaders(new Dictionary<string, string>
            {
                { "Accept", "application/json" },
                { "Content-Type", "application/json" },
                { "Cookie", $"token={token}" }
            });
            request.AddJsonBody(new BookingModel()
            {
                bookingid = bookingid,
                firstname = "Alex",
                lastname = "Sancho",
                totalprice = 111,
                depositpaid = true,
                bookingdates = new Bookingdates()
                {
                    checkin = "2018-01-01",
                    checkout = "2020-01-01"
                },
                additionalneeds = "Breakfast"
            });
            response = client.Execute<BookingModel>(request);
        }

        [Then(@"verify if the  record is updated")]
        public void ThenVerifyIfTheRecordIsUpdated()
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }
    }
}
