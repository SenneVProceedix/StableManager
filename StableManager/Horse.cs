using System;
using System.Collections.Generic;

namespace StableManager
{
    /// <summary>
    /// 
    /// </summary>
    public class Horse : Animal
    {
        public String Name { get; set; }
        public Horse Father { get; set; }
        public Horse Mother { get; set; }
        public int YearOfBirth { get; set; }
        public Boolean DoesCompetition { get; set; }
        //For the sake of simplicity, everyones birthday is the first of january and it is always 2020.
        public int Age => 2020 - YearOfBirth;
        public ICollection<String> Injuries { get; set; }

        public Horse()
        {
        }

        public Horse(String name, int yearOfBirth)
        {
            Name = name;
            YearOfBirth = yearOfBirth;
            DoesCompetition = false;
        }

        public bool Jump()
        {
            throw new NotImplementedException();
        }
    }
}
