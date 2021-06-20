using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Online_Store___Final_Project.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        //login form type
        public class LoginForm
        {
            public string username { get; set; }
            public string password { get; set; }
        };

        //route logging in
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginForm request)
        {


            return Ok();
        }
    }
}
