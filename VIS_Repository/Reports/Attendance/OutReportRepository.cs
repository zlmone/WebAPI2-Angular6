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
    public class OutReportRepository : VISDbCommand
    {
        int intAffectedRecords;

        public OutReportRepository(string _connectionstring) : base(_connectionstring)
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
                base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_mode,mode);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetAllEmployee()
        {
            string mode = "AllEmployee";
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

        public DataTable GetDepartment()
        {
            string mode = "Department";
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

        public DataTable GetCompany()
        {
            string mode = "Company";
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

        public DataTable GetLineManager()
        {
            string mode = "LineManager";
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

        public DataTable GetEmployeeIdByLM(int LineManagerId)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = OutReportConstant.const_procOutReportByLM;
                base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_LineManagerId,LineManagerId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetEmployeeIdByCompany(int CompanyId)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = OutReportConstant.const_procOutReportByCompany;
                base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_CompanyId, CompanyId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetEmployeeIdByDepartment(int ParentId)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = OutReportConstant.const_procOutReportByDepartment;
                base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_ParentId,ParentId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetOutReportByEmployeeId(OutReport entityobject)
        {
            DataTable dt = new DataTable();
            try
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = OutReportConstant.const_procOutReport;
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_EmployeeId, entityobject.EmployeeId);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_Active, entityobject.Active);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_FromDate, entityobject.FromDate);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_ToDate, entityobject.ToDate);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_OutType, entityobject.OutType);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_Minute, entityobject.Minute);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_AllDate, entityobject.AllDate);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_Employeelist, entityobject.Employeelist);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_Consolidated, entityobject.Consolidated);
                    base.objSqlCommand.Parameters.AddWithValue(OutReportConstant.const_Field_Sort, entityobject.Sort);

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