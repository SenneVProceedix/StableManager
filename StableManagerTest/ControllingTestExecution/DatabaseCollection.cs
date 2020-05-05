using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
namespace StableManagerTest.ControllingTestExecution
{
    /**
     * WHEN TO USE: when you want to create a single test context and share it among tests in several test classes,
     * and have it cleaned up after all the tests in the test classes have finished.
     * 
     * When DatabaseTestClass1 & DatabaseTestClass2 are run there will be a single context(fixture) created at the start.
     * This single context will be used among all test of DatabaseTestClass1 & DatabaseTestClass2
     */

    [CollectionDefinition("Database Collection")]
    public class DatabaseCollection : ICollectionFixture<DatabaseFixture>
    {
        // This class has no code, and is never created. Its purpose is simply
        // to be the place to apply [CollectionDefinition] and all the
        // ICollectionFixture<> interfaces.
    }
}
