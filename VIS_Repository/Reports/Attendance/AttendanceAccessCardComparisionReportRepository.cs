using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using VIS_Domain.Master.Configuration;

namespace VIS_Repository.Reports.Attendance
{
   public class AttendanceAccessCardComparisionReportRepository : VISDbCommand
    {
        int intAffectedRecords;

        public AttendanceAccessCardComparisionReportRepository(string _connectionstring) : base(_connectionstring)
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
                base.objSqlCommand.CommandText = AttendanceAccessCardComparisionReportConstant.const_procFinancialYear_SelectAll;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetAttendanceAccessCardEntryComparisionEmployeeId(AttendanceAccessCardComparisionReportParameterModel entityobject)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = AttendanceAccessCardComparisionReportConstant.const_procAccessCardEntry_Report;
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_EmployeeId, entityobject.EmployeeId);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_FromDate, entityobject.FromDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_ToDate, entityobject.ToDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_IssueOnly, entityobject.IssueOnly);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_Search, entityobject.Search);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceAccessCardComparisionReportConstant.const_LoginUserId, entityobject.LoginUserId);

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
