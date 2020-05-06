using System;
using StableManager;

namespace StableManagerTest.ControllingTestExecution
{
    /*
     *Defines the context that can be used with IClassFixture & ICollectionFixture
     */
    public class DatabaseFixture : IDisposable
    {
        public DatabaseFixture()
        {
            Database.Connect();
            Database.InitializeData();
        }

        public void Dispose()
        {
            Database.Dispose();
        }
    }
}
