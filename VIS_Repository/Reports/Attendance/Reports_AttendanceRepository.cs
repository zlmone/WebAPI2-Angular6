using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Reports.Attendance;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Globalization;
using VIS_Domain;

namespace VIS_Repository.Reports.Attendance
{
    public class Reports_AttendanceRepository : VISDbCommand /*, VISIBaseRepository<AttendanceReport>*/
    {
        public Int32 intAffectedRecords { get; set; }
        public Int32 PunchInId { get; set; }
        public Boolean halfLeave { get; set; }
        public Boolean checkHrs { get; set; }
        public string approveType { get; set; }
        public string leaveType { get; set; }
        public Boolean TwoHalfLeaveSameDay { get; set; }
        public string mode { get; set; }
        public string strusertype { get; set; }
        public string struserId { get; set; }
        public int Longleavedays { get; set; }
        public int YearData { get; set; }
        public int monthData { get; set; }
        public int day { get; set; }
        DataTable dt;
        public string checkedvalueRDB { get; set; }
        public string checkedvalueDRP { get; set; }
        DataTable dtdepartemp = new DataTable();
        DataTable dpemp = new DataTable();
        DataRow dr;
        public string strUserType { get; set; }

        int EmployeeId;
        string FromDate;
        string EndDate;
        string DrpemName;
        int DropdownvalDECL;
        string RdbDateval;
        string Rdbmonthval;
        int mon;
        int y;

        IFormatProvider provider = new System.Globalization.CultureInfo("es-ES", true);
        private static Reports_AttendanceRepository instance = new Reports_AttendanceRepository(string.Empty);

        public Reports_AttendanceRepository(string _connectionstring) : base(_connectionstring) { }

        public static Reports_AttendanceRepository getInstance()
        {
            return instance;
        }
        public DataTable GetLeaveDetailsByDate(int UserID, string strDate)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("leaveDuration", Type.GetType("System.String"));
            dt.Columns.Add("leaveType", Type.GetType("System.String"));
            dt.Columns.Add("approveType", Type.GetType("System.String"));
            dt.Columns.Add("shortLeaveType", Type.GetType("System.String"));

            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            //VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, UserID);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, strDate);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetLeaveDetailsByDate");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter sdaLeavedetailsbydate = new SqlDataAdapter();
            DataSet dsleavedetailsbydate = new DataSet();
            sdaLeavedetailsbydate.SelectCommand = objVISDbCommand.objSqlCommand;
            dt.Clear();
            sdaLeavedetailsbydate.Fill(dsleavedetailsbydate);
            objVISDbCommand.objSqlCommand.Connection.Close();

            if (dsleavedetailsbydate != null && dsleavedetailsbydate.Tables[0].Rows.Count > 0)
            {
                DataRow dr = dt.NewRow();
                int CalendarDays = Convert.ToInt32(dsleavedetailsbydate.Tables[0].Rows[0]["CalendarDays"].ToString());
                dr["shortLeaveType"] = dsleavedetailsbydate.Tables[0].Rows[0]["LeaveStatus"].ToString();

                if (CalendarDays == 0)
                {
                    if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsFullDay"]))
                    {
                        dr["leaveDuration"] = "Full";
                        dr["leaveType"] = "FL";
                    }
                    else if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsFirstHalf"]))
                    {
                        dr["leaveDuration"] = "FirstHalf";
                        dr["leaveType"] = "FH";
                    }
                    else if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsSecondHalf"]))
                    {
                        dr["leaveDuration"] = "SecondHalf";
                        dr["leaveType"] = "SH";
                    }
                }
                else
                {
                    DateTime dtFrom = Convert.ToDateTime(dsleavedetailsbydate.Tables[0].Rows[0]["FromDate"].ToString());
                    DateTime dtTo = Convert.ToDateTime(dsleavedetailsbydate.Tables[0].Rows[0]["ToDate"].ToString());
                    DateTime dtCurr = DateTime.ParseExact(strDate, "yyyyMMdd", System.Globalization.CultureInfo.InvariantCulture);
                    if (dtCurr == dtFrom)
                    {
                        if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsFullDay"]))
                        {
                            dr["leaveDuration"] = "Full";
                            dr["leaveType"] = "FL";
                        }
                        else if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsSecondHalf"]))
                        {
                            dr["leaveDuration"] = "SecondHalf";
                            dr["leaveType"] = "SH";
                        }
                    }
                    else if (dtCurr == dtTo)
                    {
                        if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsFullDay"]))
                        {
                            dr["leaveDuration"] = "Full";
                            dr["leaveType"] = "FL";
                        }
                        else if (Convert.ToBoolean(dsleavedetailsbydate.Tables[0].Rows[0]["IsFirstHalf"]))
                        {
                            dr["leaveDuration"] = "FirstHalf";
                            dr["leaveType"] = "FH";
                        }
                    }
                    else
                    {
                        dr["leaveDuration"] = "Full";
                        dr["leaveType"] = "FL";
                    }
                }
                dr["approveType"] = dr["shortLeaveType"].ToString() + "/" + dr["leaveType"].ToString();
                if (dr["shortLeaveType"].ToString() == "Present")
                {
                    return null;
                }
                else
                {
                    dt.Rows.Add(dr);
                    return dt;
                }
            }
            else
            {
                return null;
            }
        }

        private void generateTable()
        {
            dt = new DataTable();
            dt.Columns.Add("EmployeeCode", Type.GetType("System.String")); //new field
            dt.Columns.Add("Employee_Name", Type.GetType("System.String"));
            dt.Columns.Add("Date", Type.GetType("System.String"));
            dt.Columns.Add("MMDDYYYY_DateFormat", Type.GetType("System.String"));

            dt.Columns.Add("Employee_Id", Type.GetType("System.String"));
            dt.Columns.Add("In_Time", Type.GetType("System.String"));
            dt.Columns.Add("Out_Time", Type.GetType("System.String"));
            dt.Columns.Add("LunchOut_Time", Type.GetType("System.String"));
            dt.Columns.Add("LunchIn_Time", Type.GetType("System.String"));
            dt.Columns.Add("Other_Time", Type.GetType("System.String"));
            dt.Columns.Add("Total-Out", Type.GetType("System.String")); //  shifted
            dt.Columns.Add("Total_W_Hr", Type.GetType("System.String")); // altered old is - Total_Hr
            dt.Columns.Add("Total_Hrs", Type.GetType("System.String"));  // new added
            dt.Columns.Add("TotalWorksheet_Hr", Type.GetType("System.String"));
            dt.Columns.Add("diff", Type.GetType("System.String"));
            dt.Columns.Add("status", Type.GetType("System.String"));
            dt.Columns.Add("Days", Type.GetType("System.String"));
            dt.Columns.Add("ImportRemarks", Type.GetType("System.String"));
            dt.Columns.Add("HoverImportRemarks", Type.GetType("System.String"));
            //new field
            dt.Columns.Add("WNE", Type.GetType("System.String"));
            dt.Columns.Add("PC", Type.GetType("System.String"));
            dt.Columns.Add("AUPL", Type.GetType("System.String"));
            dt.Columns.Add("UUPL", Type.GetType("System.String"));
            dt.Columns.Add("cl-h", Type.GetType("System.String"));
            dt.Columns.Add("cl-f", Type.GetType("System.String"));
            dt.Columns.Add("sl-h", Type.GetType("System.String"));
            dt.Columns.Add("sl-f", Type.GetType("System.String"));

            dt.Columns.Add("InId", Type.GetType("System.String"));
            dt.Columns.Add("OutId", Type.GetType("System.String"));
            dt.Columns.Add("LunchOutId", Type.GetType("System.String"));
            dt.Columns.Add("LunchInId", Type.GetType("System.String"));
            dt.Columns.Add("OtherId", Type.GetType("System.String"));
            dt.Columns.Add("TotalId", Type.GetType("System.String"));

            //Add EXT Field
            dt.Columns.Add("ActualEntryTime", Type.GetType("System.String"));
            dt.Columns.Add("Grace", Type.GetType("System.String"));
        }

        public DataTable GetBindAttendanceData(int EmployeeID, string strDate, string ToDate, string name, int DRPData, string rdbDate, string Rdbmonth, int month, int year)
        {
            EmployeeId = EmployeeID;
            FromDate = strDate;
            EndDate = ToDate;
            DrpemName = name;
            DropdownvalDECL = DRPData;
            RdbDateval = rdbDate;
            Rdbmonthval = Rdbmonth;
            mon = month;
            y = year;

            try
            {
                generateTable();
                DateTime startDate = new DateTime(2010, 01, 01);
                DateTime endDate = new DateTime(2010, 01, 31);
                DataSet ds = new DataSet();

                if (Rdbmonth == "Month")
                {
                    monthData = month;
                    YearData = year;
                    day = 1;
                    startDate = new DateTime(YearData, monthData, day);

                    if (YearData == System.DateTime.Now.Year)
                    {
                        if (monthData == System.DateTime.Now.Month)
                        {
                            endDate = new DateTime(YearData, monthData, System.DateTime.Now.Day);
                            TimeSpan ts = endDate - startDate;
                            day = ts.Days;
                        }
                        else
                        {
                            day = DateTime.DaysInMonth(YearData, monthData);
                            endDate = new DateTime(YearData, monthData, day);
                        }
                    }
                    else
                    {
                        day = DateTime.DaysInMonth(YearData, monthData);
                        endDate = new DateTime(YearData, monthData, day);
                    }
                }

                if (rdbDate == "checkedDate")
                {
                    if (strDate != "")
                    {
                        startDate = DateTime.Parse(strDate.ToString(), provider, System.Globalization.DateTimeStyles.NoCurrentDateDefault);
                    }
                    else
                    {
                        startDate = DateTime.Parse(System.DateTime.Now.ToString("dd/MM/yyyy"), provider, System.Globalization.DateTimeStyles.NoCurrentDateDefault);
                    }
                    if (strDate != "")
                    {
                        endDate = DateTime.Parse(ToDate.ToString(), provider, System.Globalization.DateTimeStyles.NoCurrentDateDefault);
                    }
                    else
                    {
                        endDate = startDate;
                    }
                }
                if (name == "LineManager")
                {
                    if (DRPData > 0)
                    {
                        VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetLMemp");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                        objVISDbCommand.objSqlCommand.Connection.Open();
                        SqlDataAdapter da = new SqlDataAdapter();
                        da.SelectCommand = objVISDbCommand.objSqlCommand;
                        ds.Clear();
                        da.Fill(ds);
                        objVISDbCommand.objSqlCommand.Connection.Close();
                    }
                }
                TimeSpan tsDays = endDate - startDate;
                int totalDays = tsDays.Days + 1;
                DateTime TempStartDate = startDate;
                DataTable dtLeaveTemp;
                DataTable dtNWD = new DataTable();
                DataSet dsLeave = new DataSet();
                DataSet dsTripLeave = new DataSet();
                if (name == "LineManager" && DRPData > 0)
                {
                    for (int k = 0; k < ds.Tables[0].Rows.Count; k++)
                    {
                        startDate = TempStartDate;
                        for (int i = 0; i < totalDays; i++)
                        {
                            //string stDate = startDate.ToString("dd/MM/yyyy");
                            //string[] arrDate = strDate.Split('/');

                            VISDbCommand objVISbCommand_1 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                            objVISbCommand_1.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISbCommand_1.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                            objVISbCommand_1.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, EmployeeID);
                            objVISbCommand_1.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                            objVISbCommand_1.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "NWDHISTORY");
                            objVISbCommand_1.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                            objVISbCommand_1.objSqlCommand.Connection.Open();
                            SqlDataAdapter sdanwd = new SqlDataAdapter();
                            sdanwd.SelectCommand = objVISbCommand_1.objSqlCommand;
                            dtNWD.Clear();
                            sdanwd.Fill(dtNWD);
                            objVISbCommand_1.objSqlCommand.Connection.Close();

                            if (dtNWD.Rows.Count > 0)
                            {
                                VISDbCommand objVISDbCommand_2 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_2.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_2.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_2.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, ds.Tables[0].Rows[k]["Id"].ToString());
                                objVISDbCommand_2.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                                objVISDbCommand_2.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LongLeave, Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]));
                                objVISDbCommand_2.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LongLeave");
                                objVISDbCommand_2.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_2.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdleave = new SqlDataAdapter();
                                sdleave.SelectCommand = objVISDbCommand_2.objSqlCommand;
                                dsLeave.Clear();
                                sdleave.Fill(dsLeave);
                                objVISDbCommand_2.objSqlCommand.Connection.Close();

                                if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                {
                                    double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                    string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                    string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                    if (leaveBalance == -0.5 && leaveDuration == "Full")
                                    {
                                        dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                        dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                        dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                        dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                        DataRow dr = dsLeave.Tables[0].NewRow();
                                        dr["Balance"] = 0;
                                        dr["leaveDuration"] = "SecondHalf";
                                        dr["leaveType"] = "SL";
                                        dr["approveType"] = "AUPL/SH";
                                        dr["AppliedLeaveType"] = AppliedLeaveType;
                                        dsLeave.Tables[0].Rows.Add(dr);
                                    }

                                    if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                    {
                                        dtLeaveTemp = new DataTable();
                                        dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(ds.Tables[0].Rows[k]["id"].ToString()), startDate.ToString("dd/MM/yyyy"));

                                        if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                        {
                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                            dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                            dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();

                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }
                                    }
                                }
                                if (dsLeave.Tables[0].Rows.Count > 0)
                                {
                                    if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                    {
                                        if (name == "LineManager")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["Id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                    }
                                    else
                                    {
                                        if (dsLeave.Tables[0].Rows.Count > 1)
                                        {
                                            string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                        }
                                        else
                                        {
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    VISDbCommand objVISDbCommand_3 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_3.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_3.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_3.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, ds.Tables[0].Rows[k]["Id"].ToString());
                                    objVISDbCommand_3.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                                    objVISDbCommand_3.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "TripLeaveDetails");
                                    objVISDbCommand_3.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_3.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdaTripLeave = new SqlDataAdapter();
                                    sdaTripLeave.SelectCommand = objVISDbCommand_3.objSqlCommand;
                                    dsTripLeave.Clear();
                                    sdaTripLeave.Fill(dsTripLeave);
                                    objVISDbCommand_3.objSqlCommand.Connection.Close();

                                    if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                                    {
                                        if (name == "LineManager")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", "On Trip/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "On Trip/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                    }
                                    else
                                    {
                                        if (name == "LineManager")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", "NWD/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "NWD/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                VISDbCommand objVISDbCommand_4 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_4.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_4.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_4.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, ds.Tables[0].Rows[0]["Id"].ToString());
                                objVISDbCommand_4.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LeaveChecking");
                                objVISDbCommand_4.objSqlCommand.Parameters.AddWithValue("LeaveDate", startDate.ToString("yyyyMMdd"));
                                objVISDbCommand_4.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_4.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdaleavecheck = new SqlDataAdapter();
                                sdaleavecheck.SelectCommand = objVISDbCommand_4.objSqlCommand;
                                dsLeave.Clear();
                                sdaleavecheck.Fill(dsLeave);
                                objVISDbCommand_4.objSqlCommand.Connection.Close();

                                if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                {
                                    double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                    string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                    string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                    if (leaveBalance == -0.5 && leaveDuration == "Full")
                                    {
                                        dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                        dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                        dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                        dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                        DataRow dr = dsLeave.Tables[0].NewRow();
                                        dr["Balance"] = 0;
                                        dr["leaveDuration"] = "SecondHalf";
                                        dr["leaveType"] = "SL";
                                        dr["approveType"] = "AUPL/SH";
                                        dr["AppliedLeaveType"] = AppliedLeaveType;
                                        dsLeave.Tables[0].Rows.Add(dr);
                                    }
                                }
                                if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                {
                                    dtLeaveTemp = new DataTable();
                                    dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(ds.Tables[0].Rows[k]["id"].ToString()), startDate.ToString("yyyyMMdd"));

                                    if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                    {
                                        DataRow dr = dsLeave.Tables[0].NewRow();
                                        dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                        dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                        dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                        dsLeave.Tables[0].Rows.Add(dr);
                                    }
                                }
                                if (dsLeave.Tables[0].Rows.Count > 0)
                                {
                                    if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                    {
                                        if (name == "LineManager")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                    }
                                    else
                                    {
                                        if (dsLeave.Tables[0].Rows.Count > 1)
                                        {
                                            string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                        }
                                        else
                                        {
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    VISDbCommand objVISDbCommand_5 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_5.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_5.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_5.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                    objVISDbCommand_5.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Holidayfromdatetodate");
                                    objVISDbCommand_5.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                    objVISDbCommand_5.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_5.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdaholiday = new SqlDataAdapter();
                                    sdaholiday.SelectCommand = objVISDbCommand_5.objSqlCommand;
                                    DataSet dsHoliday = new DataSet();
                                    dsHoliday.Clear();
                                    sdaholiday.Fill(dsHoliday);
                                    objVISDbCommand_5.objSqlCommand.Connection.Close();

                                    if (dsHoliday.Tables[0].Rows.Count > 0)
                                    {
                                        if (name == "LineManager")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                        }
                                    }
                                    else
                                    {
                                        VISDbCommand objVISDbCommand_6 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                        objVISDbCommand_6.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand_6.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                        objVISDbCommand_6.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                        objVISDbCommand_6.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "HolidayFromDate");
                                        objVISDbCommand_6.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                        objVISDbCommand_6.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                        objVISDbCommand_6.objSqlCommand.Connection.Open();
                                        SqlDataAdapter sdaholidayfdate = new SqlDataAdapter();
                                        sdaholidayfdate.SelectCommand = objVISDbCommand_6.objSqlCommand;
                                        dsHoliday.Clear();
                                        sdaholiday.Fill(dsHoliday);
                                        objVISDbCommand_6.objSqlCommand.Connection.Close();

                                        if (dsHoliday.Tables[0].Rows.Count > 0)
                                        {
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                            }
                                        }
                                        else
                                        {
                                            if (name == "LineManager")
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), ds.Tables[0].Rows[k]["id"].ToString(), false, "", "", true, false);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "", true, false);
                                            }
                                        }
                                    }
                                }
                            }
                            startDate = startDate.AddDays(1);
                        }
                    }
                }
                else if (DRPData == 0)
                {
                    if (EmployeeID == 0)
                    {
                        if (name == "DepartMent")
                        {
                            dpemp = GetDepartmentEmployee(EmployeeID);
                        }
                        else if (name == "Employee" | name == "Company") // employee dropdown record.
                        {
                            dpemp = GetEmployee();
                        }
                    }
                    if (rdbDate == "checkedDate")
                    {
                        for (int i = 0; i < totalDays; i++)
                        {
                            for (int j = 0; j < dpemp.Rows.Count; j++)
                            {
                                string stDate = startDate.ToString("dd/MM/yyyy");
                                //string[] arrDate = strDate.Split('/');

                                VISDbCommand objVISDbCommand_7 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_7.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_7.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_7.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, dpemp.Rows[j]["Id"].ToString());
                                objVISDbCommand_7.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                objVISDbCommand_7.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "NWDHISTORY");
                                objVISDbCommand_7.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_7.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdanwd = new SqlDataAdapter();
                                sdanwd.SelectCommand = objVISDbCommand_7.objSqlCommand;
                                dtNWD.Clear();
                                sdanwd.Fill(dtNWD);
                                objVISDbCommand_7.objSqlCommand.Connection.Close();

                                if (dtNWD.Rows.Count > 0)
                                {
                                    VISDbCommand objVISDbCommand_8 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_8.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_8.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_8.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, dpemp.Rows[j]["Id"].ToString());
                                    objVISDbCommand_8.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                                    objVISDbCommand_8.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LongLeave, Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]));
                                    objVISDbCommand_8.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LongLeave");
                                    objVISDbCommand_8.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_8.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdleave = new SqlDataAdapter();
                                    sdleave.SelectCommand = objVISDbCommand_8.objSqlCommand;
                                    dsLeave.Clear();
                                    sdleave.Fill(dsLeave);
                                    objVISDbCommand_8.objSqlCommand.Connection.Close();

                                    if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                        string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                        string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                        if (leaveBalance == -0.5 && leaveDuration == "Full")
                                        {
                                            dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                            dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                            dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                            dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["Balance"] = 0;
                                            dr["leaveDuration"] = "SecondHalf";
                                            dr["leaveType"] = "SL";
                                            dr["approveType"] = "AUPL/SH";
                                            dr["AppliedLeaveType"] = AppliedLeaveType;
                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }
                                        if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                        {
                                            dtLeaveTemp = new DataTable();
                                            dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(dpemp.Rows[j]["Id"]), startDate.ToString("yyyyMMdd"));
                                            if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                            {
                                                DataRow dr = dsLeave.Tables[0].NewRow();
                                                dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                                dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                                dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                                dsLeave.Tables[0].Rows.Add(dr);
                                            }
                                        }
                                    }
                                    if (dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            if (dsLeave.Tables[0].Rows.Count > 1)
                                            {
                                                string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();

                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                            else
                                            {

                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        VISDbCommand objVISDbCommand_9 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                        objVISDbCommand_9.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand_9.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                        objVISDbCommand_9.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, dpemp.Rows[j]["Id"]);
                                        objVISDbCommand_9.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                                        objVISDbCommand_9.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "TripLeaveDetails");
                                        objVISDbCommand_9.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                        objVISDbCommand_9.objSqlCommand.Connection.Open();
                                        SqlDataAdapter sdaTripLeave = new SqlDataAdapter();
                                        sdaTripLeave.SelectCommand = objVISDbCommand_9.objSqlCommand;
                                        dsTripLeave.Clear();
                                        sdaTripLeave.Fill(dsTripLeave);
                                        objVISDbCommand_9.objSqlCommand.Connection.Close();

                                        if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "On Trip/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "NWD/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                    }
                                }
                                else
                                {
                                    VISDbCommand objVISDbCommand_10 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_10.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_10.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_10.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, dpemp.Rows[j]["Id"]);
                                    objVISDbCommand_10.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LeaveChecking");
                                    objVISDbCommand_10.objSqlCommand.Parameters.AddWithValue("LeaveDate", startDate.ToString("yyyyMMdd"));
                                    objVISDbCommand_10.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_10.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdaleavecheck = new SqlDataAdapter();
                                    sdaleavecheck.SelectCommand = objVISDbCommand_10.objSqlCommand;
                                    dsLeave.Clear();
                                    sdaleavecheck.Fill(dsLeave);
                                    objVISDbCommand_10.objSqlCommand.Connection.Close();

                                    if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                        string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                        string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                        if (leaveBalance == -0.5 && leaveDuration == "Full")
                                        {
                                            dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                            dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                            dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                            dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["Balance"] = 0;
                                            dr["leaveDuration"] = "SecondHalf";
                                            dr["leaveType"] = "SL";
                                            dr["approveType"] = "AUPL/SH";
                                            dr["AppliedLeaveType"] = AppliedLeaveType;
                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }
                                    }
                                    if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                    {
                                        dtLeaveTemp = new DataTable();
                                        string strdate = startDate.ToString("yyyyMMdd");
                                        dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(dpemp.Rows[j]["Id"]), strdate);

                                        if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                        {
                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                            dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                            dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }
                                    }

                                    if (dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            if (dsLeave.Tables[0].Rows.Count > 1)
                                            {
                                                string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        //Holidayfromdatetodate.
                                        VISDbCommand objVISDbCommand_11 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                        objVISDbCommand_11.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand_11.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                        objVISDbCommand_11.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                        objVISDbCommand_11.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Holidayfromdatetodate");
                                        objVISDbCommand_11.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                        objVISDbCommand_11.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                        objVISDbCommand_11.objSqlCommand.Connection.Open();
                                        SqlDataAdapter sdaholiday = new SqlDataAdapter();
                                        sdaholiday.SelectCommand = objVISDbCommand_11.objSqlCommand;
                                        DataSet dsHoliday = new DataSet();
                                        dsHoliday.Clear();
                                        sdaholiday.Fill(dsHoliday);
                                        objVISDbCommand_11.objSqlCommand.Connection.Close();

                                        if (dsHoliday.Tables[0].Rows.Count > 0)
                                        {
                                            fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            //HolidayFromDate
                                            VISDbCommand objVISDbCommand_12 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                            objVISDbCommand_12.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                            objVISDbCommand_12.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                            objVISDbCommand_12.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                            objVISDbCommand_12.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "HolidayFromDate");
                                            objVISDbCommand_12.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                            objVISDbCommand_12.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                            objVISDbCommand_12.objSqlCommand.Connection.Open();
                                            SqlDataAdapter sdaholidayfdate = new SqlDataAdapter();
                                            sdaholidayfdate.SelectCommand = objVISDbCommand_12.objSqlCommand;
                                            dsHoliday.Clear();
                                            sdaholiday.Fill(dsHoliday);
                                            objVISDbCommand_12.objSqlCommand.Connection.Close();

                                            if (dsHoliday.Tables[0].Rows.Count > 0)
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                            }
                                            else
                                            {
                                                fillRecord(startDate.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "", true, false);
                                            }
                                        }
                                    }
                                }
                            }
                            startDate = startDate.AddDays(1);
                        }
                    }
                    else
                    {
                        DateTime dtTemp;
                        for (int j = 0; j < dpemp.Rows.Count; j++) // checked back
                        {
                            dtTemp = startDate;
                            for (int i = 0; i < totalDays; i++)
                            {
                                VISDbCommand objVISDbCommand_13 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_13.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_13.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_13.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                                objVISDbCommand_13.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, dtTemp.ToString("yyyyMMdd"));
                                objVISDbCommand_13.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "NWDHISTORY");
                                objVISDbCommand_13.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_13.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdanwd = new SqlDataAdapter();
                                sdanwd.SelectCommand = objVISDbCommand_13.objSqlCommand;
                                dtNWD.Clear();
                                sdanwd.Fill(dtNWD);
                                objVISDbCommand_13.objSqlCommand.Connection.Close();

                                if (dtNWD.Rows.Count > 0)
                                {
                                    VISDbCommand objVISDbCommand_14 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_14.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_14.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_14.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                                    objVISDbCommand_14.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, dtTemp.ToString("yyyyMMdd"));
                                    objVISDbCommand_14.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LongLeave, Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]));
                                    objVISDbCommand_14.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LongLeave");
                                    objVISDbCommand_14.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_14.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdleave = new SqlDataAdapter();
                                    sdleave.SelectCommand = objVISDbCommand_14.objSqlCommand;
                                    dsLeave.Clear();
                                    sdleave.Fill(dsLeave);
                                    objVISDbCommand_14.objSqlCommand.Connection.Close();

                                    if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                        string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                        string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                        if (leaveBalance == -0.5 && leaveDuration == "Full")
                                        {
                                            dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                            dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                            dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                            dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["Balance"] = 0;
                                            dr["leaveDuration"] = "SecondHalf";
                                            dr["leaveType"] = "SL";
                                            dr["approveType"] = "AUPL/SH";
                                            dr["AppliedLeaveType"] = AppliedLeaveType;
                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }
                                        if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                        {
                                            dtLeaveTemp = new DataTable();
                                            dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(dpemp.Rows[j]["Id"]), dtTemp.ToString("yyyyMMdd"));
                                            if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                            {
                                                DataRow dr = dsLeave.Tables[0].NewRow();
                                                dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                                dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                                dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                                dsLeave.Tables[0].Rows.Add(dr);
                                            }
                                        }
                                    }
                                    if (dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                        {
                                            fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            if (dsLeave.Tables[0].Rows.Count > 1)
                                            {
                                                string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                                fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                            }
                                            else
                                            {
                                                fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                            }
                                        }
                                    }
                                    else
                                    {
                                        VISDbCommand objVISDbCommand_15 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                        objVISDbCommand_15.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand_15.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                        objVISDbCommand_15.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                                        objVISDbCommand_15.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, dtTemp.ToString("yyyyMMdd"));
                                        objVISDbCommand_15.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "TripLeaveDetails");
                                        objVISDbCommand_15.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                        objVISDbCommand_15.objSqlCommand.Connection.Open();
                                        SqlDataAdapter sdaTripLeave = new SqlDataAdapter();
                                        sdaTripLeave.SelectCommand = objVISDbCommand_15.objSqlCommand;
                                        dsTripLeave.Clear();
                                        sdaTripLeave.Fill(dsTripLeave);
                                        objVISDbCommand_15.objSqlCommand.Connection.Close();

                                        if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                                        {
                                            fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "On Trip/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                        else
                                        {
                                            fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "NWD/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                        }
                                    }
                                }
                                else
                                {
                                    VISDbCommand objVISDbCommand_16 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_16.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_16.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_16.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);//checked back
                                    objVISDbCommand_16.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LeaveChecking");
                                    objVISDbCommand_16.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, dtTemp.ToString("yyyyMMdd"));
                                    objVISDbCommand_16.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_16.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdaleavecheck = new SqlDataAdapter();
                                    sdaleavecheck.SelectCommand = objVISDbCommand_16.objSqlCommand;
                                    dsLeave.Clear();
                                    sdaleavecheck.Fill(dsLeave);
                                    objVISDbCommand_16.objSqlCommand.Connection.Close();

                                    if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                                    {
                                        double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                        string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                        string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                        if (leaveBalance == -0.5 && leaveDuration == "Full")
                                        {
                                            dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                            dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                            dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                            dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                            DataRow dr = dsLeave.Tables[0].NewRow();
                                            dr["Balance"] = 0;
                                            dr["leaveDuration"] = "SecondHalf";
                                            dr["leaveType"] = "SL";
                                            dr["approveType"] = "AUPL/SH";
                                            dr["AppliedLeaveType"] = AppliedLeaveType;
                                            dsLeave.Tables[0].Rows.Add(dr);
                                        }

                                    }
                                    else
                                    {
                                        if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                        {
                                            dtLeaveTemp = new DataTable();
                                            dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(dpemp.Rows[j]["Id"]), dtTemp.ToString("yyyyMMdd"));
                                            if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                            {
                                                DataRow dr = dsLeave.Tables[0].NewRow();
                                                dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                                dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                                dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                                dsLeave.Tables[0].Rows.Add(dr);
                                            }
                                        }
                                        if (dsLeave.Tables[0].Rows.Count > 0)
                                        {
                                            if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                            {
                                                fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                            }
                                            else
                                            {
                                                if (dsLeave.Tables[0].Rows.Count > 1)
                                                {
                                                    string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                                    fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                                }
                                                else
                                                {
                                                    fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            VISDbCommand objVISDbCommand_17 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                            objVISDbCommand_17.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                            objVISDbCommand_17.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                            objVISDbCommand_17.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                            objVISDbCommand_17.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Holidayfromdatetodate");
                                            objVISDbCommand_17.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, dtTemp.ToString("yyyyMMdd"));
                                            objVISDbCommand_17.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                            objVISDbCommand_17.objSqlCommand.Connection.Open();
                                            SqlDataAdapter sdaholiday = new SqlDataAdapter();
                                            sdaholiday.SelectCommand = objVISDbCommand_17.objSqlCommand;
                                            DataSet dsHoliday = new DataSet();
                                            dsHoliday.Clear();
                                            sdaholiday.Fill(dsHoliday);
                                            objVISDbCommand_17.objSqlCommand.Connection.Close();

                                            if (dsHoliday.Tables[0].Rows.Count > 0)
                                            {
                                                fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                            }
                                            else
                                            {
                                                VISDbCommand objVISDbCommand_18 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                                objVISDbCommand_18.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                                objVISDbCommand_18.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                                objVISDbCommand_18.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                                objVISDbCommand_18.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "HolidayFromDate");
                                                objVISDbCommand_18.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, dtTemp.ToString("yyyyMMdd"));
                                                objVISDbCommand_18.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                                objVISDbCommand_18.objSqlCommand.Connection.Open();
                                                SqlDataAdapter sdaholidayfdate = new SqlDataAdapter();
                                                sdaholidayfdate.SelectCommand = objVISDbCommand_18.objSqlCommand;
                                                dsHoliday.Clear();
                                                sdaholiday.Fill(dsHoliday);
                                                objVISDbCommand_18.objSqlCommand.Connection.Close();

                                                if (dsHoliday.Tables[0].Rows.Count > 0)
                                                {
                                                    fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                                }
                                                else
                                                {
                                                    fillRecord(dtTemp.ToString("dd/MM/yyyy"), dpemp.Rows[j]["Id"].ToString(), false, "", "", true, false);
                                                }
                                            }
                                        }
                                    }
                                }
                                dtTemp = dtTemp.AddDays(1);
                            }
                            dtTemp = startDate;
                        }
                    }
                }
                else
                {
                    for (int i = 0; i < totalDays; i++)
                    {
                        string stDate = startDate.ToString("dd/MM/yyyy");
                        //string[] arrDate = strDate.Split('/');

                        VISDbCommand objVISDbCommand_19 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        objVISDbCommand_19.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand_19.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                        objVISDbCommand_19.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                        objVISDbCommand_19.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                        objVISDbCommand_19.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "NWDHISTORY");
                        objVISDbCommand_19.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                        objVISDbCommand_19.objSqlCommand.Connection.Open();
                        SqlDataAdapter sdanwd = new SqlDataAdapter();
                        sdanwd.SelectCommand = objVISDbCommand_19.objSqlCommand;
                        dtNWD.Clear();
                        sdanwd.Fill(dtNWD);
                        objVISDbCommand_19.objSqlCommand.Connection.Close();

                        if (dtNWD.Rows.Count > 0)
                        {
                            VISDbCommand objVISDbCommand_20 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                            objVISDbCommand_20.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand_20.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                            objVISDbCommand_20.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                            objVISDbCommand_20.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                            objVISDbCommand_20.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LongLeave, Convert.ToInt32(ConfigurationManager.AppSettings["LongLeave"]));
                            objVISDbCommand_20.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LongLeave");
                            objVISDbCommand_20.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                            objVISDbCommand_20.objSqlCommand.Connection.Open();
                            SqlDataAdapter sdleave = new SqlDataAdapter();
                            sdleave.SelectCommand = objVISDbCommand_20.objSqlCommand;
                            dsLeave.Clear();
                            sdleave.Fill(dsLeave);
                            objVISDbCommand_20.objSqlCommand.Connection.Close();

                            if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                            {
                                double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                if (leaveBalance == -0.5 && leaveDuration == "Full")
                                {
                                    dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                    dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                    dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                    dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                    DataRow dr = dsLeave.Tables[0].NewRow();
                                    dr["Balance"] = 0;
                                    dr["leaveDuration"] = "SecondHalf";
                                    dr["leaveType"] = "SL";
                                    dr["approveType"] = "AUPL/SH";
                                    dr["AppliedLeaveType"] = AppliedLeaveType;
                                    dsLeave.Tables[0].Rows.Add(dr);

                                }
                                if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                                {
                                    dtLeaveTemp = new DataTable();
                                    dtLeaveTemp = GetLeaveDetailsByDate(Convert.ToInt32(DRPData), startDate.ToString("yyyyMMdd"));

                                    if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                    {
                                        DataRow dr = dsLeave.Tables[0].NewRow();
                                        dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                        dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                        dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                        dsLeave.Tables[0].Rows.Add(dr);
                                    }
                                }
                            }
                            if (dsLeave.Tables[0].Rows.Count > 0)
                            {
                                if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                {
                                    fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                }
                                else
                                {
                                    if (dsLeave.Tables[0].Rows.Count > 1)
                                    {
                                        string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                    }
                                    else
                                    {
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                    }
                                }
                            }
                            else
                            {
                                VISDbCommand objVISDbCommand_21 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_21.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_21.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_21.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                                objVISDbCommand_21.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LeaveDate, startDate.ToString("yyyyMMdd"));
                                objVISDbCommand_21.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "TripLeaveDetails");
                                objVISDbCommand_21.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_21.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdaTripLeave = new SqlDataAdapter();
                                sdaTripLeave.SelectCommand = objVISDbCommand_21.objSqlCommand;
                                dsTripLeave.Clear();
                                sdaTripLeave.Fill(dsTripLeave);
                                objVISDbCommand_21.objSqlCommand.Connection.Close();

                                if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                                {
                                    fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "On Trip/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                }
                                else
                                {
                                    fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "NWD/" + dtNWD.Rows[0]["leaveType"].ToString(), false, false);
                                }
                            }
                        }
                        else
                        {
                            VISDbCommand objVISDbCommand_22 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                            objVISDbCommand_22.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand_22.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                            objVISDbCommand_22.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "LeaveChecking");
                            objVISDbCommand_22.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, DRPData);
                            objVISDbCommand_22.objSqlCommand.Parameters.AddWithValue("LeaveDate", startDate.ToString("yyyyMMdd"));
                            objVISDbCommand_22.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                            objVISDbCommand_22.objSqlCommand.Connection.Open();
                            SqlDataAdapter sdaleavecheck = new SqlDataAdapter();
                            sdaleavecheck.SelectCommand = objVISDbCommand_22.objSqlCommand;
                            dsLeave.Clear();
                            sdaleavecheck.Fill(dsLeave);
                            objVISDbCommand_22.objSqlCommand.Connection.Close();

                            if (dsLeave != null && dsLeave.Tables[0].Rows.Count > 0)
                            {
                                double leaveBalance = Convert.ToDouble(dsLeave.Tables[0].Rows[0]["Balance"].ToString());
                                string leaveDuration = dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString();
                                string AppliedLeaveType = dsLeave.Tables[0].Rows[0]["AppliedLeaveType"].ToString();

                                if (leaveBalance == -0.5 && leaveDuration == "Full")
                                {
                                    dsLeave.Tables[0].Rows[0]["Balance"] = 0;
                                    dsLeave.Tables[0].Rows[0]["leaveDuration"] = "FirstHalf";
                                    dsLeave.Tables[0].Rows[0]["leaveType"] = "FH";
                                    dsLeave.Tables[0].Rows[0]["approveType"] = AppliedLeaveType + "/FH";

                                    DataRow dr = dsLeave.Tables[0].NewRow();
                                    dr["Balance"] = 0;
                                    dr["leaveDuration"] = "SecondHalf";
                                    dr["leaveType"] = "SL";
                                    dr["approveType"] = "AUPL/SH";
                                    dr["AppliedLeaveType"] = AppliedLeaveType;
                                    dsLeave.Tables[0].Rows.Add(dr);
                                }
                            }
                            if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                            {
                                dtLeaveTemp = new DataTable();
                                string strdate = startDate.ToString("yyyyMMdd");
                                dtLeaveTemp = GetLeaveDetailsByDate(DRPData, strdate);
                                if (dtLeaveTemp != null && dtLeaveTemp.Rows.Count > 0)
                                {
                                    DataRow dr = dsLeave.Tables[0].NewRow();
                                    dr["leaveDuration"] = dtLeaveTemp.Rows[0]["leaveDuration"].ToString();
                                    dr["leaveType"] = dtLeaveTemp.Rows[0]["leaveType"].ToString();
                                    dr["approveType"] = dtLeaveTemp.Rows[0]["approveType"].ToString();
                                    dsLeave.Tables[0].Rows.Add(dr);
                                }
                            }
                            if (dsLeave.Tables[0].Rows.Count > 0)
                            {
                                if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                                {
                                    fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false);
                                }
                                else
                                {
                                    if (dsLeave.Tables[0].Rows.Count > 1)
                                    {
                                        string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true);
                                    }
                                    else
                                    {
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false);
                                    }
                                }
                            }
                            else
                            {
                                VISDbCommand objVISDbCommand_23 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                objVISDbCommand_23.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand_23.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                objVISDbCommand_23.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                objVISDbCommand_23.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Holidayfromdatetodate");
                                objVISDbCommand_23.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                objVISDbCommand_23.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                objVISDbCommand_23.objSqlCommand.Connection.Open();
                                SqlDataAdapter sdaholiday = new SqlDataAdapter();
                                sdaholiday.SelectCommand = objVISDbCommand_23.objSqlCommand;
                                DataSet dsHoliday = new DataSet();
                                dsHoliday.Clear();
                                sdaholiday.Fill(dsHoliday);
                                objVISDbCommand_23.objSqlCommand.Connection.Close();

                                if (dsHoliday.Tables[0].Rows.Count > 0)
                                {
                                    fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                }
                                else
                                {
                                    VISDbCommand objVISDbCommand_24 = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                                    objVISDbCommand_24.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand_24.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                                    objVISDbCommand_24.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                                    objVISDbCommand_24.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "HolidayFromDate");
                                    objVISDbCommand_24.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, startDate.ToString("yyyyMMdd"));
                                    objVISDbCommand_24.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                                    objVISDbCommand_24.objSqlCommand.Connection.Open();
                                    SqlDataAdapter sdaholidayfdate = new SqlDataAdapter();
                                    sdaholidayfdate.SelectCommand = objVISDbCommand_24.objSqlCommand;
                                    dsHoliday.Clear();
                                    sdaholiday.Fill(dsHoliday);
                                    objVISDbCommand_24.objSqlCommand.Connection.Close();

                                    if (dsHoliday.Tables[0].Rows.Count > 0)
                                    {
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", dsHoliday.Tables[0].Rows[0]["holidayName"].ToString(), false, false);
                                    }
                                    else
                                    {
                                        fillRecord(startDate.ToString("dd/MM/yyyy"), DRPData.ToString(), false, "", "", true, false);
                                    }
                                }
                            }
                        }
                        startDate = startDate.AddDays(1);
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            finally
            {
                SqlConnection.ClearAllPools();
            }
            //}
            return dt;
        }

        private void fillRecord(string date, string empID, Boolean halfLeave, string leaveType, string approveType, Boolean checkHrs, Boolean TwoHalfLeaveSameDay)
        {
            try
            {
                DataSet ds = new DataSet();
                DateTime dateval = Convert.ToDateTime(date, provider);
                VISDbCommand objvisCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objvisCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objvisCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                objvisCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objvisCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Holidayfromdatetodate");
                objvisCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, dateval.ToString("yyyyMMdd"));
                objvisCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objvisCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sdaholidayleave = new SqlDataAdapter();
                sdaholidayleave.SelectCommand = objvisCommand.objSqlCommand;
                DataSet dsHolidayleave = new DataSet();
                dsHolidayleave.Clear();
                sdaholidayleave.Fill(dsHolidayleave);

                if (dsHolidayleave.Tables[0].Rows.Count > 0 && dsHolidayleave != null)
                {
                    approveType = dsHolidayleave.Tables[0].Rows[0]["holidayName"].ToString();
                }
                DataSet dsNWD1 = new DataSet();
                DateTime nwddate = Convert.ToDateTime(date, provider);

                VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, empID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_startdate, nwddate.ToString());
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "NWDHISTORY");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");
                objVISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sdanwd = new SqlDataAdapter();
                sdanwd.SelectCommand = objVISDbCommand.objSqlCommand;
                dsNWD1.Clear();
                sdanwd.Fill(dsNWD1);

                DateTime getDateRecord = Convert.ToDateTime(date, provider);

                VISDbCommand objVIDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_BindFinalDetails;
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, empID);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, getDateRecord.ToString("yyyyMMdd"));
                objVIDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                DataSet dsTemp = new DataSet();
                sda.SelectCommand = objVIDbCommand.objSqlCommand;
                dsTemp.Clear();
                sda.Fill(dsTemp);

                if (dsTemp.Tables.Count > 0 && dsTemp.Tables[0].Rows.Count > 0)
                {
                    dr = dt.NewRow();
                    dr["Employee_Id"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString() : "";
                    dr["EmployeeCode"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeCode"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeCode"].ToString() : "";
                    dr["Employee_Name"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString() : "";
                    dr["Date"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["Date"].ToString()) ? dsTemp.Tables[0].Rows[0]["Date"].ToString() : "";
                    dr["MMDDYYYY_DateFormat"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["MMDDYYYY_DateFormat"].ToString()) ? dsTemp.Tables[0].Rows[0]["MMDDYYYY_DateFormat"].ToString() : "";
                    dr["Days"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["Days"].ToString()) ? dsTemp.Tables[0].Rows[0]["Days"].ToString() : "";
                    dr["ImportRemarks"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString()) ?
                        dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString().Length > 30 ? dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString().Substring(0, 27) + "..."
                        : dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString() : "";
                    dr["HoverImportRemarks"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString()) ? dsTemp.Tables[0].Rows[0]["ImportRemarks"].ToString() : "";

                    if (!String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()))
                    {
                        dr["InId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTimeID"].ToString() : "";
                        dr["In_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTIme"].ToString() : "";
                        if (dr["InId"].ToString() != "")
                        {
                            int intPunchInID = Convert.ToInt32(dr["InId"]);

                            VISDbCommand objVDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                            objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                            objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                            objVDbCommand.objSqlCommand.Parameters.AddWithValue("PunchInId", intPunchInID);
                            objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetActualEntryTimeAndGracebyPunchInId");
                            objVDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");
                            objVDbCommand.objSqlCommand.Connection.Open();
                            SqlDataAdapter sd = new SqlDataAdapter();
                            sd.SelectCommand = objVDbCommand.objSqlCommand;
                            ds.Clear();
                            sd.Fill(ds);

                            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                            {
                                string[] arr = ds.Tables[0].Rows[0]["actualEntryTime"].ToString().Split(':');
                                if (arr.Length > 1)
                                {
                                    TimeSpan punchInActual = new TimeSpan(Convert.ToInt32(arr[0]), Convert.ToInt32(arr[1]), 0);
                                    TimeSpan tsgrace;
                                    TimeSpan actualInWithGrace;
                                    DateTime dtPunchIN = Convert.ToDateTime(dr["In_Time"]);
                                    TimeSpan punchIn = new TimeSpan(dtPunchIN.Hour, dtPunchIN.Minute, dtPunchIN.Second);

                                    string strGrace = "";

                                    if (strUserType != "admin" && strUserType != "Hr" && strUserType != "Payroll")
                                    {
                                        tsgrace = new TimeSpan(0, 0, 0);
                                    }
                                    else
                                    {
                                        DateTime dtGetDate = Convert.ToDateTime(date);
                                        strGrace = ds.Tables[0].Rows[0]["grace"].ToString();
                                        tsgrace = new TimeSpan(0, Convert.ToInt32(strGrace), 0);
                                    }
                                    actualInWithGrace = punchInActual.Add(tsgrace);
                                    if (halfLeave)
                                    {

                                    }
                                    else
                                    {
                                        if (punchIn > actualInWithGrace)
                                        {
                                            dr["diff"] = dr["diff"].ToString() + "I";
                                        }
                                    }
                                }
                            }
                        }
                        Boolean IsInOffice = Convert.ToBoolean(dsTemp.Tables[0].Rows[0]["IsInOffice"]);
                        Boolean IsInBreak = Convert.ToBoolean(dsTemp.Tables[0].Rows[0]["IsInBreak"]);
                        Boolean IsInLunch = Convert.ToBoolean(dsTemp.Tables[0].Rows[0]["IsInLunch"]);

                        if (IsInOffice || IsInBreak || IsInLunch)
                        {
                            dr["Out_Time"] = "";
                            dr["OutId"] = "";
                        }
                        else
                        {
                            dr["Out_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OutTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["OutTIme"].ToString() : "";
                            dr["OutId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OutTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["OutTimeID"].ToString() : "";
                        }
                        dr["LunchOut_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["LunchOutTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["LunchOutTIme"].ToString() : "";
                        dr["LunchOutId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["LunchOutTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["LunchOutTimeID"].ToString() : "";
                        if (IsInLunch)
                        {
                            dr["LunchIn_Time"] = "";
                            dr["LunchInId"] = "";
                        }
                        else
                        {
                            dr["LunchIn_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["LunchInTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["LunchInTIme"].ToString() : "";
                            dr["LunchInId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["LunchInTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["LunchInTimeID"].ToString() : "";
                        }
                        dr["OtherId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OtherTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["OtherTimeID"].ToString() : "";
                        dr["Other_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString() : "";

                        string strWorksheetHours = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalWorksheetHours"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalWorksheetHours"].ToString() : "";
                        strWorksheetHours = strWorksheetHours.Replace('.', ':') + ":00";

                        string[] arrWorksheetHours = strWorksheetHours.Split(':');
                        TimeSpan tsWorksheetHours = new TimeSpan();
                        tsWorksheetHours = new TimeSpan(Convert.ToInt32(arrWorksheetHours[0]), Convert.ToInt32(arrWorksheetHours[1]), 0);

                        dr["TotalWorksheet_Hr"] = strWorksheetHours.ToString();
                        dr["ActualEntryTime"] = ds.Tables[0].Rows[0]["actualEntryTime"].ToString();
                        dr["Grace"] = ds.Tables[0].Rows[0]["grace"].ToString();
                        if (checkHrs)
                        {
                            if (halfLeave)
                            {
                                if (String.Compare(approveType, "UUPL", true) == 0)
                                {
                                    dr["status"] = approveType + "/" + leaveType;
                                }
                                else
                                {
                                    dr["status"] = approveType;
                                }
                            }
                            else
                            {
                                if (dsNWD1.Tables[0].Rows.Count > 0)
                                {
                                    dr["status"] = "NWD/Full";
                                }
                                else
                                {
                                    dr["status"] = "Present";
                                }
                            }
                        }
                        else
                        {
                            if (dsNWD1.Tables[0].Rows.Count > 0)
                            {
                                dr["status"] = "NWD/Full";
                            }
                            else
                            {
                                if (dr["InId"].ToString() != "")
                                {
                                    dr["status"] = "Present";
                                }
                                else
                                {
                                    dr["status"] = approveType;
                                }
                            }
                        }
                        dr["Other_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString() : ""; ;
                        dr["Total_W_Hr"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString() : "";
                        dr["Total_Hrs"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString() : "";
                        string strTotalOfficeTime = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString() : "";
                        TimeSpan tsTotalOfficeTime = new TimeSpan();

                        if (dr["Total_W_Hr"].ToString() != "")
                        {
                            string[] arrTotalOfficeTime = dr["Total_W_Hr"].ToString().Split(':');
                            tsTotalOfficeTime = new TimeSpan(Convert.ToInt32(arrTotalOfficeTime[0]), Convert.ToInt32(arrTotalOfficeTime[1]), Convert.ToInt32(arrTotalOfficeTime[2]));
                        }
                        else
                        {
                            tsTotalOfficeTime = new TimeSpan(0, 0, 0);
                        }
                        TimeSpan tsTotalWorkingTime = new TimeSpan();
                        if (strTotalOfficeTime != "")
                        {
                            string[] arrTotalWorksheet_Hr = strTotalOfficeTime.Split(':');
                            tsTotalWorkingTime = new TimeSpan(Convert.ToInt32(arrTotalWorksheet_Hr[0]), Convert.ToInt32(arrTotalWorksheet_Hr[1]), Convert.ToInt32(arrTotalWorksheet_Hr[2]));
                        }
                        else
                        {
                            tsTotalWorkingTime = new TimeSpan(0, 0, 0);
                        }
                        if (halfLeave)
                        {
                            TimeSpan temp = new TimeSpan(4, 30, 0); ////TimeSpan temp = new TimeSpan(4, 15, 0);   // for working Hrs...
                            if (tsTotalOfficeTime < temp)
                            {
                                if (checkHrs)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "T";
                                }
                            }
                            temp = new TimeSpan(5, 0, 0);    // for Total Hrs...
                            if (tsTotalWorkingTime < temp)
                            {
                                if (checkHrs)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "O";
                                }
                            }
                        }
                        else
                        {
                            //TimeSpan temp = new TimeSpan(8, 30, 0);   // for working Hrs...
                            TimeSpan temp = new TimeSpan(9, 00, 0);   // for working Hrs...

                            if (checkHrs && IsInOffice == false && IsInBreak == false && IsInLunch == false)
                            {
                                if (tsTotalOfficeTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "T";
                                }
                                //temp = new TimeSpan(9, 00, 0);    // for Total Hrs...
                                temp = new TimeSpan(9, 30, 0);    // for Total Hrs...
                                if (tsTotalWorkingTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "O";
                                }
                            }
                            if (!IsInOffice && !IsInLunch && !IsInBreak)
                            {
                                temp = new TimeSpan(7, 0, 0);
                                if (tsTotalOfficeTime < temp)
                                {
                                    if (dsNWD1.Tables[0].Rows.Count > 0)
                                    {
                                        dr["status"] = "NWD/Full";
                                    }
                                    else
                                    {
                                        temp = new TimeSpan(2, 0, 0);
                                        if (approveType == "AUPL/FL" || approveType == "AUPL/FH" || approveType == "AUPL/SH" || approveType == "CL/SH" || approveType == "CL/FL" || approveType == "CL/FH" || approveType == "CL/FH, AUPL/SH" || approveType == "SL/SH" || approveType == "SL/FH" || approveType == "SL/FL" || approveType == "SL/FH, AUPL/SH")
                                        {
                                            dr["status"] = approveType;
                                        }
                                        else
                                        {
                                            if (tsTotalOfficeTime < temp)
                                            {
                                                dr["status"] = "UUPL";
                                            }
                                            else
                                            {
                                                dr["status"] = "0.5/UUPL";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        dr["TotalId"] = "0";

                        if (dr["OutId"].ToString() == "")
                        {
                            dr["Total_W_Hr"] = "";
                            dr["Total_Hrs"] = "";
                        }
                        if (String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OtherTimeID"].ToString()))
                        {
                            dr["Other_Time"] = "";
                        }
                    }
                    else
                    {
                        //VISDbCommand objVDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        //objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        //objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                        //objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, empID);
                        ////objVDbCommand.objSqlCommand.Parameters.AddWithValue("PunchInId", intPunchInID);
                        //objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetActualEntryTimeAndGracebyPunchInId");
                        //objVDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");
                        //objVDbCommand.objSqlCommand.Connection.Open();
                        //SqlDataAdapter sd = new SqlDataAdapter();
                        //DataSet ds = new DataSet();
                        //sd.SelectCommand = objVDbCommand.objSqlCommand;
                        //ds.Clear();
                        //sd.Fill(ds);

                        if (checkHrs)
                        {
                            if (TwoHalfLeaveSameDay)
                            {
                                if (String.Compare(approveType, "UUPL", true) == 0)
                                {
                                    dr["status"] = approveType + "/" + leaveType;
                                }
                                else
                                {
                                    dr["status"] = approveType;
                                }
                            }
                            else
                            {
                                if (halfLeave && checkHrs)
                                {
                                    dr["status"] = leaveType == "FH" ? approveType + " , UUPL/SH" : "UUPL/FH , " + approveType;
                                }
                                else
                                {
                                    dr["status"] = "UUPL/FL";
                                }
                            }
                        }
                        else
                        {
                            dr["status"] = approveType;
                        }
                        dr["ActualEntryTime"] = "";
                        dr["In_Time"] = "";
                        dr["InId"] = "";
                        dr["Out_Time"] = "";
                        dr["OutId"] = "";
                        dr["LunchOut_Time"] = "";
                        dr["LunchOutId"] = "";
                        dr["LunchIn_Time"] = "";
                        dr["Other_Time"] = "";
                        dr["Total_W_Hr"] = "";
                        dr["diff"] = "";
                        dr["TotalId"] = "";
                    }
                    dt.Rows.Add(dr);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception Message:" + ex.Message);
            }
            finally
            {
                SqlConnection.ClearAllPools();
            }
        }

        public DataTable GetDepartment()
        {
            string mode = "Department";
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }
        public DataTable GetEmployee()
        {
            DataTable dt = new DataTable();
            string mode = "Employee";

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);

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
            DataTable dt = new DataTable();
            string mode = "AllEmployee";

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);

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
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);

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
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }
        public DataTable GetEntityYear()
        {
            mode = "Year";
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectAll;
                base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, mode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(dt);
            }
            return dt;
        }
        public DataTable GetDepartmentEmployee(int id)
        {
            if (String.Compare(strusertype, "DH", true) == 0)
            {
                VISDbCommand objVISDbCommand_25 = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand_25.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand_25.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                objVISDbCommand_25.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, id);
                objVISDbCommand_25.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetDPHeadEmployeeData");
                objVISDbCommand_25.objSqlCommand.Parameters.AddWithValue("StrUserId", " ");

                objVISDbCommand_25.objSqlCommand.Connection.Open();
                SqlDataAdapter SdaDPEmp = new SqlDataAdapter();
                SdaDPEmp.SelectCommand = objVISDbCommand_25.objSqlCommand;
                dtdepartemp.Clear();
                SdaDPEmp.Fill(dtdepartemp);
                objVISDbCommand_25.objSqlCommand.Connection.Close();
            }
            else
            {
                VISDbCommand objVISDbCommand_26 = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand_26.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand_26.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;
                objVISDbCommand_26.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, id);
                objVISDbCommand_26.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetDepartmentEmployee");
                objVISDbCommand_26.objSqlCommand.Parameters.AddWithValue("StrUserId", " ");

                objVISDbCommand_26.objSqlCommand.Connection.Open();
                SqlDataAdapter SdaDPEmp = new SqlDataAdapter();
                SdaDPEmp.SelectCommand = objVISDbCommand_26.objSqlCommand;
                dtdepartemp.Clear();
                SdaDPEmp.Fill(dtdepartemp);
                objVISDbCommand_26.objSqlCommand.Connection.Close();
            }
            return dtdepartemp;
        }
        public DataTable SelectDepartment(string Department)
        {
            DataTable dt = new DataTable();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_DepartmentId, Department);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetDepartmentSelectedemp");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter Sda = new SqlDataAdapter();
            Sda.SelectCommand = objVISDbCommand.objSqlCommand;
            dt.Clear();
            Sda.Fill(dt);
            objVISDbCommand.objSqlCommand.Connection.Close();
            return dt;
        }
        public DataTable SelectCompany(string Company)
        {
            DataTable dt = new DataTable();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_CompanyId, Company);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetCompanySelectedEmployee");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter Sda = new SqlDataAdapter();
            Sda.SelectCommand = objVISDbCommand.objSqlCommand;
            dt.Clear();
            Sda.Fill(dt);
            objVISDbCommand.objSqlCommand.Connection.Close();
            return dt;
        }
        public DataTable SelectLineManager(string LineManager)
        {
            DataTable dt = new DataTable();
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LineMId, LineManager);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetLineManagerSelectedEmp");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter Sda = new SqlDataAdapter();
            Sda.SelectCommand = objVISDbCommand.objSqlCommand;
            dt.Clear();
            Sda.Fill(dt);
            objVISDbCommand.objSqlCommand.Connection.Close();
            return dt;
        }

        public DataTable GetMissingEntry(string fromdate, string todate, string Employeeids)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetMissingEntry");

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Date, fromdate);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ToDate, todate);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_employeeIds, Employeeids);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, DateTime.Now.ToString("yyyyMMdd"));

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter da = new SqlDataAdapter();
            DataSet dsDeductionEntry = new DataSet();
            da.SelectCommand = objVISDbCommand.objSqlCommand;
            dsDeductionEntry.Clear();
            da.Fill(dsDeductionEntry);

            if (dsDeductionEntry.Tables.Count > 0 ? dsDeductionEntry.Tables[0].Rows.Count > 0 ? true : false : false)
            {
                foreach (DataRow item in dsDeductionEntry.Tables[0].Rows)
                {
                    fillRecord(item["forwhichdate"].ToString(), item["employee_id"].ToString(), false, "", "", true, false);
                }
            }
            return dt;
        }
        public DataTable GetDeductionDetails(string strDate, string ToDate, string Employeeids)
        {
            //DateTime datevalstart = DateTime.ParseExact(strDate, "yyyyMMdd", CultureInfo.InvariantCulture);
            //var fromdate = datevalstart.ToString("yyyyMMdd");
            //DateTime datevalend = DateTime.ParseExact(ToDate, "yyyyMMdd", CultureInfo.InvariantCulture).AddMonths(1).AddDays(-1);
            //var enddate = datevalend.ToString("yyyyMMdd");
            DataSet ds = new DataSet();

            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "SalaryDeduction");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Date, FromDate);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ToDate, ToDate);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_employeeIds, Employeeids);

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter da = new SqlDataAdapter();
            DataSet dsDeductionEntry = new DataSet();
            da.SelectCommand = objVISDbCommand.objSqlCommand;
            dsDeductionEntry.Clear();
            da.Fill(dsDeductionEntry);

            if (dsDeductionEntry.Tables.Count > 0 ? dsDeductionEntry.Tables[0].Rows.Count > 0 ? true : false : false)
            {
                foreach (DataRow item in dsDeductionEntry.Tables[0].Rows)
                {
                    fillRecord(item["forwhichdate"].ToString(), item["employee_id"].ToString(), false, "", "", true, false);
                }
            }
            return dt;
        }

        public string GetcheckedData(string name, string DRPData)
        {
            checkedvalueRDB = name;
            checkedvalueDRP = DRPData;
            return name;
        }
        protected string GetEmployeeDetail()
        {
            string employeeList = string.Empty;
            string employee = string.Empty;
            DataTable dtemp = new DataTable();
            if (checkedvalueRDB == "Employee")
            {
            }
            else
            {
                if (checkedvalueRDB == "Department")
                {
                    using (base.objSqlCommand.Connection)
                    {
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;
                        base.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DepartmentCHECK_GetEmployee");

                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                        da.Fill(dtemp);
                    }
                }
            }
            return null;
        }
        public DataTable GetDailyEntryTime(int Employee_Id, string Date)
        {
            DataTable Timedt = new DataTable();
            DateTime dtDate = DateTime.Parse(Date);

            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_SalaryDeduction;

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_empId, Employee_Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Date, dtDate.ToString("MM/dd/yyyy"));
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "btnsavedailyentry_Click");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter sda = new SqlDataAdapter();
            sda.SelectCommand = objVISDbCommand.objSqlCommand;
            Timedt.Clear();
            sda.Fill(Timedt);
            objVISDbCommand.objSqlCommand.Connection.Close();
            return Timedt;
        }

        // Attendance Approve Punch In
        public string AddEntity(int Id, int Employee_Id, int EntryType, string HODRemarks, string Temp, string strDate, string Time, int Grace)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Entry_Time, Temp);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, strDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, Grace);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, strDate);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AttendanceRejectPunchIn(int Employee_Id, int EntryType, string Date, string RemarksIn, int InId)
        {
            try
            {
                string[] datearray = Date.Split('/');

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "reject");
                if (InId.ToString().Length != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, Convert.ToInt32(InId.ToString()));
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, RemarksIn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, datearray[2] + datearray[1] + datearray[0]);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "UnApproved");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string ApproveAttendanceOkIn(int InId, string Remarks)
        {
            try
            {
                VISDbCommand objISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "CompanyName");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_InId, InId);
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                sda.SelectCommand = objISDbCommand.objSqlCommand;
                DataTable dtCompanyName = new DataTable();
                dtCompanyName.Clear();
                sda.Fill(dtCompanyName);
                objISDbCommand.objSqlCommand.Connection.Close();

                if (dtCompanyName.Rows.Count > 0)
                {
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DeleteCompanyName");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_InId, InId);
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, InId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, false);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                else
                {
                    //-----TransactionChange------//
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionChange;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, InId);

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    //-----TransactionLog------//
                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, InId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, true);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string UpdateEntity(int InId, int EntryType, string Remarks, string Date, string Time, int Grace, string ActualHr)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_AttendanceApproval;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, InId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Time, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, Grace);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, ActualHr);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();

                //------------Attendance Approved By HOD ----------------------//
                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, "");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);

                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        // Attendance Approve Punch Out
        public string ApproveAttendancePunchOut(int OutId, int EntryType, string Remarks, string Date, string Time, int Grace, string ActualHrs)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_AttendanceApproval;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, OutId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Time, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, Grace);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, ActualHrs);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();

                //------------Attendance Approved By HOD ----------------------//
                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, OutId);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AddEmployeeAttendancePunchOut(int Employee_Id, int EntryType, string HODRemarks, string Temp, string strDate, string Time, int Grace)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Entry_Time, Temp);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, strDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, Grace);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Convert.ToDateTime(strDate));
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AttendanceRejectPunchOut(int Employee_Id, int EntryType, string Date, string HODRemarks, int OutId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "reject");
                if (OutId.ToString().Length != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, Convert.ToInt32(OutId.ToString()));
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);
                string[] datearr = Date.Split('/');
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, datearr[2] + datearr[1] + datearr[0]);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "UnApproved");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
            //GetBindAttendanceData();
        }
        public string ApproveAttendanceOkPunchOut(int OutId, string Remarks)
        {
            try
            {
                VISDbCommand objISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetCompanyIdByPunchOut");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_OutId, OutId);
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                sda.SelectCommand = objISDbCommand.objSqlCommand;
                DataTable dtCompanyName = new DataTable();
                dtCompanyName.Clear();
                sda.Fill(dtCompanyName);
                objISDbCommand.objSqlCommand.Connection.Close();

                if (dtCompanyName.Rows.Count > 0)
                {
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DeleteCompanyIdByPunchOut");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_OutId, OutId);
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OutId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, false);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                else
                {
                    //-----TransactionChange------//
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionChange;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OutId);

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    //-----TransactionLog------//
                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OutId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, true);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }

        // Attendance Approve Lunch Out
        public string ApproveAttendanceLunchOut(int LunchOutId, string Remarks, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_AttendanceApproval;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, LunchOutId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Time, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, "");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, LunchOutId);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AddEmployeeAttendanceLunchOut(int Employee_Id, int EntryType, string Remarks, string Temp, string Date, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Entry_Time, Temp);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, Time);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AttendanceRejectLunchOut(int LunchOutId, int Employee_Id, int EntryType, string Date, string HODRemarks)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "reject");
                if (LunchOutId.ToString().Length != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, Convert.ToInt32(LunchOutId));
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                string[] datearr = Date.ToString().Split('/');
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, datearr[2] + datearr[1] + datearr[0]);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "UnApproved");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, HODRemarks);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string ApproveAttendanceOkLunchOut(int LunchOutId, string Remarks)
        {
            try
            {
                VISDbCommand objISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetCompanyIdByLunchOut");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LunchOutId, LunchOutId);
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                sda.SelectCommand = objISDbCommand.objSqlCommand;
                DataTable dtCompanyName = new DataTable();
                dtCompanyName.Clear();
                sda.Fill(dtCompanyName);
                objISDbCommand.objSqlCommand.Connection.Close();

                if (dtCompanyName.Rows.Count > 0)
                {
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DeleteCompanyIdByLunchOut");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LunchOutId, LunchOutId);
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchOutId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, false);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                else
                {
                    //-----TransactionChange------//
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionChange;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchOutId);

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    //-----TransactionLog------//
                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchOutId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, true);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }

        // Attendance Approve Lunch In
        public string ApproveAttendanceLunchIn(int LunchInId, string Remarks, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_AttendanceApproval;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, LunchInId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Time, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, "");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, LunchInId);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AddEmployeeAttendanceLunchIn(int Employee_Id, int EntryType, string Remarks, string Temp, string Date, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Entry_Time, Temp);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, Time);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AttendanceRejectLunchIn(int Employee_Id, int LunchInId, int EntryType, string Date, string HODRemarks)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "reject");
                if (LunchInId.ToString().Length != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, Convert.ToInt32(LunchInId));
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                string[] datearr = Date.ToString().Split('/');
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, datearr[2] + datearr[1] + datearr[0]);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "UnApproved");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, HODRemarks);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string ApproveAttendanceOkLunchIn(int LunchInId, string Remarks)
        {
            try
            {
                VISDbCommand objISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetCompanyIdByLunchIn");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LunchInId, LunchInId);
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                sda.SelectCommand = objISDbCommand.objSqlCommand;
                DataTable dtCompanyName = new DataTable();
                dtCompanyName.Clear();
                sda.Fill(dtCompanyName);
                objISDbCommand.objSqlCommand.Connection.Close();

                if (dtCompanyName.Rows.Count > 0)
                {
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DeleteCompanyIdByLunchIn");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_LunchInId, LunchInId);
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchInId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, false);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                else
                {
                    //-----TransactionChange------//
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionChange;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchInId);

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    //-----TransactionLog------//
                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, LunchInId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, true);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }

        // Attendance Approve Work In
        public string ApproveAttendanceOther(int OtherId, string Remarks, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_AttendanceApproval;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, OtherId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Time, Time);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, "");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, OtherId);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, Remarks);

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public DataTable GetEmployeeIsNotHostEmployee(int Employee_Id)
        {
            DataTable Timedt = new DataTable();

            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeId, Employee_Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetEmployeeIsNotHostEmployee");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

            objVISDbCommand.objSqlCommand.Connection.Open();
            SqlDataAdapter sda = new SqlDataAdapter();
            sda.SelectCommand = objVISDbCommand.objSqlCommand;
            Timedt.Clear();
            sda.Fill(Timedt);
            objVISDbCommand.objSqlCommand.Connection.Close();
            return Timedt;
        }
        public string AddEmployeeAttendanceOtherwork(int Employee_Id, int EntryType, string HODRemarks, string Temp, string Date, string Time)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Procattendance_transaction;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "add");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Id, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, HODRemarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Entry_Time, Temp);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_grace, "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_actualEntryTime, Time);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();


                VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;

                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "approve");
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, HODRemarks);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, Date);
                objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "Approved");

                if (!objVIDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVIDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVIDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                objVIDbCommand.objSqlCommand.Connection.Close();

                //GetBindAttendanceData(EmployeeId, FromDate, EndDate, DrpemName, DropdownvalDECL, RdbDateval, Rdbmonthval, mon, y);
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string AttendanceRejectOtherWork(int Employee_Id, int OtherId, int EntryType, string Date, string HODRemarks)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_DailyentrytimingAddEdit;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "reject");
                if (OtherId.ToString().Length != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Transaction_Id, Convert.ToInt32(OtherId));
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Employee_ID, Employee_Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EntryType, EntryType);
                string[] datearr = Date.ToString().Split('/');
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_fromDate, datearr[2] + datearr[1] + datearr[0]);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Bit_Approved, "UnApproved");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_HOD_Remarks, HODRemarks);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public string ApproveAttendanceOkOtherWorkIn(int OtherId, string Remarks)
        {
            try
            {
                VISDbCommand objISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objISDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "GetCompanyIdByWorkIn");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_OtherId, OtherId);
                objISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                objISDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                objISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter sda = new SqlDataAdapter();
                sda.SelectCommand = objISDbCommand.objSqlCommand;
                DataTable dtCompanyName = new DataTable();
                dtCompanyName.Clear();
                sda.Fill(dtCompanyName);
                objISDbCommand.objSqlCommand.Connection.Close();

                if (dtCompanyName.Rows.Count > 0)
                {
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_procAttendanceReport_SelectById;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "DeleteCompanyIdByWorkIn");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_OtherId, OtherId);
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_EmployeeID, "");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue("StrUserId", "");

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OtherId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, false);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
                else
                {
                    //-----TransactionChange------//
                    VISDbCommand objVIDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVIDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVIDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionChange;

                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVIDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OtherId);

                    objVIDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVIDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVIDbCommand.objSqlCommand.Connection.Close();

                    //-----TransactionLog------//
                    VISDbCommand objVDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVDbCommand.objSqlCommand.CommandText = AttendanceReportConstatnts.const_ProcAttendanceReport_Proc_TransactionLog;

                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_mode, "Insert");
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Attendance_TransactionId, OtherId);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeType, true);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_UserId, 21);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_ChangeTime, System.DateTime.Now);
                    objVDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceReportConstatnts.const_Field_Remarks, Remarks);

                    objVDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVDbCommand.objSqlCommand.Connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
    }
}
