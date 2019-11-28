using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Reports.Attendance;

namespace VIS_Repository.Reports.Attendance
{
    public class AttendanceReportNewRepository : VISDbCommand
    {
        public AttendanceReportNewRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public IEnumerable<FillDepartment> FillDepartMent()
        {
            List<FillDepartment> objListToReturn = new List<FillDepartment>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "FillDP");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillDepartment>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<FillEmployee> FillEmployee(Int64 UserId, string UserType)
        {
            List<FillEmployee> objListToReturn = new List<FillEmployee>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_Proc_EmployeeDetail;
                if (UserType == "DHEmpDetail")
                {
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "DHEmpDetail");
                }
                else
                {
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "EmpDetail");
                }
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Id, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillEmployee>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<FillEmployee> FillAllEmployee(Boolean Allow, Int64 UserId)
        {
            List<FillEmployee> objListToReturn = new List<FillEmployee>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "chkInActiveEmployee");
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Allow, Allow);
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillEmployee>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<FillCompany> FillCompany(Boolean Allow)
        {
            List<FillCompany> objListToReturn = new List<FillCompany>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "FillCompany");
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Allow, Allow);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillCompany>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<FillLineManager> FillAllLineManager(Boolean Allow, Int64 UserId)
        {
            List<FillLineManager> objListToReturn = new List<FillLineManager>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "FillAllLineManager");
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Allow, Allow);
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillLineManager>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<FillUserType> FillUserType()
        {
            List<FillUserType> objListToReturn = new List<FillUserType>();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_procAttendanceReportNew_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, "FillUserType");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<FillUserType>(dt);
            }
            return objListToReturn;
        }

        public DataTable FillYear()
        {
            ArrayList list = new ArrayList();
            int currentyear = DateTime.Now.Year;
            for (int i = 2009; i <= currentyear; i++)
            {
                list.Add(i);
            }
            DataTable dt = new DataTable();
            DataColumn dc = new DataColumn();
            dc = dt.Columns.Add("Id", typeof(Int64));
            dc.AutoIncrement = true;
            dc.AutoIncrementSeed = 1;
            dc.AutoIncrementStep = 1;
            dc = dt.Columns.Add("Year", typeof(Int64));

            foreach (int item in list)
            {
                DataRow row = dt.NewRow();
                row["Year"] = item;
                dt.Rows.Add(row);
            }
            return dt;
        }
        public string GetSystemDateTime()
        {
            string CurrentDate = System.DateTime.Now.ToString();

            return CurrentDate;
        }
        public DataTable GetAllAttendanceReport(string Mode, Int64 ModeId, string StartDate, string EndDate, string SortBy, Boolean IsAdmin)
        {
            DataTable dt = new DataTable();
            try
            {
                int longLeave = Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]);
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_Proc_AttendanceReport;
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode, Mode);

                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_modeId, ModeId);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_fromDate, StartDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_toDate, EndDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_SortBy, SortBy);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_isAdmin, IsAdmin);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_LongLeaveValue, longLeave);

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
            }
            catch(Exception ex)
            {

            }
            return dt;
        }
        public DataTable GetAllAttendanceData(string Mode, Int64 ModeId, string StartDate, string EndDate, string SortBy, Boolean IsAdmin)
        {
            DataTable dt = new DataTable();
            try
            {
                int longLeave = Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]);
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = AttendanceReportNewConstatnts.const_ProcAttendanceReport_rdlc;
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_Mode,Mode);

                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_modeId,ModeId);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_fromDate,StartDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_toDate,EndDate);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_SortBy,SortBy);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_isAdmin,IsAdmin);
                    base.objSqlCommand.Parameters.AddWithValue(AttendanceReportNewConstatnts.const_Field_LongLeaveValue, longLeave);

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                }
            }
            catch(Exception ex)
            {
                
            }
            return dt;
        }

    }
}
