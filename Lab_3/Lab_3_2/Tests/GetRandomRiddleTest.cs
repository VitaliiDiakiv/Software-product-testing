using Lab_3_2.Models;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;
using TechTalk.SpecFlow;

namespace Lab_3_2.Tests
{
    [Binding]
    public class GetRandomRiddleTest
    {
        private RestClient client = new RestClient(" https://riddles-api.vercel.app/");
        private IRestResponse<Root> response;
        [When(@"send a request to read random riddle")]
        public void WhenSendARequestToReadRandomRiddle()
        {
            RestRequest request = new RestRequest("/random", Method.GET);
            response = client.Execute<Root>(request);
        }

        [Then(@"response status should be OK")]
        public void ThenResponseStatusShouldBeOK()
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        }
    }
}
