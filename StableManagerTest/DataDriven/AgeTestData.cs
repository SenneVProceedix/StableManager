using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace StableManagerTest.DataDriven
{
    public class AgeTestData
    {
        /*
         * method one:
        private static List<object[]> InternalData = new List<object[]>
        {
            new object[] {2015, 5},
            new object[] {2000, 20},
            new object[] {2019, 1},
            new object[] {2012, 8}
        };

        public static IEnumerable<object[]> InternalTestData
        {
            get
            {
                return InternalData;
            }
        }
        */
        
            //method two:
        public static IEnumerable<object[]> InternalTestData
        {
           get
           {
               yield return new object[] { 2015, 5 };
               yield return new object[] { 2000, 20 };
               yield return new object[] { 2019, 1 };
               yield return new object[] { 2012, 8 };
           }
        }

        /**
         * The test data is loaded in from an external file
         * be sure to go to the properties of the file and set "Copy to Output Directory" to "Copy always".
         */

        public static IEnumerable<object[]> ExternalTestData
        {
            get
            {
                string[] csvLines = File.ReadAllLines("TestData.csv");

                var testCases = new List<object[]>();

                foreach (var csvLine in csvLines)
                {
                    IEnumerable<int> values = csvLine.Split(',').Select(int.Parse);

                    object[] testCase = values.Cast<object>().ToArray();

                    testCases.Add(testCase);
                }

                return testCases;
            }
        }
    }
}
