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
            _sut = new Farm
            {
                Stables = new List<Stable>() {
                    new Stable(3 ,3 , new Horse()), new Stable(3 ,3 , new Horse()), new Stable(3 ,3 , new Horse())
                }
            };
        }

        //Assert with Event
        [Fact]
        public void RaiseEventWhenNoEmptyStable()
        {
            Assert.Raises<EventArgs>(
                handler => _sut.NoEmptyStable += handler, //attach handler
                handler => _sut.NoEmptyStable -= handler, //detach handler
                () => _sut.FindEmptyStable());            //function that shoud raise the event
        }
    }
}
