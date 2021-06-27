using Microsoft.AspNetCore.Mvc;
using Online_Store___Final_Project.Data;
using Online_Store___Final_Project.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace Online_Store___Final_Project.Controllers
{
    [ApiController]
    [Route("api/inventory")]
    public class InventoryController : ControllerBase
    {
        //get all item categories
        [HttpGet("categories")]
        public IEnumerable<Category> GetCategories()
        {
            CandyStoreContext db = new CandyStoreContext();
            return from c in db.Categories select c;
        }

        //get all items
        [HttpGet("items")]
        public IEnumerable<Item> GetItems()
        {
            CandyStoreContext db = new CandyStoreContext();
            return from i in db.Items select i;
        }

        //get all items in a specifiy category
        [HttpGet("category/{categoryId}/items")]
        public IEnumerable<Item> GetCategoryItems(int categoryId)
        {
            CandyStoreContext db = new CandyStoreContext();
            return from c in db.Items where c.CategoryId == categoryId select c;
        }
    }
}