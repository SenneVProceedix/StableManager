using System;
using System.Collections.Generic;
using System.Text;

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
        public int Age { get => 2020 - YearOfBirth; }
        public List<String> Injuries { get; set; }

        public Horse()
        {
        }

        public Horse(String name, Horse father, Horse mother, int yearOfBirth, Boolean doesCompetition)
        {
            Name = name;
            Father = father;
            Mother = mother;
            YearOfBirth = yearOfBirth;
            DoesCompetition = doesCompetition;
        }

        public bool Jump()
        {
            throw new NotImplementedException();
        }
    }
}
