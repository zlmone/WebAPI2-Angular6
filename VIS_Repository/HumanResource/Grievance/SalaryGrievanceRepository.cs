using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain.HumanResource.Grievance;
using System.Globalization;
using VIS_Domain;

namespace VIS_Repository.HumanResource.Grievance
{
    public class SalaryGrievanceRepository :VISDbCommand
    {
        public Int32 intAffectedRecords { get; set; }

        public SalaryGrievanceRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public IEnumerable<FillGrievance> GetGrievance(Int64 UserId, string mode)
        {
            List<FillGrievance> objListToReturn = new List<FillGrievance>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SalaryGrievanceConstants.const_ProcSalaryGrievanceProcessing_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_EmployeeId,UserId);
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillGrievance>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<FillGrievanceDate> FillDeductionDate(Int64 UserId, string mode)
        {
            List<FillGrievanceDate> objListToReturn = new List<FillGrievanceDate>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_PA_GetGrievanceDate;
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_EmployeeId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillGrievanceDate>(dt);
            }
            return objListToReturn;
        }

        public DataTable LoadEmployeeDailyEntry(Int64 EmployeeId, string Date)
        {
            string[] datearray = Date.Split('/');
            string strDate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_ReportPerEmp_Grievance;
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_empId, EmployeeId);
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_forWhichDate,Convert.ToDateTime(strDate));
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable LoadEmployeeAttendance(Int64 EmployeeId, string Date)
        {
            //DateTime forwhichDate = Convert.ToDateTime(Date);
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_GetAttendancePerEmp_Grievance;
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_empId, EmployeeId);
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_Date, Date);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public string AddGrievance(Int64 EmployeeId, string Date, string PaycutAmt, string GrievanceRemark)
        {
            try
            {
                string[] datearray = Date.Split('/');
                string strDate = datearray[1] + "/" + datearray[0] + "/" + datearray[2];

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_InsertupdateGrievance;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_mode, "Insert");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_EmployeeId,EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_DeductionDate,Convert.ToDateTime(strDate));
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_PC_AMT,PaycutAmt);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_Grievance_Remark,GrievanceRemark);
                
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();

            }
            catch(Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        public string UpdateEntity(SalaryGrievance entityGrievance)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_InsertupdateGrievance;

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_mode, "Update");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_Id,entityGrievance.Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_Grievance_Remark,entityGrievance.Grievance_Remarks);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_UpdatedBy,entityGrievance.Employee_Id);

            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            objVISDbCommand.objSqlCommand.Connection.Open();
            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            objSqlCommand.Connection.Close();

            string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
            return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
        }

        public DataTable GetGrievanceData(Int64 Id)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SalaryGrievanceConstants.const_Proc_PA_GetGrievanceDate;
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_mode, "Grievance");
                base.objSqlCommand.Parameters.AddWithValue(SalaryGrievanceConstants.const_Field_Id,Id);

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
