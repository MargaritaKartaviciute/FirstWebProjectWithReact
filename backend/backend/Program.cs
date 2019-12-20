using backend.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<RaskKambariokaDbContext>();
            DbInitializer.Seed(context);
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://localhost:5000")
                .Build();
    }
}
