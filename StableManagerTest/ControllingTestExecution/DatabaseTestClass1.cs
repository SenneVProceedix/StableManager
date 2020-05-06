using Xunit;

namespace StableManagerTest.ControllingTestExecution
{
    [Collection("Database Collection")]
    public class DatabaseTestClass1
    {
        DatabaseFixture _fixture;

        public DatabaseTestClass1(DatabaseFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public void Test1()
        {

        }
        [Fact]
        public void Test2()
        {

        }
        [Fact]
        public void Test3()
        {

        }
    }
}
