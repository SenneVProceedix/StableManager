using System;
using System.Collections.Generic;
using StableManager;
using Xunit;

namespace StableManagerTest
{
    //this test class contains a multitude of functionalities of Assert
    public class HorseShould
    {
        //sut => sytem under test
        private Horse _sut;

        //Centralize Arrange code in constructor
        public HorseShould()
        {
            _sut = new Horse("Jeno", null, null, 2001, true);
        }


        //Assert with Boolean
        [Fact]
        public void CheckDoesCompetition()
        {
            Assert.True(_sut.DoesCompetition);
        }

        //Assert with String:
        [Fact]
        public void UpdateName()
        {
            _sut.Name = "Ben X";
            Assert.Equal("Ben X", _sut.Name);
        }
        [Fact]
        public void UpdateName_EndsWith()
        {
            _sut.Name = "Ben X";
            Assert.EndsWith("X", _sut.Name);
        }
        [Fact]
        public void UpdateName_StartWith()
        {
            _sut.Name = "Ben X";
            Assert.StartsWith("Ben", _sut.Name);
        }
        [Fact]
        public void UpdateName_Contains()
        {
            _sut.Name = "Ben X";
            Assert.Contains("en ", _sut.Name);
        }
        [Fact]
        public void UpdateName_IgnoreCase()
        {
            _sut.Name = "Ben X";
            Assert.Equal("bEn x", _sut.Name, ignoreCase: true);
        }
        [Fact]
        public void UpdateName_Matches()
        {
            _sut.Name = "Ben X";
            Assert.Matches("[A-Z]{1}[a-z]+ X", _sut.Name);
        }

        //Assert With Integer
        [Fact]
        public void CalculateAge()
        {
            Assert.Equal(19, _sut.Age);
        }
        [Fact]
        public void CalculateAge_InRange()
        {
            Assert.InRange(_sut.Age, 0, 50); //above 50 your horse is propably death :(
        }
        //Assert With float & double
        [Fact]
        public void CalculateTwoThird()
        {
            Assert.Equal(0.67, // the actual value gets rounded up
                2.0 / 3.0,    //gives 0.6666666666...
                2);          //set precision to 2 to get 2 numbers behind the comma
        }

        //Assert with Objects
        [Fact]
        public void FatherBeNull()
        {
            Assert.Null(_sut.Father);
        }

        [Fact]
        public void FatherIsOfTypeHorse()
        {
            _sut.Father = new Horse();
            Assert.IsType<Horse>(_sut.Father);
        }
        [Fact]
        public void FatherIsOfTypeAnimal()
        {
            _sut.Father = new Horse();
            Assert.IsAssignableFrom<Animal>(_sut.Father);
        }

        //Assert with Collections
        [Fact]
        public void HaveABrokenTail()
        {
            _sut.Injuries = new List<String>() { "Broken Tail", "Tendon Injurie", "Kissing Spines" };
            Assert.Contains("Broken Tail", _sut.Injuries);
        }
        [Fact]
        public void NotHaveABrokenLeg()
        {
            _sut.Injuries = new List<String>() { "Broken Tail", "Tendon Injurie", "Kissing Spines" };
            Assert.DoesNotContain("Broken Leg", _sut.Injuries);
        }
        [Fact]
        public void HaveAtLeastOneBroken()
        {
            _sut.Injuries = new List<String>() { "Broken Tail", "Tendon Injurie", "Kissing Spines" };
            Assert.Contains(_sut.Injuries, injurie => injurie.Contains("Broken"));
        }
        [Fact]
        public void HaveNoEmptyOrNullOrWhitespaceInjurie()
        {
            _sut.Injuries = new List<String>() { "Broken Tail", "Tendon Injurie", "Kissing Spines" };
            Assert.All(_sut.Injuries, injurie => Assert.False(String.IsNullOrWhiteSpace(injurie)));
        }
    }
}
