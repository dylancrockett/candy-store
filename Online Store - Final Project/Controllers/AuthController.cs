using Microsoft.AspNetCore.Mvc;
using Online_Store___Final_Project.Data;
using Online_Store___Final_Project.Data.Models;
using Online_Store___Final_Project.Services;
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
        //check if current session is still valid
        [HttpGet("valid")]
        public bool SessionValid()
        {
            return AuthService.LoggedIn(HttpContext);
        }

        //login form type
        public class LoginForm
        {
            public string username { get; set; }
            public string password { get; set; }
        };

        //route logging in
        [HttpPost("login")]
        async public Task<IActionResult> Login([FromBody] LoginForm form)
        {
            CandyStoreContext db = new CandyStoreContext();

            //search for the user by their username
            User user = (from u in db.Users where u.UserName == form.username select u).FirstOrDefault();

            //if no user was found return 401
            if (user == null) return Unauthorized();

            //if they were found check that thier password exists
            if (AuthService.VerifyHashedPassword(user.UserPassword, form.password)) return Ok();

            //setup user claims to sign them in
            await AuthService.SignInUser(HttpContext, user);

            return Unauthorized();
        }

        //new account form type
        public class NewAccountForm
        {
            public string username { get; set; }
            public string email { get; set; }
            public string password { get; set; }
        };

        //create a new account
        [HttpPost("new-account")]
        async public Task<IActionResult> NewAccount([FromBody] NewAccountForm form)
        {
            CandyStoreContext db = new CandyStoreContext();

            User newUser = new Data.Models.User
            {
                UserName = form.username,
                UserEmail = form.email,
                UserPassword = AuthService.HashPassword(form.password)
            };

            //create the new user
            db.Users.Add(newUser);

            //save changes
            db.SaveChanges();

            //setup user claims to sign them in
            await AuthService.SignInUser(HttpContext, newUser);

            return Ok();
        }

        //allow user to log out
        [HttpPost("logout")]
        async public Task<IActionResult> Logout()
        {
            await AuthService.SignOutUser(HttpContext);

            return Ok();
        }
    }
}
