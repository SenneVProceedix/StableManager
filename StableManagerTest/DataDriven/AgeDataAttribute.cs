using System.Collections.Generic;
using System.Reflection;
using Xunit.Sdk;

namespace StableManagerTest.DataDriven
{
    class AgeDataAttribute : DataAttribute
    {
        public override IEnumerable<object[]> GetData(MethodInfo testMethod)
        {
            yield return new object[] { 2015, 5 };
            yield return new object[] { 2000, 20 };
            yield return new object[] { 2019, 1 };
            yield return new object[] { 2012, 8 };
        }
    }
}
