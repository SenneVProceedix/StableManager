using StableManager;
using Xunit;

namespace StableManagerTest.DataDriven
{
    public class DataHorseShould
    {
        private Horse _sut;
        public DataHorseShould()
        {
            _sut = new Horse();
        }

        /**
         * A data driven test is accompanied by the [Theory] attribute.
         * Note that test explorer recognizes this as 4 tests.
         */
        [Theory]
        [InlineData(2015, 5)]
        [InlineData(2000, 20)]
        [InlineData(2019, 1)]
        [InlineData(2010, 10)]
        public void CalculateAge(int yearOfBirth, int expectedAge)
        {
            _sut.YearOfBirth = yearOfBirth;
            Assert.Equal(expectedAge, _sut.Age);
        }

        /**
         * To share testData, you can create a propertie with this test data and load it on with the MemberData attribute.
         * This test data is shared with DataEmployeeShould.CalculateAgeWithInternalData.
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
        * This test data is shared with DataEmployeeShould.CalculateAgeWithExternalData.
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
         * This test data is shared with DataEmployeeShould.CalculateAgeWithCustomAttribute.
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
