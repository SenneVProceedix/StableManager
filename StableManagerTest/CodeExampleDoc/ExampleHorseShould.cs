using System;
using Xunit.Abstractions;
using StableManager;

namespace StableManagerTest.CodeExampleDoc
{
    class ExampleHorseShould : IDisposable
    {
        private ITestOutputHelper _output;
        private Horse _sut;
        public ExampleHorseShould(ITestOutputHelper output)
        {
            _output = output;
            _sut = new Horse("Qornet", 2016);
            _output.WriteLine("Horse is created");
        }

        public void Dispose()
        {
            _output.WriteLine("Dispose");
        }
        //tests come here ...
    }
}
