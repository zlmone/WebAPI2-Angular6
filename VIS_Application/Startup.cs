using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VIS_App.Startup))]
namespace VIS_App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
