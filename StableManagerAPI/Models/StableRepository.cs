using Newtonsoft.Json;
using StableManagerAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Hosting;

namespace StableManagerAPI.Models
{
    /// <summary>
    /// Stores the data in a json file so that no database is required for this
    /// sample application
    /// </summary>
    public class StableRepository
    {
        /// <summary>
        /// Retrieves the list of products.
        /// </summary>
        /// <returns></returns>
        public ICollection<Stable> Retrieve()
        {
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/stable.json");

            var json = System.IO.File.ReadAllText(filePath);

            var stables = JsonConvert.DeserializeObject<ICollection<Stable>>(json);

            return stables;
        }

        /// <summary>
        /// Saves a new product.
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public Stable Save(Stable stable)
        {
            // Read in the existing products
            List<Stable> stables = Retrieve().ToList();

            // Assign a new Id
            var maxId = stables.Max(s => s.Id);
            stable.Id = maxId + 1;
            stables.Add(stable);

            WriteData(stables);
            return stable;
        }

        /// <summary>
        /// Updates an existing product
        /// </summary>
        /// <param name="id"></param>
        /// <param name="product"></param>
        /// <returns></returns>
        public Stable Save(int id, Stable stable)
        {
            // Read in the existing products
            List<Stable> stables = Retrieve().ToList();

            // Locate and replace the item
            var itemIndex = stables.FindIndex(s => s.Id == stable.Id);
            if (itemIndex >= 0)
            {
                stables[itemIndex] = stable;
            }
            else
            {
                return null;
            }

            WriteData(stables);
            return stable;
        }


        private bool WriteData(List<Stable> stables)
        {
            // Write out the Json
            var filePath = HostingEnvironment.MapPath(@"~/App_Data/stable.json");

            var json = JsonConvert.SerializeObject(stables, Formatting.Indented);
            System.IO.File.WriteAllText(filePath, json);

            return true;
        }

    }
}