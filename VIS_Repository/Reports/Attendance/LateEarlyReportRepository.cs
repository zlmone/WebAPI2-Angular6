using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using VIS_Domain;
using VIS_Domain.Master.Configuration;
using VIS_Domain.Reports.Attendance;

namespace VIS_Repository.Reports.Attendance
{
    public class LateEarlyReportRepository : VISDbCommand
    {
        int LateComing = 0;
        int EarlyLeaving = 0;

        DataTable dtlatecome = new DataTable();
        DataTable dtlatecount = new DataTable();
        
        public LateEarlyReportRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public DataTable GetEmployee()
        {
            string mode = "Employee";
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode,mode);

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
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);

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
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);

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
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcAttendanceReportBindDropdown;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);

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
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_procFinancialYear_SelectAll;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }

        public DataTable GetEmployeeIdByDepartment(Int64 Id, DateTime Fromdate, DateTime Todate)
        {
            string mode = "Department";
            DataTable dt = new DataTable();
            DataTable dtLate = new DataTable();
            DataRow drLate;
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_procGetEmployeeId;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Id, Id);
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }

            dtLate.Columns.Add("Employees_Name", Type.GetType("System.String"));
            dtLate.Columns.Add("LateComing", Type.GetType("System.String"));
            dtLate.Columns.Add("EarlyLeaving", Type.GetType("System.String"));
            dtLate.Columns.Add("LessTime", Type.GetType("System.String"));

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                GetLateComingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);
                GetEarlyLeavingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);

                DataColumn dcLate = new DataColumn();
                drLate = dtLate.NewRow();
                drLate["Employees_Name"] = dr[1];
                drLate["LateComing"] = LateComing;
                drLate["EarlyLeaving"] = EarlyLeaving;
                drLate["LessTime"] = "";

                dtLate.Rows.Add(drLate);

                //if (dtlatecount.Rows.Count < 1)
                //{
                //    dtLate.Clear();
                //}
            }

            return dtLate;
        }

        public DataTable GetEmployeeIdByEmployee(Int64 Id,DateTime Fromdate,DateTime Todate)
        {
            try
            {
                string mode = "Employee";
                DataTable dt = new DataTable();
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = LateEarlyReportConstant.const_procGetEmployeeId;
                    base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Id, Id);
                    base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    da.Fill(dt);
                    base.objSqlCommand.Connection.Close();
                }

                //GetLateComingReport(Id, Fromdate, Todate);
                //GetEarlyLeavingReport(Id, Fromdate, Todate);

                DataTable dtLate = new DataTable();
                DataRow drLate;
                DataColumn dcLate = new DataColumn();

                dtLate.Columns.Add("Employees_Name", Type.GetType("System.String"));
                dtLate.Columns.Add("LateComing", Type.GetType("System.String"));
                dtLate.Columns.Add("EarlyLeaving", Type.GetType("System.String"));
                dtLate.Columns.Add("LessTime", Type.GetType("System.String"));

                drLate = dtLate.NewRow();
                drLate["Employees_Name"] = dt.Rows[0]["Employee_Name"].ToString();
                drLate["LateComing"] = GetLateComingReport(Id, Fromdate, Todate);
                drLate["EarlyLeaving"] = GetEarlyLeavingReport(Id, Fromdate, Todate);
                drLate["LessTime"] = "";

                dtLate.Rows.Add(drLate);

                if (dtlatecount.Rows.Count < 1)
                {
                    dtLate.Clear();
                }

                return dtLate;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public DataTable GetEmployeeIdByCompany(Int64 Id, DateTime Fromdate, DateTime Todate)
        {
            string mode = "Company";
            DataTable dt = new DataTable();
            DataTable dtLate = new DataTable();
            DataRow drLate;
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_procGetEmployeeId;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Id, Id);
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }

            dtLate.Columns.Add("Employees_Name", Type.GetType("System.String"));
            dtLate.Columns.Add("LateComing", Type.GetType("System.String"));
            dtLate.Columns.Add("EarlyLeaving", Type.GetType("System.String"));
            dtLate.Columns.Add("LessTime", Type.GetType("System.String"));

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                GetLateComingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);
                GetEarlyLeavingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);

                DataColumn dcLate = new DataColumn();
                drLate = dtLate.NewRow();
                drLate["Employees_Name"] = dr[1];
                drLate["LateComing"] = LateComing;
                drLate["EarlyLeaving"] = EarlyLeaving;
                drLate["LessTime"] = "";

                dtLate.Rows.Add(drLate);

                //if (dtlatecount.Rows.Count < 1)
                //{
                //    dtLate.Clear();
                //}
            }

            return dtLate;
        }

        public DataTable GetEmployeeIdSelectAll(Int64 Id, DateTime Fromdate, DateTime Todate)
        {
            string mode = "SelectAll";
            DataTable dt = new DataTable();
            DataTable dtLate = new DataTable();
            DataRow drLate;
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = LateEarlyReportConstant.const_procGetEmployeeId;
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Id, Id);
                base.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }

            dtLate.Columns.Add("Employees_Name", Type.GetType("System.String"));
            dtLate.Columns.Add("LateComing", Type.GetType("System.String"));
            dtLate.Columns.Add("EarlyLeaving", Type.GetType("System.String"));
            dtLate.Columns.Add("LessTime", Type.GetType("System.String"));

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow dr = dt.Rows[i];
                GetLateComingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);
                GetEarlyLeavingReport(Convert.ToInt16(dr[0]), Fromdate, Todate);

                DataColumn dcLate = new DataColumn();
                drLate = dtLate.NewRow();
                drLate["Employees_Name"] = dr[1];
                drLate["LateComing"] = LateComing;
                drLate["EarlyLeaving"] = EarlyLeaving;
                drLate["LessTime"] = "";

                dtLate.Rows.Add(drLate);

                //if (dtlatecount.Rows.Count < 1)
                //{
                //    dtLate.Clear();
                //}
            }

            return dtLate;
        }

        public int GetLateComingReport(Int64 Id, DateTime Fromdate, DateTime Todate)
        {
            LateComing = 0;

            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

            DateTime DtTodayDate = Convert.ToDateTime(DateTime.Today.Date.ToShortDateString());

            TimeSpan diff = Todate - Fromdate;
            int numdays = diff.Days;
            numdays = numdays + 1;
            DateTime tempFromDt;
            tempFromDt = Fromdate;
        


            for (int i = 0; i < numdays; i++)
            {
                string TempFromDateNew = tempFromDt.ToString();
                string[] ArrayTempFromDateNew = TempFromDateNew.Split(' ');
                string newformdate = ArrayTempFromDateNew[0];
                string[] DateFormat = newformdate.Split('/');
                string dd, mm, yyyy, finaldate;
                dd = DateFormat[1];
                mm = DateFormat[0];
                yyyy = DateFormat[2];

                if (dd.Length == 1)
                {
                    dd = "0" + dd;
                }

                if (mm.Length == 1)
                {
                    mm = "0" + mm;
                }

                finaldate = dd + "/" + mm + "/" + yyyy;

                    objVISDbCommand.objSqlCommand.Connection.Open();
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcLevels_GetAttendanceForLateComing;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Employee_Id, Id);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Date, finaldate);
                    SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                    dtlatecome.Clear();
                    da.Fill(dtlatecome);
                    dtlatecount = dtlatecome;
                    objVISDbCommand.objSqlCommand.Connection.Close();
                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                 
                if (dtlatecome.Rows.Count > 0 && dtlatecome.Rows!=null)
                {
                    int EntryType = Convert.ToInt16(dtlatecome.Rows[0]["Entry_Type"]);
                    DateTime EntryTime = DateTime.Parse(dtlatecome.Rows[0]["Entry_Time"].ToString());
                    string ActualEntryTime = dtlatecome.Rows[0]["actualEntryTime"].ToString();

                    string[] tempactualentrytime = ActualEntryTime.Split(':');
                    string TemptempactualentrytimeHH = tempactualentrytime[0];
                    string TemptempactualentrytimeMM = tempactualentrytime[1];

                    int TemptempactualentrytimeHHnew = Convert.ToInt16(TemptempactualentrytimeHH.ToString());
                    int TemptempactualentrytimeMMNew = Convert.ToInt16(TemptempactualentrytimeMM.ToString());

                    float finalactualtime = Convert.ToSingle(TemptempactualentrytimeHHnew + "." + TemptempactualentrytimeMMNew);

                    //

                    string[] tempentrytime = EntryTime.ToString().Split(' ');
                    string[] tempentrytimenew = tempentrytime[1].Split(':');

                    string timehh, timemm;
                    timehh = tempentrytimenew[0];
                    timemm = tempentrytimenew[1];

                    int temptimehh = Convert.ToInt16(timehh.ToString());
                    int temptimemm = Convert.ToInt16(timemm.ToString());

                    float finlentrytime = Convert.ToSingle(temptimehh + "." + temptimemm);

                    
                    if (EntryType == 1 && finalactualtime < finlentrytime)
                    {
                        LateComing++;
                    }
                    
                }
                else
                {
                    LateComing = LateComing + 0;
                }
                tempFromDt = tempFromDt.AddDays(1);
            }
            return LateComing;

        }

        public int GetEarlyLeavingReport(Int64 Id, DateTime Fromdate, DateTime Todate)
        {
            EarlyLeaving = 0;

            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

            DateTime DtTodayDate = Convert.ToDateTime(DateTime.Today.Date.ToShortDateString());

            TimeSpan diff = Todate - Fromdate;
            int numdays = diff.Days;
            numdays = numdays + 1;
            DateTime tempFromDt;
            tempFromDt = Fromdate;
            DataTable dt = new DataTable();

            for (int i = 0; i < numdays; i++)
            {

                objVISDbCommand.objSqlCommand.Connection.Open();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = LateEarlyReportConstant.const_ProcLevels_GetAttendance;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Employee_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(LateEarlyReportConstant.const_Date, tempFromDt);
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                dt.Clear();
                da.Fill(dt);
                objVISDbCommand.objSqlCommand.Connection.Close();
                objVISDbCommand.objSqlCommand.Parameters.Clear();

                string punchtime = dt.Rows[0][1].ToString();
                string wktime = dt.Rows[0][3].ToString();

                if (dt.Rows.Count > 0 && punchtime != "" && wktime != "")
                {

                    string TempTotalPunchingTimeHH;
                    string TempTotalPunchingTimeMM;

                    string TempTotalWorkingTimeHH;
                    string TempTotalWorkingTimeMM;

                    TempTotalPunchingTimeHH = dt.Rows[0]["TotalPunchInHours"].ToString();
                    TempTotalWorkingTimeHH = dt.Rows[0]["TotalWorkingTime"].ToString();


                    string[] temptotaltime = TempTotalPunchingTimeHH.Split(':');
                    string[] tempworking = TempTotalWorkingTimeHH.Split(':');


                    TempTotalPunchingTimeHH = temptotaltime[0];
                    TempTotalPunchingTimeMM = temptotaltime[1];

                    TempTotalWorkingTimeHH = tempworking[0];
                    TempTotalWorkingTimeMM = tempworking[1];

                    int TempTotalPunchingHHNew = Convert.ToInt32(TempTotalPunchingTimeHH.ToString());
                    int TempTotalPunchingMMNew = Convert.ToInt32(TempTotalPunchingTimeMM.ToString());

                    int TempTotalWorkingHHNew = Convert.ToInt32(TempTotalWorkingTimeHH.ToString());
                    int TempTotalWorkingMMNew = Convert.ToInt32(TempTotalWorkingTimeMM.ToString());

                    string restotal = TempTotalPunchingHHNew.ToString() + "." + TempTotalPunchingMMNew.ToString();
                    string resworking = TempTotalWorkingHHNew.ToString() + "." + TempTotalWorkingMMNew.ToString();

                    float finalrestotal = Convert.ToSingle(restotal);
                    float finalresworking = Convert.ToSingle(resworking);

                    if (finalrestotal < 9.30 & finalresworking < 9)
                    {
                        EarlyLeaving++;
                    }
                    else
                    {
                        EarlyLeaving = EarlyLeaving + 0;
                    }

                }
                else
                {

                }

                tempFromDt = tempFromDt.AddDays(1);
            }

            return EarlyLeaving;

        }


    }
}
