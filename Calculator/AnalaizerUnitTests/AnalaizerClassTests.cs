using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using AnalaizerClassLibrary;

namespace AnalaizerUnitTests
{
    [TestClass()]
    public class AnalaizerClassTests
    {
        public TestContext TestContext { get; set; }
        [DataSource("Microsoft.VisualStudio.TestTools.DataSource.XML", @"C:\Users\Lenovo\Desktop\Unit Tests Labs\Lab_1\Calculator\AnalaizerUnitTests\testData.xml", "Test", DataAccessMethod.Sequential)]

        [TestMethod()]
        public void IsDelimeterTest()
        {
            ///Arrange
            char incomingData = Convert.ToChar(TestContext.DataRow["incomingData"]);
            bool expected = Convert.ToBoolean(TestContext.DataRow["expected"]);
            ///Actual
            bool actual = AnalaizerClass.IsDelimeter(incomingData);
            //Assert
            Assert.AreEqual(expected, actual);
        }
    }
}
