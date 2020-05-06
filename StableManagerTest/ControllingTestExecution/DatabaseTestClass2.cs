using Xunit;

namespace StableManagerTest.ControllingTestExecution
{
    /// <summary>
    /// 
    /// </summary>
    [Collection("Database Collection")]
    public class DatabaseTestClass2
    {
        DatabaseFixture _fixture;

        public DatabaseTestClass2(DatabaseFixture fixture)
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
