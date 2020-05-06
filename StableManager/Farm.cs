using System;
using System.Collections.Generic;
using System.Linq;

namespace StableManager
{
    public class Farm
    {
        public String Name { get; set; }
        public List<Stable> Stables { get; set; }
        public Employee Employee { get; set; }
        public event EventHandler<EventArgs> NoEmptyStable;
        
        public Stable FindEmptyStable()
        {
            for(int i = 0; i < Stables.Count; i++)
            {
                if(Stables.ElementAt(i) == null)
                {
                    return Stables.ElementAt(i);
                }
            }
            NoEmptyStable(this, new EventArgs());
            return null;
        }
    }
}
