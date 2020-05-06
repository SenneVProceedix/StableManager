using Xunit;
using StableManager;

namespace StableManagerTest.ControllingTestExecution
{

    /**
     * When to use: when you want to create a single test context and share it among all the tests in the class,
     * and have it cleaned up after all the tests in the class have finished.
     * 
     * This is done because the creation of this context is a time intensive order.
     * If we didn't use a ClassFixture, this time intensive order would be executed before every test and greatly increase waiting time.
     * Be aware that with this setup, no test should be able to influence the outcome of another test.
     */

    /// <summary>
    /// 
    /// </summary>
    public class ControlStableShould : IClassFixture<DatabaseFixture>
    {
        private DatabaseFixture _fixture;
        private Stable _sut;

        //because IClassFixture is implemented xUnit recognizes DatabaseFixture and injects it.
        public ControlStableShould(DatabaseFixture databaseFixture)
        {
            _fixture = databaseFixture;
            _sut = new Stable(3, 3, null);
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
