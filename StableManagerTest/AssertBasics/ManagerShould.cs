using System;
using System.Collections.Generic;
using StableManager;
using Xunit;

namespace StableManagerTest.AssertBasics
{
    /// <summary>
    /// 
    /// </summary>
    public class ManagerShould
    {
        private Manager _sut;

        public ManagerShould()
        {
            _sut = new Manager
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
