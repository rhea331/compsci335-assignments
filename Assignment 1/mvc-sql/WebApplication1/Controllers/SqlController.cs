using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Web.Mvc;
using WebApplication1.Models;
using System.Linq.Dynamic;
using System.Data.Common;

namespace WebApplication1.Controllers
{
    public class SqlController : Controller
    {
        string sql;
        public SqlController()
        {
            Thread.CurrentThread.CurrentCulture =
                new System.Globalization.CultureInfo("en-NZ"); // ru-RU
        }
        // GET: Sql
        public ActionResult WebGrid(int page = 1, int rowsPerPage=10, string sortCol = "OrderID", string sortDir="ASC")
        {
            List<MyModel> res;
            int count;
            string sortColformatted;
            if (sortCol == "EmpFirstName")
            {
                sortColformatted = "Employee.FirstName";
            }
            else if (sortCol == "EmpLastName")
            {
                sortColformatted = "Employee.LastName";
            }
            else if (sortCol == "CompanyName")
            {
                sortColformatted = "Customer.CompanyName";
            }
            else if (sortCol == "ContactName")
            {
                sortColformatted = "Customer.ContactName";
            }
            else sortColformatted = sortCol;
            using (var nwd = new NorthwindEntities())
             {
                    var _res = nwd.Orders
                        .OrderBy(sortColformatted +" "+ sortDir +", OrderID "+ sortDir)
                        .Skip((page - 1) * rowsPerPage)
                        .Take(rowsPerPage)
                        .Select(o => new MyModel
                        {
                            OrderID = o.OrderID,
                            OrderDate = o.OrderDate,
                            Freight = o.Freight,
                            ShipCity = o.ShipCity,
                            ShipCountry = o.ShipCountry,
                            CompanyName = o.Customer.CompanyName,
                            ContactName = o.Customer.ContactName,
                            EmpFirstName = o.Employee.FirstName,
                            EmpLastName = o.Employee.LastName
                        });
                    sql = _res.ToString();
                    res = _res.ToList();
                    count = nwd.Orders.Count();
            }
            ViewBag.sql = sql;
            ViewBag.sortCol = sortCol;
            ViewBag.sortDir = sortDir;
            ViewBag.rowsPerPage = rowsPerPage;
            ViewBag.count = count;
            return View(res);

        }


    }
    public class MyModel
    {
        [Key]
        public int OrderID { get; set; }
        public DateTime? OrderDate { get; set; }
        public decimal? Freight { get; set; }
        public string ShipCity { get; set; }
        public string ShipCountry { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }

    }
}