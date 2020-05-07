using System;

namespace StableManager
{
    /// <summary>
    /// 
    /// </summary>
    public class Employee
    {
        public String Name { get; set; }
        public int YearOfBirth { get; set; }
        //For the sake of simplicity, everyones birthday is the first of january and it is always 2020.
        public int Age { get => 2020 - YearOfBirth; }

    }
}
