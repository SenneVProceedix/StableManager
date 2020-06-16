using System;
using System.Collections.Generic;
using System.Linq;

namespace StableManager
{
    /// <summary>
    /// 
    /// </summary>
    public class Farm
    {
        public String Name { get; set; }
        public ICollection<Stable> Stables { get; set; }
        public Employee Employee { get; set; }
        public event EventHandler<EventArgs> NoEmptyStableFound;
        
        public Stable FindEmptyStable()
        {
            Stable result = Stables.FirstOrDefault(stable => stable.StableHorse == null);
            if (result == null)
            {
                NoEmptyStableFound(this, new EventArgs());
            }
            return result;
        }
    }
}
