using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master.Configuration;

namespace VIS_Repository.Reports
{
    public class EmployeeDashboardHeartBeatReportRepository : VISDbCommand
    {
        int intAffectedRecords;

        public EmployeeDashboardHeartBeatReportRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public DataTable GetEmployee()
        {
            string mode = "Employee";
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = OutReportConstant.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_mode, mode);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetYear()
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeDashboardHeartBeatReportParameterModelConstant.const_procFinancialYear_SelectAll;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetEmployeeDashboardHeartBeatReporytByEmployeeId(EmployeeDashboardHeartBeatReportParameterModel entityobject)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmployeeDashboardHeartBeatReportParameterModelConstant.const_procEmployee_DashboardHeartBeatReport;
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_EmployeeId, entityobject.EmployeeId);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_FromDate, entityobject.FromDate);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_ToDate, entityobject.ToDate);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_ViewBy, entityobject.ViewBy);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_ConsolidateBy, entityobject.ConsolidateBy);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_OrderBy, entityobject.OrderBy);
                    objSqlCommand.Parameters.AddWithValue(EmployeeDashboardHeartBeatReportParameterModelConstant.const_LoginUserId, entityobject.LoginUserId);

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
            }
            catch (Exception)
            {

            }

            return dt;
        }

    }
}