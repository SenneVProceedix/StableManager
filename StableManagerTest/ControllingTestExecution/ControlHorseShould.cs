using StableManager;
using System;
using Xunit;
using Xunit.Abstractions;

namespace StableManagerTest.ControllingTestExecution
{
    /// <summary>
    /// 
    /// </summary>
    //you can implement IDispose for a destructor function that will be called after every test
    public class ControlHorseShould : IDisposable
    {
        //sut => sytem under test
        private Horse _sut;
        //this class will add output to your test
        private ITestOutputHelper _output;

        //xUnit will detect ITestOutputHelper in the constructor and inject it
        public ControlHorseShould(ITestOutputHelper output)
        {
            _output = output;
            _sut = new Horse("Jeno", null, null, 2001, true);
            
            //you can find this line in Test Explorer when you click on a test and then on output.
            _output.WriteLine("a new horse is created");
        }

        //You can categorize test functions with the property [Trait]
        //In Test Explorer, you can group by traits.
        [Fact]
        [Trait("Category", "Name")]
        public void UpdateName()
        {
            _sut.Name = "Ben X";
            Assert.Equal("Ben X", _sut.Name);
        }
        [Fact]
        [Trait("Category", "Name")]
        public void UpdateName_EndsWith()
        {
            _sut.Name = "Ben X";
            Assert.EndsWith("X", _sut.Name);
        }
        [Fact]
        [Trait("Category", "Name")]
        public void UpdateName_StartWith()
        {
            _sut.Name = "Ben X";
            Assert.StartsWith("Ben", _sut.Name);
        }
        [Fact]
        [Trait("Category", "Age")]
        public void CalculateAge_InRange()
        {
            Assert.InRange(_sut.Age, 0, 50); //above 50 your horse is propably death :(
        }

        //Skip => skips the test and give a reason why
        //DisplayName sets the name of the test function in test explorer if skipped
        [Fact(DisplayName = "jump is not implemented",Skip = "not implemented")]
        public void Jump()
        {
            Assert.True(_sut.Jump());
        }

        //makes test able to time out and sets timeout in ms
        [Fact(Timeout = 200)]
        public void Wait()
        {
            System.Threading.Thread.Sleep(10);
        }

        public void Dispose()
        {
            //here you can destroy any changes made.
        }
    }
}
