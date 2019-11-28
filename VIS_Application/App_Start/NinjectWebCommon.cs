using System;
using System.Web;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Web.Common;
using VIS_Repository;
using System.Configuration;
using VIS_Repository.Masters;
using VIS_Domain.Registration;
using VIS_Domain.Master;
using VIS_Repository.Registration;
using VIS_Domain.Master.CurrencyRelated;
using VIS_Domain.Master.EmployeeLevels;
using VIS_Domain.Master.CompanyRelated;
using VIS_Domain.Master.VacancyRelated;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Masters.CurrencyRelated;
using VIS_Repository.Masters.EmployeeLevels;
using VIS_Repository.Masters.CompanyRelated;
using VIS_Repository.Masters.VacancyRelated;
using VIS_Repository.Masters.Configuration;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Domain.Notification;
using VIS_Repository.Notification;
using VIS_Domain.Masters.EmployeeLevelCriteriaSetup;
using VIS_Domain.Master.VacancyRelated;
using VIS_Domain.UserManagement;
using VIS_Repository.UserManagement;
using VIS_Domain.Master.EmployeeManualPointEntry;
using VIS_Repository.RFQ;
using VIS_Domain.RFQ;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(VIS_App.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(VIS_App.App_Start.NinjectWebCommon), "Stop")]

namespace VIS_App.App_Start
{


    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

                RegisterServices(kernel);
                 return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind(typeof(VISIBaseRepository<Currency>)).To<CurrencyRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<VISUser>)).To<VISUserRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Levels>)).To<LevelsRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<ContactMaster>)).To<ContactMasterRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<BankMaster>)).To<BankMasterRepositiory>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<LookupType>)).To<LookupTypeRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<RatingType>)).To<RatingTypeRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Lookup>)).To<LookupRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<SkillGroup>)).To<SkillGroupRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Skill>)).To<SkillRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Position>)).To<PositionRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<TechnologyMaster>)).To<TechnologyMasterRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<CompanyMaster>)).To<CompanyMasterRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<MacIdConfiguration>)).To<MacIdConfigurationRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<SecurityKey>)).To<SecurityKeyRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<FinancialYear>)).To<FinancialYearRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<>)).To<FinancialYearRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<EventCountDown>)).To<EventCountDownRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<CommonConfiguration>)).To<CommonConfigurationRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<LevelConfiguration>)).To<LevelConfigurationRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Policy>)).To<PolicyRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<ConfigureWorksheet>)).To<ConfigureWorksheetRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<News>)).To<NewsRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<MyTicket>)).To<MyTicketRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<TicketListOpen>)).To<TicketListOpenRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<TicketListClosed>)).To<TicketListClosedRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<LevelCriteriaSetup>)).To<LevelCriteriaSetupRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<ConfigureTicket>)).To<ConfigureTicketRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);           
            kernel.Bind(typeof(VISIBaseRepository<HomePageImage>)).To<HomePageImageRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<LeaveType>)).To<LeaveTypeRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<GroupName>)).To<GroupNameRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<Levels_Achievement>)).To<Levels_AchievementRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<AttendanceEntry>)).To<AttendanceEntryRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<UserRole>)).To<UserRoleRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<EducationType>)).To<EducationTypeRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<ManualPointEntry>)).To<ManualPointEntryRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<SalaryBreakupType>)).To<SalaryBreakupTypeRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<RFQList>)).To<RFQRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            kernel.Bind(typeof(VISIBaseRepository<RFQResponse>)).To<RFQResponseRepository>().WithConstructorArgument("_connectionstring", ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            
        }
    }
}
