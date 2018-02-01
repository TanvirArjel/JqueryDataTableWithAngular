using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace JqueryDataTableWithAngular
{
    public class EmployeeDbContextFactory : IDesignTimeDbContextFactory<EmployeeDbContext>
    {
        public EmployeeDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .Build();

            var builder = new DbContextOptionsBuilder<EmployeeDbContext>();

            builder.UseSqlServer(configuration["ConnectionStrings:EmployeeWebServiceConnection"], b => b.MigrationsAssembly("AngularWithASPNETCoreWebAPI"));
            //builder.UseOpenIddict();

            return new EmployeeDbContext(builder.Options);
        }
    }
}
