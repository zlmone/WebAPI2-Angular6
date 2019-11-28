using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Reports.Attendance;
namespace VIS_Repository.Reports.Attendance
{
   public class OfficialWorkReportRepository : VISDbCommand
    {

        int intAffectedRecords;

        public OfficialWorkReportRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public DataTable GetEmployee()
        {
            try
            {
                string mode = "Employee";
                DataTable dt = new DataTable();
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = OfficialWorkReportConstant.const_ProcAttendanceReportBindDropdown;
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_Mode, mode);

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable GetYear()
        {
            try
            {
                DataTable dt = new DataTable();
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = OfficialWorkReportConstant.const_procFinancialYear_SelectAll;

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
                return dt;
            }
            catch (Exception)
            {
                throw;
            }
            
        }

        public DataTable GetOfficialWorkReport(OfficialWorkReportParamterModel objOfficialWorkReportParamterModel)
        {
            try
            {
                string Mode = "Report";
                DataTable dt = new DataTable();
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = OfficialWorkReportConstant.const_procUSP_OfficeWorkInOut;
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_Mode, Mode);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_EmployeeId, objOfficialWorkReportParamterModel.EmployeeId);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_FromDate, objOfficialWorkReportParamterModel.FromDate);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_ToDate, objOfficialWorkReportParamterModel.ToDate);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_ReportSort, objOfficialWorkReportParamterModel.ReportSort);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_Sort, objOfficialWorkReportParamterModel.Sort);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_UserId, objOfficialWorkReportParamterModel.UserId);
                    base.objSqlCommand.Parameters.AddWithValue(OfficialWorkReportConstant.const_UserType, objOfficialWorkReportParamterModel.UserType);

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
                return dt;
            }
            catch (Exception)
            {
                throw;
            }

            
        }  

    }
}
