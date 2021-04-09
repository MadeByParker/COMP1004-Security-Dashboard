using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CySecApp_COMP1004.Controllers
{
    [Route("api/logins")]
    [ApiController]
    public class DataController : ControllerBase
    {
        // GET: api/<DataController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return Data.GetData().ToArray();
        }

        // POST api/<DataController>
        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            if (value.FirstName == "" || value.LastName == "")
            {
                return BadRequest();
            }
            Data.PushData(value);
            return Ok();
        }

        //DELETE api/records
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            bool exist = Data.Delete(id);
            if (exist) return Ok();
            else return NotFound();
        }

        //PUT api/records
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]User user, int id)
        {
            Data.Edit(id, user);
            return Ok();
        }
    }
}

