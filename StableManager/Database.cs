using System;
using System.Collections.Generic;
using System.Text;

namespace StableManager
{
    /// <summary>
    /// 
    /// </summary>
    public class Database
    {
        public static void Connect()
        {
            //simulate connecting to database
            System.Threading.Thread.Sleep(1500);
        }

        public static void InitializeData()
        {
            //simulate initializing data
            System.Threading.Thread.Sleep(500);
        }
        public static void Dispose()
        {
            //simulate destroying of data
            System.Threading.Thread.Sleep(200);
        }
    }
}
