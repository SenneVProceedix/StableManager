using System;
using System.Collections.Generic;
using StableManager;
using Xunit;

namespace StableManagerTest.AssertBasics
{
    /// <summary>
    /// 
    /// </summary>
    public class FarmShould
    {
        private Farm _sut;

        public FarmShould()
        {
            Stable stable1 = new Stable(3, 3);
            stable1.PutHorseInStable(new Horse());
            Stable stable2 = new Stable(3, 3);
            stable2.PutHorseInStable(new Horse());
            Stable stable3 = new Stable(3, 3);
            stable3.PutHorseInStable(new Horse());
            _sut = new Farm
            {
                Stables = new List<Stable>() {
                    stable1, stable2, stable3
                }

            };
        }

        //Assert with Event
        [Fact]
        public void RaiseEventWhenNoEmptyStable()
        {
            Assert.Raises<EventArgs>(
                handler => _sut.NoEmptyStableFound += handler, //attach handler
                handler => _sut.NoEmptyStableFound -= handler, //detach handler
                () => _sut.FindEmptyStable());                 //function that shoud raise the event
        }
    }
}
