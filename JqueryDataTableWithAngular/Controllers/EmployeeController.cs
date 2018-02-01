using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.ViewModels;
using System.Linq.Dynamic.Core;
using CommonCodes.ExtensionMethods;

namespace JqueryDataTableWithAngular.Controllers
{
    [Produces("application/json")]
    [Route("api/Employee/[action]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeDbContext _context;

        public EmployeeController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            List<Employee> employees = _context.Employees.ToList();
            return employees;
        }

        [HttpPost]
        public async Task<IActionResult> GetEmployeeList([FromBody] DataTableParams dataTablesParams)
        {
            int draw = dataTablesParams.Draw;
            int start = dataTablesParams.Start;
            int length = dataTablesParams.Length;

            //Sorting Column and order
            string sortColumnName = dataTablesParams.Columns[dataTablesParams.Order[0].Column].Name;
            string sortColumnDir = dataTablesParams.Order[0].Dir;

            //Individual Column Search value
            string employeeId = dataTablesParams.Columns[1].Search.Value;
            string employeeName = dataTablesParams.Columns[2].Search.Value;
            string gender = dataTablesParams.Columns[3].Search.Value;
            string annualSalary = dataTablesParams.Columns[4].Search.Value;
            string dateOfBirth = dataTablesParams.Columns[5].Search.Value;


            IQueryable<Employee> employeesAsQueryable = _context.Employees.AsQueryable();

            int recordsTotal = employeesAsQueryable.Count();
            
            //Global Search
            string globalSearchValue = dataTablesParams.Search.Value;

            if (!string.IsNullOrWhiteSpace(globalSearchValue))
            {
                employeesAsQueryable = employeesAsQueryable.Where(e => e.EmployeeId.ToString().Contains(globalSearchValue) || e.EmployeeName.Contains(globalSearchValue) || e.Gender.Contains(globalSearchValue)
                                                                       || e.AnnualSalary.ToString().Contains(globalSearchValue) || e.DateOfBirth.Contains(globalSearchValue));
            }

            //Searching By Individual Column

            if (!string.IsNullOrWhiteSpace(employeeId) || !string.IsNullOrWhiteSpace(employeeName) || !string.IsNullOrWhiteSpace(gender) || !string.IsNullOrWhiteSpace(annualSalary) || !string.IsNullOrWhiteSpace(dateOfBirth))
            {
                employeesAsQueryable = employeesAsQueryable.Where(e => e.EmployeeId.ToString().Contains(employeeId) && e.EmployeeName.Contains(employeeName) && e.Gender.Contains(gender)
                                                                       && e.AnnualSalary.ToString().Contains(annualSalary) && e.DateOfBirth.Contains(dateOfBirth));
            }

            int recordsFiltered = employeesAsQueryable.Count();

            try
            {
                //Sorting By Individual Column
                if (!(string.IsNullOrEmpty(sortColumnName) && string.IsNullOrEmpty(sortColumnDir)))
                {
                    employeesAsQueryable = employeesAsQueryable.OrderBy(sortColumnName + " " + sortColumnDir);
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                throw;
            }
           
            List<Employee> employeeList = await employeesAsQueryable.Skip(start).Take(length).ToListAsync();
            return Json(new { draw = draw, recordsTotal = recordsTotal, recordsFiltered = recordsFiltered, data = employeeList });
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.SingleOrDefaultAsync(m => m.EmployeeId == id);

            //if (employee == null)
            //{
            //    return NotFound();
            //}

            return Ok(employee);
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employee);
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> PostEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Employees.Add(employee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeeExists(employee.EmployeeId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employee = await _context.Employees.SingleOrDefaultAsync(m => m.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.EmployeeId == id);
        }
    }
}