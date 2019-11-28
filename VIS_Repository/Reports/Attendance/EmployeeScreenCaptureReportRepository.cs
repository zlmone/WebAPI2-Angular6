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
    public class EmployeeScreenCaptureReportRepository : VISDbCommand
    {
        int intAffectedRecords;

        public EmployeeScreenCaptureReportRepository(string _connectionstring) : base(_connectionstring)
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
                base.objSqlCommand.CommandText = EmployeeScreenCaptureReportConstant.const_procFinancialYear_SelectAll;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetScreenCaptureReportByEmployeeId(EmployeeScreenCaptureParamterModel entityobject)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmployeeScreenCaptureReportConstant.const_procEmployee_ScreenCaptureReport;
                    objSqlCommand.Parameters.AddWithValue(EmployeeScreenCaptureReportConstant.const_EmployeeId, entityobject.EmployeeId);
                    objSqlCommand.Parameters.AddWithValue(EmployeeScreenCaptureReportConstant.const_FromDate,entityobject.FromDate);
                    objSqlCommand.Parameters.AddWithValue(EmployeeScreenCaptureReportConstant.const_ToDate,entityobject.ToDate);
                    objSqlCommand.Parameters.AddWithValue(EmployeeScreenCaptureReportConstant.const_OrderBy, entityobject.OrderBy);
                    objSqlCommand.Parameters.AddWithValue(EmployeeScreenCaptureReportConstant.const_LoginUserId, entityobject.LoginUserId);

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