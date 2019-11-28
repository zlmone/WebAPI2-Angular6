using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using VIS_Domain.Reports.Attendance;
using System.Data.SqlClient;
using VIS_Domain;
using System.Globalization;

namespace VIS_Repository.Reports.Attendance
{
    public class AddEmployeeRecordRepository : VISDbCommand
    {
        int intAffectedRecords;
        //AddEmployeeRecordRepository objAddEmployeeRecordRepository = null;
        public AddEmployeeRecordRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public IEnumerable<EmployeeMaster> GetEmployee()
        {
            List<EmployeeMaster> objListToReturn = new List<EmployeeMaster>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_procGeneralSP;
                base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Mode, "GetEmployeeMaster");

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
        public IEnumerable<BindEmployeeDetails> GetEmployeeDetails(Int64 EmpId, string Date, Int64 LoginUserId)
        {
            List<BindEmployeeDetails> objListToReturn = new List<BindEmployeeDetails>();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_procReportPerEmp;
                    base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_empId, EmpId);
                    base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_forWhichDate, Date);
                    base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_LoginUserId, LoginUserId);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    objListToReturn = VISAutoMapper.ConvertDataTable<BindEmployeeDetails>(dt);
                }
            }
            catch (Exception ex)
            {
            }
            return objListToReturn;
        }
        public DataTable BindEmployeeAttendance(Int64 EmployeeID, string Date)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_ProcCalTotalAttendanceReport;
                    base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_EmployeeID,EmployeeID);
                    base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Date, Date);
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
            }
            return dt;
        }
        public IEnumerable<BindHRAttendanceDetails> BindHRAttendanceDetails(Int64 EmployeeId, string forWhichDate)
        {
            
            List<BindHRAttendanceDetails> objListToReturn = new List<BindHRAttendanceDetails>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_Proc_HRAttendanceDetail;
                base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_EmployeeID,EmployeeId);
                base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_forWhichDate,forWhichDate);
                base.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Mode, "GetHRDetails"); 
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<BindHRAttendanceDetails>(dt);
            }
            return objListToReturn;
        }
        public DataTable GetAttendanceTransaction(Int64 EmployeeId, string Date, Int64 EntryType)
        {
            DataTable dt = new DataTable();
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_procGeneralSP;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Id, EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_StrDate, Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Mode, "GetAttend_TransactionDetail");

                objVISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                da.Fill(dt);
            }
            catch (Exception ex)
            {

            }
            return dt;
        }
        public string GetUpdateEmployeeAttendance(Int64 id, Int64 EmployeeId, Int64 EntryType, string Remarks, string entryTime, string Date, Int64 Grace, Int64 LoginId, string ActualEntryTime)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_Proc_updateTransaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id,id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Employee_Id,EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Entry_Type,EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Remarks,Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Entry_Time,entryTime);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Date,Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_actualEntryTime, ActualEntryTime);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_grace,Grace);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_createdBy,LoginId);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }
        public string AddEmployee(Int64 EmployeeId, Int64 EntryType, string Remarks,string entryTime, string Date, string Time, Int64 Grace)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AddEmployeeRecordConstant.const_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Mode,"add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Employee_Id, EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Entry_Type, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Remarks, Remarks.Trim().ToString());
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Entry_Time,entryTime);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_Date, Date.Trim().ToString());
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_actualEntryTime,Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AddEmployeeRecordConstant.const_grace, Grace);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }
    }
}
