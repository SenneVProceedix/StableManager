using Microsoft.AspNet.OData;
using StableManagerAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace StableManagerAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:65230", "*", "*")]
    [Authorize]
    public class StablesController : ApiController
    {
        private StableRepository repo;
        public StablesController()
        {
            repo = new StableRepository();
        }
        // GET api/stables
        [EnableQuery()]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(repo.Retrieve().AsQueryable());
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        //GET api/stables?bedding=
        public IHttpActionResult Get(string bedding)
        {
            try {
                IEnumerable<Stable> result = repo.Retrieve().Where(stable => stable.Bedding.Contains(bedding));
                return Ok(result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // GET api/stables/5
        public IHttpActionResult Get(int id)
        {
            try
            {
                Stable result;
                if (id > 0)
                {
                    result = repo.Retrieve().FirstOrDefault(stable => stable.Id == id);
                    if (result == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    result = new Stable();
                }
                return Ok(result);
            }
            catch(Exception e)
            {
                return InternalServerError(e);
            }
        }

        // POST api/stables
        public IHttpActionResult Post([FromBody]Stable stable)
        {
            try
            {
                if (stable == null)
                {
                    return BadRequest("Stable cannot be null");
                }
                Stable result = repo.Save(stable);
                if (result == null)
                {
                    return Conflict();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                return Created<Stable>(Request.RequestUri.ToString() + result.Id.ToString(), result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        // PUT api/stables/5
        public IHttpActionResult Put(int id, [FromBody]Stable stable)
        {
            try
            {
                if (stable == null)
                {
                    return BadRequest("Stable cannot be null");
                }
                Stable result = repo.Save(id, stable);
                if (result == null)
                {
                    return NotFound();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // DELETE api/stables/5
        public void Delete(int id)
        {
        }
    }
}
