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
    public class DailyEntrySheetRepository : VISDbCommand
    {
        int intAffectedRecords;

        public DataSet DailyEntrysheetdata { get; set; }

        public DailyEntrySheetRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public IEnumerable<EmployeeMaster> GetAllEmployees()
        {
            List<EmployeeMaster> objListToReturn = new List<EmployeeMaster>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = DailyEntrysheetConstant.const_procEmployee_Master_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeMaster>(dt);
            }
            return objListToReturn;

        }

        public IEnumerable<DailyEntrysheetEmployee> GetDailyEntrySheetData(Int64 Id, string Date)
        {
            List<DailyEntrysheetEmployee> objListToReturn = new List<DailyEntrysheetEmployee>();
            string mode = null;
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = DailyEntrysheetConstant.const_procReportPerEmp;
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_Mode,mode);
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_EmployeeId, Id);
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_ForWhichDate, Date);
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_LoginUserId, Id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }

                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    objListToReturn = VISAutoMapper.ConvertDataTable<DailyEntrysheetEmployee>(dt);
                }
            }
            catch (Exception)
            {

                
            }
            
            return objListToReturn;
        }

        public DataTable GetDailyEntrySheetTime(Int64 Id, string Date)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = DailyEntrysheetConstant.const_ProcCalTotalAttendanceReport;
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_EmployeeID, Id);
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_Date, Date);
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
                
            }
            return dt;

        }

        public DataTable GetDailyEntrySheetTimeAllEmployee(string Date)
        {
            string dd;
            string mm;
            string yy;

            yy = Date.Substring(0,4);
            mm = Date.Substring(8,2);
            dd = Date.Substring(5,2);
            Date = mm + "/" + dd + "/" + yy;

            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = DailyEntrysheetConstant.const_ProcCalTotalAttendanceReportAllEmployee;
                    base.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_Date, Date);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
            }
            catch (Exception ex)
            {
                string errormsg = ex.Message + Environment.NewLine + ex.StackTrace;
            }
            return dt;

        }

        public string UpdateReportDetail(DailyEntrysheetEmployee entityObject)
        {
            try
            {
                
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DailyEntrysheetConstant.const_procreportRecordUpdate;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Transaction_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_Time, entityObject.Entry_Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_actualEntryTime, entityObject.actualEntryTime);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_Remarks, entityObject.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DailyEntrysheetParamaterConstant.const_grace, entityObject.Grace);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))

                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

    }
}