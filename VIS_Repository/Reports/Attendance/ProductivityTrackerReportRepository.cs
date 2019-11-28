using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using VIS_Domain;
using VIS_Domain.Reports.Attendance;
using System.Data.SqlClient;

namespace VIS_Repository.Reports.Attendance
{
    public class ProductivityTrackerReportRepository : VISDbCommand
    {
        public ProductivityTrackerReportRepository(string _connectionstring) : base(_connectionstring){}

        public IEnumerable<FillDP> FillDepartment()
        {
            List<FillDP> objListToReturn = new List<FillDP>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "Department");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillDP>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<EmployeeList> FillEmployee(Int64 UserId, Boolean InActive)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_procGetEmployeeForOutReport;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "allemp");
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_empid, UserId);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_InActive,InActive);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<EmployeeList> FillAllEmployees(Int64 UserId, Boolean Allow)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "GetAllEmployee");
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Allow, Allow);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<LineManager> FillLineManager(Int64 UserId, Boolean Allow)
        {
            List<LineManager> objListToReturn = new List<LineManager>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "FillAllLineManager");
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Allow, Allow);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<LineManager>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<Lookup> FillLookup()
        {
            List<Lookup> objListToReturn = new List<Lookup>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "GetlookupType");
                
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<Lookup>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<YearData> FillYear()
        {
            List<YearData> objListToReturn = new List<YearData>();
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "Year");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<YearData>(dt);
            }
            return objListToReturn;
        }

        public DataTable GetProductivity(string sort, string FromDate, string ToDate, string Employeeids, string Mode, string OutIds, string Consolidatedview, string chk)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_Proc_productivityTracker;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_sort,sort);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_fromDate,FromDate);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_toDate,ToDate);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Employeelist,Convert.ToString(Employeeids));
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode,Mode);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_OutType,OutIds);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Consolidate,Consolidatedview);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Out,chk);
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.Const_Field_Duration,"");

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }
        public DataTable FillOverall()
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ProductivityTrackerReportConstants.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(ProductivityTrackerReportConstants.const_Field_Mode, "GetOverAllEmployee");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }
        
    }
}
