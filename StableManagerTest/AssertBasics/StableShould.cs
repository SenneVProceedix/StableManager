using Xunit;
using StableManager;

namespace StableManagerTest
{
    public class StableShould
    {
        private Stable _sut;
        public StableShould()
        {
            _sut = new Stable(3, 3, new Horse());

        }

        //Assert with Exception
        [Fact]
        public void ThrowExceptionWhenStableIsFull()
        {
            Assert.Throws<StableFullException>(() => _sut.PutHorseInStable(new Horse()));
        }

        
    }
}
