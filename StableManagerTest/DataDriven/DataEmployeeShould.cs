using StableManager;
using Xunit;

namespace StableManagerTest.DataDriven
{
    /// <summary>
    /// 
    /// </summary>
    public class DataEmployeeShould
    {
        private Employee _sut;
        public DataEmployeeShould()
        {
            _sut = new Employee();
        }

        /**
         * To share testData, you can create a propertie with this test data and load it on with the MemberData attribute.
         * This test data is shared with DataHorseShould.CalculateAgeWithInternalData.
         * Note that the test explorer recognizes this as 4 tests after building.
         */
        [Theory]
        [MemberData(nameof(AgeTestData.InternalTestData), MemberType = typeof(AgeTestData))]
        public void CalculateAgeWithInternalData(int yearOfBirth, int expectedAge)
        {
            _sut.YearOfBirth = yearOfBirth;
            Assert.Equal(expectedAge, _sut.Age);
        }

        /**
        * The test data is loaded in from an external source.
        * This test data is shared with DataHorseShould.CalculateAgeWithExternalData.
        * Note that the test explorer recognizes this as 4 tests after building.
        */
        [Theory]
        [MemberData(nameof(AgeTestData.ExternalTestData), MemberType = typeof(AgeTestData))]
        public void CalculateAgeWithExternalData(int yearOfBirth, int expectedAge)
        {
            _sut.YearOfBirth = yearOfBirth;
            Assert.Equal(expectedAge, _sut.Age);
        }

        /**
         * The test data is loaded in from a custom attribute create in the class: AgeDataAttribute.
         * This test data is shared with DataHorseShould.CalculateAgeWithCustomAttribute.
         * Note that the test explorer recognizes this as 4 tests after building.
         */
        [Theory]
        [AgeData]
        public void CalculateAgeWithCustomAttribute(int yearOfBirth, int expectedAge)
        {
            _sut.YearOfBirth = yearOfBirth;
            Assert.Equal(expectedAge, _sut.Age);
        }
    }
}
