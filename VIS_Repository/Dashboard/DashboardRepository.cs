using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Dashboard;

namespace VIS_Repository.Dashboard
{
    public class DashboardRepository : VISDbCommand
    {
        public DataSet DashboardDataSet { get; set; }
        public DashboardRepository(string _connectionstring) : base(_connectionstring)
        {
        }


        public DataSet ReturnDataSetFromSP(string strSPNameOrQuery, SqlParameter[] SPParameters)
        {
            DataSet ds = new DataSet();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = strSPNameOrQuery;
                base.objSqlCommand.Parameters.AddRange(SPParameters);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                da.Fill(ds);
            }
            return ds;
        }

        public object ReturnScalarValueFromFunction(string strSPNameOrQuery)
        {
            object retValue = null;
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = CommandType.Text;
                base.objSqlCommand.CommandText = strSPNameOrQuery;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                retValue = base.objSqlCommand.ExecuteScalar();
            }
            return retValue;

        }

        private DataTable ReturnDataTableForSection(string strSectioName)
        {
            DataTable dtReturn = new DataTable();
            foreach (DataTable dt in DashboardDataSet.Tables)
            {
                if (dt.Columns[dt.Columns.Count - 1].ColumnName == strSectioName)
                {
                    return dt;
                }
            }
            return dtReturn;
        }

        public List<T> MapSection<T>(string strSectionName, bool blnSingleRow = false)
        {
            List<T> ObjectOfT = new List<T>();
            DataTable dtCurrent = ReturnDataTableForSection(strSectionName);
            if (dtCurrent.Rows.Count > 0)
            {
                if (blnSingleRow)
                {

                    ObjectOfT.Add(VISAutoMapper.ConvertDataRow<T>(dtCurrent.Rows[0]));
                }
                else
                {
                    ObjectOfT.AddRange(VISAutoMapper.ConvertDataTable<T>(dtCurrent));
                }
            }
            return ObjectOfT;
        }

        public DashboardData GetDashboardDataSets(int UserId, bool IsApproved, string strStartDate, string strEndDate, bool IsLineManager, DateTime date, int PunchInId, bool IsAdmin)
        {
            DashboardData objDashboardData = new DashboardData();
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[8];
                sqlParameters[0] = new SqlParameter("Id", UserId);
                sqlParameters[1] = new SqlParameter("IsApproved", IsApproved);
                sqlParameters[2] = new SqlParameter("StartDate", strStartDate);
                sqlParameters[3] = new SqlParameter("EndDate", strEndDate);
                sqlParameters[4] = new SqlParameter("IsLineManager", IsLineManager);
                sqlParameters[5] = new SqlParameter("Date", date);
                sqlParameters[6] = new SqlParameter("PunchInId", PunchInId);
                sqlParameters[7] = new SqlParameter("IsAdmin", IsAdmin);


                DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);
                if (DashboardDataSet.Tables.Count > 0)
                {
                    objDashboardData.UserProfileData = MapSection<MyProfile>("MyProfile", true)[0];
                    objDashboardData.UserSkillData = MapSection<MySkill>("MySkill", false);
                    objDashboardData.UserAllocationData = MapSection<MyAllocation>("MyAllocation", false);
                    objDashboardData.UserTeamData = MapSection<MyTeam>("MyTeam", false);
                    objDashboardData.UserAlertData= MapSection<MyAlerts>("MyAlerts", false);

                    //objDashboardData.UserLeaveDetails = MapSection<MyLeaveDetails>("MyLeaveDetails", false);
                    //objDashboardData.UserNwdHistory= MapSection<MyNwdHistory>("NwdHistory", false);
                    //objDashboardData.UserCalTotalAttendanceData = MapSection<CalTotalAttendance>("CalTotalAttendance",true)[0];
                    //objDashboardData.UserActualEntryTimeAndGracePeriod = MapSection<ActualEntryTimeAndGracePeriod>("ActualEntryTimeAndGracePeriod", true)[0];
                    //objDashboardData.UserLeaveLedgerData = MapSection<LeaveLedgerData>("LeaveLedgerData", false);
                    //objDashboardData.UserLeaveDetailsByDate = MapSection<LeaveDetailsByDate>("LeaveDetailsByDate", false);
                    //objDashboardData.UserHolidayListForEmployeeData = MapSection<HolidayListForEmployee>("HolidayListForEmployee", false);
                    //objDashboardData.HolidayForDateData = MapSection<HolidayForDate>("HolidayForDate", false);
                }
                return objDashboardData;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + Environment.NewLine + ex.StackTrace);
                return null;
            }

        }

        public MyProfile GetProfileInformationForUser(Int32 UserId)
        {
            MyProfile objEntityToReturn = new MyProfile();
            SqlParameter[] sqlParameters = new SqlParameter[1];
            sqlParameters[0] = new SqlParameter("Id", UserId);

            DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetProfileById, sqlParameters);
            if (DashboardDataSet.Tables.Count > 0)
            {
                objEntityToReturn = VISAutoMapper.ConvertDataRow<MyProfile>(DashboardDataSet.Tables[0].Rows[0]);
            }
            return objEntityToReturn;
        }

        #region UserDo
        //UserDO 

        public DataSet GetAllUser(Int32 UserId, string userType)
        {
            //procGetAllUesrForLoggedInUser => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@usertype", userType);
                DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetAllUser, sqlParameters);
                return DashboardDataSet;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        public DataSet UserDetailById(Int32 UserId)
        {
            //procGetUserDetailById => This is the SP which can be called to remove logic below.
            DataSet dsUserDetail = new DataSet();
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);

                dsUserDetail = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetUserDetailById, sqlParameters);
                if (dsUserDetail != null && dsUserDetail.Tables.Count > 0 && dsUserDetail.Tables[0].Rows.Count > 0)
                {
                    return dsUserDetail;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        public DataSet GetAllUserWithOutLM(Int32 UserId, string userType)
        {
            //procGetAllUserWithOutLM => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@usertype", userType);
                DataSet dsAllUserWithOutLM = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetAllUserWithOutLM, sqlParameters);
                return dsAllUserWithOutLM;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }

        }
        #endregion


        #region Profile

        //BLProfile

        public DataSet GetProfileById(Int32 UserId)
        {
            //procGetProfileById => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsProfile = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetProfileById, sqlParameters);

                if (dsProfile != null && dsProfile.Tables.Count > 0 && dsProfile.Tables[0].Rows.Count > 0)
                {
                    return dsProfile;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }

        }

        public DataSet getprojectallocationdetails(Int32 userid, string strfromdate, string strtodate)
        {
            //procgetprojectallocationdetails => this is the sp which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[3];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, userid);
                sqlParameters[1] = new SqlParameter("@StartDate", strfromdate);
                sqlParameters[2] = new SqlParameter("@EndDate", strtodate);
                DataSet dsprojectallocationdetails = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                if (dsprojectallocationdetails != null && dsprojectallocationdetails.Tables.Count > 0 && dsprojectallocationdetails.Tables[0].Rows.Count > 0)
                {
                    return dsprojectallocationdetails;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        public DataSet GetShortProfileDetails(int UserId, string UserType)
        {
            //ProcGetShortProfileDetails => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[3];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@usertype", UserType);
                DataSet dsprojectallocationdetails = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetShortProfileDetails, sqlParameters);
                if (dsprojectallocationdetails != null && dsprojectallocationdetails.Tables.Count > 0)
                {
                    return dsprojectallocationdetails;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        #endregion

        #region Attendance

        /***************** Get Week Attendance Record  ******************/

        public DataTable getWeekAttendanceReport(string UserId, string strStartDate, string strEndDate)
        {
            DataTable dtAttendance = new DataTable("Attendance");
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now;
            //IFormatProvider provider = new System.Globalization.CultureInfo("es-ES", true);
            try
            {
                //SqlParameter[] _para = new SqlParameter[2];
                dtAttendance.Columns.Add("Employee_Name", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Employee_Id", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Date", Type.GetType("System.String"));
                dtAttendance.Columns.Add("In_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Out_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchOut_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchIn_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Other_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Total_Hr", Type.GetType("System.String"));
                dtAttendance.Columns.Add("TotalWorksheet_Hr", Type.GetType("System.String"));
                dtAttendance.Columns.Add("diff", Type.GetType("System.String"));
                dtAttendance.Columns.Add("status", Type.GetType("System.String"));
                dtAttendance.Columns.Add("InId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("OutId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchOutId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchInId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("OtherId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("TotalId", Type.GetType("System.String"));

                string strEmployee_Name = GetEmployee_Name(UserId);
                startDate = convertStrToDate(strStartDate);
                endDate = convertStrToDate(strEndDate);
                //_para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                //_para[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));
                //DataSet dsTripLeave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetLeaveFormDetail, _para);
                DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                TimeSpan tsDays = endDate - startDate;
                int totalDays = tsDays.Days + 1;

                for (int i = 0; i < totalDays; i++)
                {

                    string strDate = startDate.ToString("yyyy-MM-dd");
                    string[] arrDate = strDate.Split('/');


                    sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                    sqlParameters[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));


                    //DataSet dsNWD = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetNWDHistoryForEmpForDate, sqlParameters);
                    DataSet dsNWD = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                    if (dsNWD != null && dsNWD.Tables.Count > 0 && dsNWD.Tables[0].Rows.Count > 0)
                    {
                        if (dsNWD.Tables[0].Columns.Contains("leaveType") == true)
                        {
                            if (DashboardDataSet != null && DashboardDataSet.Tables.Count > 0 && DashboardDataSet.Tables[0].Rows.Count > 0)
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "OnTrip/" + Convert.ToString(dsNWD.Tables[0].Rows[0]["leaveType"]), false, false, dtAttendance);
                            }
                            else
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "NWD/" + Convert.ToString(dsNWD.Tables[0].Rows[0]["leaveType"]), false, false, dtAttendance);
                            }
                        }
                        else
                        {

                            if (DashboardDataSet != null && DashboardDataSet.Tables.Count > 0 && DashboardDataSet.Tables[0].Rows.Count > 0)
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "OnTrip/" + Convert.ToString(dsNWD.Tables[0].Rows[0]["leaveType"]), false, false, dtAttendance);
                            }
                            else
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "", true, false, dtAttendance);
                            }
                        }
                    }
                    else
                    {

                        sqlParameters = new SqlParameter[2];
                        sqlParameters[0] = new SqlParameter("@EmployeeID", UserId);
                        sqlParameters[1] = new SqlParameter("@LeaveDate", startDate.ToString("yyyyMMdd"));
                        //DataSet dsLeave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetEmpLeaveLedgerForDate, sqlParameters);
                        DataSet dsLeave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);
                        if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                        {
                            DataTable dt = GetLeaveDetailsByDate(Convert.ToInt32(UserId), startDate.ToString("yyyyMMdd"));
                            if (dt != null && dt.Rows.Count > 0)
                            {
                                DataRow dr = dsLeave.Tables[0].NewRow();
                                dr["leaveDuration"] = dt.Rows[0]["leaveDuration"].ToString();
                                dr["leaveType"] = dt.Rows[0]["leaveType"].ToString();
                                dr["approveType"] = dt.Rows[0]["approveType"].ToString();
                                dr["shortLeaveType"] = dt.Rows[0]["shortLeaveType"].ToString();
                                dsLeave.Tables[0].Rows.Add(dr);
                            }
                        }

                        if (dsLeave != null && dsLeave.Tables.Count > 0 && dsLeave.Tables[0].Rows.Count > 0)
                        {
                            if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                            {
                                //New change..
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false, dtAttendance);
                            }
                            else
                            {
                                if (dsLeave.Tables[0].Rows.Count > 1)
                                {
                                    string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                    dtAttendance = getweekattendancerecord(strDate, UserId, true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true, dtAttendance);
                                }
                                else
                                {
                                    dtAttendance = getweekattendancerecord(strDate, UserId, true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false, dtAttendance);
                                }
                            }
                        }
                        else
                        {
                            sqlParameters = new SqlParameter[1];
                            sqlParameters[0] = new SqlParameter("@Date", strDate);
                            //DataSet dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetEmpHolidayListForDate, _para);
                            DataSet dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                            if (dsHoliDay != null && dsHoliDay.Tables.Count > 0 && dsHoliDay.Tables[0].Rows.Count > 0 && dsHoliDay.Tables[0].Columns.Contains("holidayName") == true)
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", dsHoliDay.Tables[0].Rows[0]["holidayName"].ToString(), false, false, dtAttendance);
                            }
                            else
                            {
                                sqlParameters = new SqlParameter[1];
                                sqlParameters[0] = new SqlParameter("@Date", strDate);
                                //dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetHolidayForDate, _para);
                                dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetHolidayForDate, sqlParameters);
                                if (dsHoliDay != null && dsHoliDay.Tables.Count > 0 && dsHoliDay.Tables[0].Rows.Count > 0 && dsHoliDay.Tables[0].Columns.Contains("holidayName") == true)
                                {
                                    dtAttendance = getweekattendancerecord(strDate, UserId, false, "", dsHoliDay.Tables[0].Rows[0]["holidayName"].ToString(), false, false, dtAttendance);
                                }
                                else
                                {
                                    dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "", true, false, dtAttendance);
                                }
                            }
                            dsHoliDay = null;
                        }
                        dsLeave = null;
                    }
                    dsNWD = null;
                    dtAttendance.Rows[i]["Employee_Name"] = strEmployee_Name;
                    startDate = startDate.AddDays(1);
                }
            }
            catch (Exception ex)
            {
                string lineNum = ex.StackTrace.Substring(ex.StackTrace.Length - 10, 10);

                throw new Exception(ex.Message.ToString());
            }
            return dtAttendance;
        }
        protected DataTable getweekattendancerecord(string date, string empid, Boolean halfleave, string leavetype, string approvetype, Boolean checkhrs, Boolean twohalfleavesameday, DataTable dtattendance)
        {
            //Proccaltotalattendancereport => this is the sp which can be called to remove logic below.
            try
            {
                DataRow dr;

                #region new changes

                //DateTime getdaterecord = Convert.ToDateTime(date, provider);
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter("@EmployeeID", empid);
                sqlParameters[1] = new SqlParameter("@Date", date);
                DataSet dstemp = ReturnDataSetFromSP(DashboardConstsants.const_Proc_Getweekattendancerecord, sqlParameters);

                if (dstemp.Tables.Count > 0 && dstemp.Tables[0].Rows.Count > 0)
                {
                    dr = dtattendance.NewRow();
                    dr["employee_id"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["employeeid"].ToString()) ? dstemp.Tables[0].Rows[0]["employeeid"].ToString() : "";
                    dr["employee_name"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["employeename"].ToString()) ? dstemp.Tables[0].Rows[0]["employeename"].ToString() : "";
                    dr["date"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["date"].ToString()) ? dstemp.Tables[0].Rows[0]["date"].ToString() : "";

                    if (!string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["intime"].ToString()))
                    {

                        dr["inid"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["intimeid"].ToString()) ? dstemp.Tables[0].Rows[0]["intimeid"].ToString() : "";
                        dr["in_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["intime"].ToString()) ? dstemp.Tables[0].Rows[0]["intime"].ToString() : "";
                        if (dr["inid"].ToString() != "")
                        {
                            int intPunchInID = Convert.ToInt32(dr["inid"]);
                            SqlParameter[] _para = new SqlParameter[1];
                            _para[0] = new SqlParameter("PunchInId", intPunchInID);
                            DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetActualEntryTimeAndGraceForPunchInId, _para);
                            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                            {
                                string[] arr = ds.Tables[0].Rows[0]["actualentrytime"].ToString().Split(':');
                                if (arr.Length > 1)
                                {
                                    TimeSpan punchinactual = new TimeSpan(Convert.ToInt32(arr[0]), Convert.ToInt32(arr[1]), 0);
                                    TimeSpan tsgrace;
                                    TimeSpan actualinwithgrace;
                                    DateTime dtpunchin = Convert.ToDateTime(dr["in_time"]);
                                    TimeSpan punchin = new TimeSpan(dtpunchin.Hour, dtpunchin.Minute, dtpunchin.Second);

                                    string strgrace = "";


                                    DateTime dtgetdate = Convert.ToDateTime(date);
                                    strgrace = ds.Tables[0].Rows[0]["grace"].ToString();
                                    tsgrace = new TimeSpan(0, Convert.ToInt32(strgrace), 0);

                                    actualinwithgrace = punchinactual.Add(tsgrace);

                                    if (halfleave)
                                    {
                                    }
                                    else
                                    {
                                        if (punchin > actualinwithgrace)
                                        {

                                            dr["diff"] = dr["diff"].ToString() + "i";

                                        }
                                    }
                                }
                            }
                        }


                        Boolean isinoffice = Convert.ToBoolean(dstemp.Tables[0].Rows[0]["isinoffice"]);
                        Boolean isinbreak = Convert.ToBoolean(dstemp.Tables[0].Rows[0]["isinbreak"]);
                        Boolean isinlunch = Convert.ToBoolean(dstemp.Tables[0].Rows[0]["isinlunch"]);
                        if (isinoffice || isinbreak || isinlunch)
                        {
                            dr["out_time"] = "";
                            dr["outid"] = "";
                        }
                        else
                        {
                            dr["out_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["outtime"].ToString()) ? dstemp.Tables[0].Rows[0]["outtime"].ToString() : "";
                            dr["outid"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["outtimeid"].ToString()) ? dstemp.Tables[0].Rows[0]["outtimeid"].ToString() : "";
                        }

                        dr["lunchout_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["lunchouttime"].ToString()) ? dstemp.Tables[0].Rows[0]["lunchouttime"].ToString() : "";
                        dr["lunchoutid"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["lunchouttimeid"].ToString()) ? dstemp.Tables[0].Rows[0]["lunchouttimeid"].ToString() : "";

                        if (isinlunch)
                        {
                            dr["lunchin_time"] = "";
                            dr["lunchinid"] = "";
                        }
                        else
                        {
                            dr["lunchin_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["lunchintime"].ToString()) ? dstemp.Tables[0].Rows[0]["lunchintime"].ToString() : "";
                            dr["lunchinid"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["lunchintimeid"].ToString()) ? dstemp.Tables[0].Rows[0]["lunchintimeid"].ToString() : "";
                        }

                        dr["otherid"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["othertimeid"].ToString()) ? dstemp.Tables[0].Rows[0]["othertimeid"].ToString() : "";
                        dr["other_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["totalothertime"].ToString()) ? dstemp.Tables[0].Rows[0]["totalothertime"].ToString() : "";


                        string strworksheethours = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["totalworksheethours"].ToString()) ? dstemp.Tables[0].Rows[0]["totalworksheethours"].ToString() : "";
                        strworksheethours = strworksheethours.Replace('.', ':') + ":00";

                        string[] arrworksheethours = strworksheethours.Split(':');
                        TimeSpan tsworksheethours = new TimeSpan();
                        tsworksheethours = new TimeSpan(Convert.ToInt32(arrworksheethours[0]), Convert.ToInt32(arrworksheethours[1]), 0);

                        //dr["totalworksheet_hr"] = tsworksheethours.tostring();
                        dr["totalworksheet_hr"] = strworksheethours.ToString();

                        if (checkhrs)
                        {
                            if (halfleave)
                            {
                                if (string.Compare(approvetype, "uupl", true) == 0)
                                {
                                    dr["status"] = approvetype + "/" + leavetype;
                                }
                                else
                                {
                                    if (approvetype.Split('/')[0] == "official trip")
                                    {
                                        dr["status"] = "ontrip" + "/" + leavetype;
                                    }
                                    else
                                    {
                                        dr["status"] = approvetype;
                                    }
                                }
                            }
                            else
                            {
                                dr["status"] = "present";
                            }
                        }
                        else
                        {
                            if (dr["inid"].ToString() != "")
                            {
                                dr["status"] = "present";
                            }
                            else
                            {
                                dr["status"] = approvetype;
                            }
                        }

                        dr["other_time"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["totalothertime"].ToString()) ? dstemp.Tables[0].Rows[0]["totalothertime"].ToString() : ""; ;
                        dr["total_hr"] = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["totalworkingtime"].ToString()) ? dstemp.Tables[0].Rows[0]["totalworkingtime"].ToString() : "";



                        string strtotalofficetime = !string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["totalofficetime"].ToString()) ? dstemp.Tables[0].Rows[0]["totalofficetime"].ToString() : "";


                        TimeSpan tstotalofficetime = new TimeSpan();
                        if (dr["total_hr"].ToString() != "")
                        {
                            string[] arrtotalofficetime = dr["total_hr"].ToString().Split(':');
                            tstotalofficetime = new TimeSpan(Convert.ToInt32(arrtotalofficetime[0]), Convert.ToInt32(arrtotalofficetime[1]), Convert.ToInt32(arrtotalofficetime[2]));
                        }
                        else
                        {
                            tstotalofficetime = new TimeSpan(0, 0, 0);
                        }

                        TimeSpan tstotalworkingtime = new TimeSpan();
                        if (strtotalofficetime != "")
                        {
                            string[] arrtotalworksheet_hr = strtotalofficetime.Split(':');
                            tstotalworkingtime = new TimeSpan(Convert.ToInt32(arrtotalworksheet_hr[0]), Convert.ToInt32(arrtotalworksheet_hr[1]), Convert.ToInt32(arrtotalworksheet_hr[2]));
                        }
                        else
                        {
                            tstotalworkingtime = new TimeSpan(0, 0, 0);
                        }

                        if (halfleave)
                        {
                            TimeSpan temp = new TimeSpan(4, 15, 0);   // for working hrs...
                            if (tstotalofficetime < temp)
                            {
                                if (checkhrs)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "t";
                                }
                            }
                            temp = new TimeSpan(5, 0, 0);    // for total hrs...
                            if (tstotalworkingtime < temp)
                            {
                                if (checkhrs)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "o";
                                }
                            }
                        }
                        else
                        {
                            TimeSpan temp = new TimeSpan(8, 30, 0);   // for working hrs...
                            if (checkhrs && isinoffice == false && isinbreak == false && isinlunch == false)
                            {
                                if (tstotalofficetime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "t";
                                }

                                temp = new TimeSpan(9, 30, 0);    // for total hrs...
                                if (tstotalworkingtime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "o";
                                }
                            }
                            //created by darshan 14/03/2011...
                            //this if condition check which not apply leave application
                            //and taken half leave so status will be change if less then 2 hours then "uupl"
                            // or less then 7 hours then "0.5/uupl"
                            if (!isinoffice && !isinlunch && !isinbreak)
                            {
                                temp = new TimeSpan(7, 0, 0);
                                if (tstotalofficetime < temp)
                                {
                                    temp = new TimeSpan(2, 0, 0);
                                    if (tstotalofficetime < temp)
                                    {
                                        dr["status"] = "uupl";
                                    }
                                    else
                                    {
                                        dr["status"] = "0.5/uupl";
                                    }
                                }
                            }
                        }

                        dr["totalid"] = "0";
                        if (dr["outid"].ToString() == "")
                        {
                            dr["total_hr"] = "";
                        }
                        if (string.IsNullOrEmpty(dstemp.Tables[0].Rows[0]["othertimeid"].ToString()))
                        {
                            dr["other_time"] = "";
                        }
                        if (dr["in_time"].ToString() != "")
                        {
                            dr["in_time"] = Convert.ToDateTime(dr["in_time"].ToString()).ToString("hh:mm:ss");
                        }
                        if (dr["out_time"].ToString() != "")
                        {
                            dr["out_time"] = Convert.ToDateTime(dr["out_time"].ToString()).ToString("hh:mm:ss");
                        }
                    }
                    else
                    {
                        if (checkhrs)
                        {
                            if (twohalfleavesameday)
                            {
                                //oldnew//dr["status"] = approvetype;
                                if (string.Compare(approvetype, "uupl", true) == 0)
                                {
                                    dr["status"] = approvetype + "/" + leavetype;
                                }
                                else
                                {
                                    if (approvetype.Split('/')[0] == "official trip")
                                    {
                                        dr["status"] = "ontrip" + "/" + leavetype;
                                    }
                                    else
                                    {
                                        dr["status"] = approvetype;
                                    }
                                }
                            }
                            else
                            {
                                if (halfleave && checkhrs)
                                {
                                    dr["status"] = leavetype == "fh" ? approvetype + " , uupl/sh" : "uupl/fh , " + approvetype;
                                }
                                else
                                {
                                    dr["status"] = "uupl/fl";
                                }
                            }
                        }
                        else
                        {
                            if (approvetype.Split('/')[0] == "official trip")
                            {
                                dr["status"] = "ontrip/fl";
                            }
                            else
                            {
                                dr["status"] = approvetype;
                            }
                        }
                        dr["in_time"] = "";
                        dr["inid"] = "";
                        dr["out_time"] = "";
                        dr["outid"] = "";
                        dr["lunchout_time"] = "";
                        dr["lunchin_time"] = "";
                        dr["other_time"] = "";
                        dr["total_hr"] = "";
                        dr["diff"] = "";
                        dr["totalid"] = "";

                    }
                    dtattendance.Rows.Add(dr);

                }

                #endregion
            }
            catch (Exception ex)
            {
                string lineNum = ex.StackTrace.Substring(ex.StackTrace.Length - 10, 10);

                throw new Exception(ex.Message.ToString());

            }
            finally
            {
            }
            return dtattendance;
        }
        /***************** End ******************/

        /**************** Get Month Attendanace Report ***********************/

        public DataTable getMonthAttendanaceReport(string UserId, string strMonthStartDate, string strMonthEndDate)
        {
            DataTable dtAttendance = new DataTable("Attendance");
            DateTime startDate = DateTime.Now;
            DateTime endDate = DateTime.Now;
            try
            {
                string strEmployeeName = GetEmployee_Name(UserId);

                startDate = convertStrToDate(strMonthStartDate);
                endDate = convertStrToDate(strMonthEndDate);

                dtAttendance.Columns.Add("Employee_Name", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Employee_Id", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Date", Type.GetType("System.String"));
                dtAttendance.Columns.Add("In_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Out_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchOut_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchIn_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Other_Time", Type.GetType("System.String"));
                dtAttendance.Columns.Add("Total_Hr", Type.GetType("System.String"));
                dtAttendance.Columns.Add("TotalWorksheet_Hr", Type.GetType("System.String"));
                dtAttendance.Columns.Add("diff", Type.GetType("System.String"));
                dtAttendance.Columns.Add("status", Type.GetType("System.String"));
                dtAttendance.Columns.Add("InId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("OutId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchOutId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("LunchInId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("OtherId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("TotalId", Type.GetType("System.String"));
                dtAttendance.Columns.Add("color", Type.GetType("System.String"));
                SqlParameter[] _para = new SqlParameter[2];
                _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                _para[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));
                DataSet dsTripLeave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetLeaveFormDetail, _para);

                TimeSpan tsDays = endDate - startDate;
                int totalDays = tsDays.Days + 1;

                bool IsNWD = false;

                bool IsHolyDay = false;
                bool IsLeave = false;
                string strLeaveType = "";
                string strApproveType = "";

                for (int i = 0; i < totalDays; i++)
                {
                    string strDate = startDate.ToString("yyyy-MM-dd");
                    string[] arrDate = strDate.Split('/');


                    _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                    _para[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));


                    DataSet dsNWD = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetNWDHistoryForEmpForDate, _para);

                    IsNWD = false;
                    IsHolyDay = false;
                    IsLeave = false;
                    strLeaveType = "";

                    if (dsNWD != null && dsNWD.Tables.Count > 0 && dsNWD.Tables[0].Rows.Count > 0)
                    {
                        IsNWD = true;
                        if (dsNWD.Tables[0].Columns.Contains("leaveType") == true)
                        {

                            if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "OnTrip/" + Convert.ToString(dsNWD.Tables[0].Rows[0]["leaveType"]), false, false, dtAttendance);
                            }
                            else
                            {
                                dtAttendance = getMonthAttendanaceRecord(strDate, UserId, false, "", "NWD/" + dsNWD.Tables[0].Rows[0]["leaveType"].ToString(), false, false, dtAttendance);
                            }
                        }
                        else
                        {

                            if (dsTripLeave != null && dsTripLeave.Tables.Count > 0 && dsTripLeave.Tables[0].Rows.Count > 0)
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "OnTrip/" + Convert.ToString(dsNWD.Tables[0].Rows[0]["leaveType"]), false, false, dtAttendance);
                            }
                            else
                            {
                                dtAttendance = getweekattendancerecord(strDate, UserId, false, "", "", true, false, dtAttendance);
                            }
                        }
                    }
                    else
                    {


                        _para = new SqlParameter[2];
                        _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                        _para[1] = new SqlParameter("@Date", startDate.ToString("yyyymmdd"));
                        DataSet dsLeave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetEmpLeaveLedgerForDate, _para);

                        if (dsLeave == null || dsLeave.Tables[0].Rows.Count == 0)
                        {
                            DataTable dt = GetLeaveDetailsByDate(Convert.ToInt32(UserId), startDate.ToString("yyyyMMdd"));
                            if (dt != null && dt.Rows.Count > 0)
                            {
                                DataRow dr = dsLeave.Tables[0].NewRow();
                                dr["leaveDuration"] = dt.Rows[0]["leaveDuration"].ToString();
                                dr["leaveType"] = dt.Rows[0]["leaveType"].ToString();
                                dr["approveType"] = dt.Rows[0]["approveType"].ToString();
                                dr["shortLeaveType"] = dt.Rows[0]["shortLeaveType"].ToString();
                                dsLeave.Tables[0].Rows.Add(dr);
                            }
                        }

                        if (dsLeave != null && dsLeave.Tables.Count > 0 && dsLeave.Tables[0].Rows.Count > 0)
                        {
                            IsLeave = true;
                            if (dsLeave.Tables[0].Columns.Contains("shortLeaveType") == true && dsLeave.Tables[0].Columns.Contains("approveType") == true)
                            {
                                strLeaveType = dsLeave.Tables[0].Rows[0]["shortLeaveType"].ToString();
                                strApproveType = dsLeave.Tables[0].Rows[0]["approveType"].ToString();
                            }

                            if (dsLeave.Tables[0].Rows[0]["leaveDuration"].ToString() == "Full")
                            {
                                //New change..
                                dtAttendance = getMonthAttendanaceRecord(strDate, UserId, false, "", dsLeave.Tables[0].Rows[0]["approveType"].ToString(), false, false, dtAttendance);
                            }
                            else
                            {
                                if (dsLeave.Tables[0].Rows.Count > 1)
                                {
                                    string StrApproveTypeName = dsLeave.Tables[0].Rows[0]["approveType"].ToString() + " , " + dsLeave.Tables[0].Rows[1]["approveType"].ToString();
                                    dtAttendance = getMonthAttendanaceRecord(strDate, UserId, true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), StrApproveTypeName, true, true, dtAttendance);
                                }
                                else
                                {
                                    dtAttendance = getMonthAttendanaceRecord(strDate, UserId, true, dsLeave.Tables[0].Rows[0]["leaveType"].ToString(), dsLeave.Tables[0].Rows[0]["approveType"].ToString(), true, false, dtAttendance);
                                }
                            }
                        }
                        else
                        {
                            _para = new SqlParameter[1];
                            _para[0] = new SqlParameter("@Date", strDate);
                            DataSet dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetEmpHolidayListForDate, _para);

                            if ((dsHoliDay != null) && (dsHoliDay.Tables.Count > 0) && (dsHoliDay.Tables[0].Rows.Count > 0) && (dsHoliDay.Tables[0].Columns.Contains("holidayName") == true))
                            {
                                IsHolyDay = true;

                                dtAttendance = getMonthAttendanaceRecord(strDate, UserId, false, "", dsHoliDay.Tables[0].Rows[0]["holidayName"].ToString(), false, false, dtAttendance);
                            }
                            else
                            {
                                _para = new SqlParameter[1];
                                _para[0] = new SqlParameter("@Date", strDate);
                                dsHoliDay = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetHolidayForDate, _para);

                                if ((dsHoliDay != null) && (dsHoliDay.Tables.Count > 0) && (dsHoliDay.Tables[0].Rows.Count > 0) && (dsHoliDay.Tables[0].Columns.Contains("holidayName") == true))
                                {
                                    IsHolyDay = true;
                                    dtAttendance = getMonthAttendanaceRecord(strDate, UserId, false, "", dsHoliDay.Tables[0].Rows[0]["holidayName"].ToString(), false, false, dtAttendance);
                                }
                                else
                                {
                                    dtAttendance = getMonthAttendanaceRecord(strDate, UserId, false, "", "", true, false, dtAttendance);
                                }
                            }
                            dsLeave = null;
                            dsHoliDay = null;
                        }
                    }

                    dsNWD = null;

                    string strTotal_hr = dtAttendance.Rows[i]["Total_Hr"].ToString();
                    string strTotal_Worksheet_hr = dtAttendance.Rows[i]["TotalWorksheet_Hr"].ToString();
                    TimeSpan TotalWorkSheetHr = new TimeSpan();
                    TimeSpan totalWorkingHr = new TimeSpan();
                    TimeSpan Below = new TimeSpan(1, 0, 0);
                    TimeSpan Above = new TimeSpan(0, 30, 0);
                    String[] StrWorksheetHrTemp = strTotal_Worksheet_hr.Split(':');
                    String[] StrWorkingHr = strTotal_hr.Split(':');
                    bool isIncorrect = false;
                    if (strTotal_hr != null && strTotal_hr != "" && strTotal_Worksheet_hr == "")
                    {
                        isIncorrect = true;
                    }
                    //isIncorrect = strTotal_hr.Contains("-");
                    if ((!isIncorrect) && (strTotal_Worksheet_hr != ""))
                    {
                        if (StrWorksheetHrTemp.Length > 2)
                        {
                            if (StrWorksheetHrTemp[1].Length < 2)
                            {
                                StrWorksheetHrTemp[1] = StrWorksheetHrTemp[1] + "0";
                            }

                            TotalWorkSheetHr = new TimeSpan(Convert.ToInt32(StrWorksheetHrTemp[0]), Convert.ToInt32(StrWorksheetHrTemp[1]), 0);
                            if (StrWorkingHr.Length > 1)
                            {
                                totalWorkingHr = new TimeSpan(Convert.ToInt32(StrWorkingHr[0]), Convert.ToInt32(StrWorkingHr[1]), 0);
                            }
                            else
                            {
                                totalWorkingHr = new TimeSpan(0, 0, 0);
                            }

                            if (totalWorkingHr <= TotalWorkSheetHr)
                            {
                                if ((TotalWorkSheetHr - totalWorkingHr) > Above)
                                {
                                    dtAttendance.Rows[i]["color"] = "0x3f9dd6";
                                }
                                else
                                {
                                    dtAttendance.Rows[i]["color"] = "0xFFFFFF";
                                }
                            }
                            else if (TotalWorkSheetHr < totalWorkingHr)
                            {
                                if ((totalWorkingHr - TotalWorkSheetHr) > Below)
                                {
                                    dtAttendance.Rows[i]["color"] = "0xD6CF2B";
                                }
                                else
                                {
                                    dtAttendance.Rows[i]["color"] = "0xFFFFFF";
                                }
                            }
                            else
                            {
                                dtAttendance.Rows[i]["color"] = "0x77797A";
                            }
                        }
                        else
                        {
                            dtAttendance.Rows[i]["color"] = "0xFFFFFF";
                        }
                    }
                    else
                    {
                        dtAttendance.Rows[i]["TotalWorksheet_Hr"] = "";
                        if (IsNWD)
                        {
                            dtAttendance.Rows[i]["color"] = "0x3C7E1A";
                        }
                        else if (IsHolyDay)
                        {
                            dtAttendance.Rows[i]["color"] = "0x73334B";
                        }
                        else if (isIncorrect)
                        {
                            dtAttendance.Rows[i]["color"] = "0xFF0000";
                        }
                        else if (IsLeave)
                        {
                            if (strLeaveType == "CL")
                            {
                                dtAttendance.Rows[i]["color"] = "0x47D447";
                            }
                            else if (strLeaveType == "SL")
                            {
                                dtAttendance.Rows[i]["color"] = "0xFB643E";
                            }
                            else if (strLeaveType == "UnPaid")
                            {
                                dtAttendance.Rows[i]["color"] = "0x3595D1";
                            }
                            else if (strLeaveType == "CO")
                            {
                                dtAttendance.Rows[i]["color"] = "0xC2C239";
                            }
                            if (strApproveType == "AUPL/FL")
                            {
                                dtAttendance.Rows[i]["color"] = "0xE48701";
                            }
                            else if (strApproveType == "UUPL")
                            {
                                dtAttendance.Rows[i]["color"] = "0xAAFFAA";
                            }
                        }
                        else
                        {
                            dtAttendance.Rows[i]["color"] = "0x77797A";
                        }
                    }
                    dtAttendance.Rows[i]["Employee_Name"] = strEmployeeName;

                    startDate = startDate.AddDays(1);
                    strTotal_hr = "";
                    strTotal_Worksheet_hr = "";
                }
            }
            catch (Exception ex)
            {
                string lineNum = ex.StackTrace.Substring(ex.StackTrace.Length - 10, 10);

                throw new Exception(ex.Message.ToString());
            }
            return dtAttendance;

        }
        protected DataTable getMonthAttendanaceRecord(string date, string empID, Boolean halfLeave, string leaveType, string approveType, Boolean checkHrs, Boolean TwoHalfLeaveSameDay, DataTable dtAttendance)
        {
            //ProcCalTotalAttendanceReport => This is the SP which can be called to remove logic below.
            DataRow dr;
            try
            {
                #region New Changes
                //DateTime getdaterecord = Convert.ToDateTime(date, provider);
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter("@EmployeeID", empID);
                sqlParameters[1] = new SqlParameter("@Date", date);
                DataSet dsTemp = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetMonthAttendanaceRecord, sqlParameters);

                if (dsTemp.Tables.Count > 0 && dsTemp.Tables[0].Rows.Count > 0)
                {
                    dr = dtAttendance.NewRow();
                    dr["Employee_Id"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString() : "";
                    dr["Employee_Name"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString() : "";
                    dr["Date"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["Date"].ToString()) ? dsTemp.Tables[0].Rows[0]["Date"].ToString() : "";

                    if (!String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()))
                    {
                        dr["InId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTimeID"].ToString() : "";
                        dr["In_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTIme"].ToString() : "";
                        if (dr["InId"].ToString() != "")
                        {
                            int intPunchInID = Convert.ToInt32(dr["InId"]);
                            SqlParameter[] _para = new SqlParameter[1];
                            _para[0] = new SqlParameter("PunchInId", intPunchInID);
                            DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetActualEntryTimeAndGraceForPunchInId, _para);

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


                                    DateTime dtGetDate = Convert.ToDateTime(date);
                                    strGrace = ds.Tables[0].Rows[0]["grace"].ToString();
                                    tsgrace = new TimeSpan(0, Convert.ToInt32(strGrace), 0);

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

                        //dr["TotalWorksheet_Hr"] = tsWorksheetHours.ToString();
                        dr["TotalWorksheet_Hr"] = strWorksheetHours.ToString();

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
                                    if (approveType.Split('/')[0] == "Official Trip")
                                    {
                                        dr["status"] = "OnTrip" + "/" + leaveType;
                                    }
                                    else
                                    {
                                        dr["status"] = approveType;
                                    }
                                }
                            }
                            else
                            {
                                dr["status"] = "Present";
                            }
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

                        dr["Other_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString() : ""; ;
                        dr["Total_Hr"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString() : "";



                        string strTotalOfficeTime = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString() : "";


                        TimeSpan tsTotalOfficeTime = new TimeSpan();
                        if (dr["Total_Hr"].ToString() != "")
                        {
                            string[] arrTotalOfficeTime = dr["Total_Hr"].ToString().Split(':');
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
                            TimeSpan temp = new TimeSpan(4, 15, 0);   // for working Hrs...
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
                            TimeSpan temp = new TimeSpan(8, 30, 0);   // for working Hrs...
                            if (checkHrs && IsInOffice == false && IsInBreak == false && IsInLunch == false)
                            {
                                if (tsTotalOfficeTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "T";
                                }

                                temp = new TimeSpan(9, 30, 0);    // for Total Hrs...
                                if (tsTotalWorkingTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "O";
                                }
                            }
                            //Created by Darshan 14/03/2011...
                            //This If Condition Check which not Apply Leave Application
                            //and taken Half Leave so Status will be change if less then 2 hours then "UUPL"
                            // or Less then 7 hours then "0.5/UUPL"
                            if (!IsInOffice && !IsInLunch && !IsInBreak)
                            {
                                temp = new TimeSpan(7, 0, 0);
                                if (tsTotalOfficeTime < temp)
                                {
                                    temp = new TimeSpan(2, 0, 0);
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

                        dr["TotalId"] = "0";
                        if (dr["OutId"].ToString() == "")
                        {
                            dr["Total_Hr"] = "";
                        }
                        if (String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OtherTimeID"].ToString()))
                        {
                            dr["Other_Time"] = "";
                        }
                        if (dr["In_Time"].ToString() != "")
                        {
                            dr["In_Time"] = Convert.ToDateTime(dr["In_Time"].ToString()).ToString("hh:mm:ss");
                        }
                        if (dr["Out_Time"].ToString() != "")
                        {
                            dr["Out_Time"] = Convert.ToDateTime(dr["Out_Time"].ToString()).ToString("hh:mm:ss");
                        }
                    }
                    else
                    {
                        if (checkHrs)
                        {
                            if (TwoHalfLeaveSameDay)
                            {
                                //OldNew//dr["status"] = approveType;
                                if (String.Compare(approveType, "UUPL", true) == 0)
                                {
                                    dr["status"] = approveType + "/" + leaveType;
                                }
                                else
                                {
                                    if (approveType.Split('/')[0] == "Official Trip")
                                    {
                                        dr["status"] = "OnTrip" + "/" + leaveType;
                                    }
                                    else
                                    {
                                        dr["status"] = approveType;
                                    }
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
                            if (approveType.Split('/')[0] == "Official Trip")
                            {
                                dr["status"] = "OnTrip/FL";
                            }
                            else
                            {
                                dr["status"] = approveType;
                            }
                        }
                        dr["In_Time"] = "";
                        dr["InId"] = "";
                        dr["Out_Time"] = "";
                        dr["OutId"] = "";
                        dr["LunchOut_Time"] = "";
                        dr["LunchIn_Time"] = "";
                        dr["Other_Time"] = "";
                        dr["Total_Hr"] = "";
                        dr["diff"] = "";
                        dr["TotalId"] = "";
                    }
                    dtAttendance.Rows.Add(dr);
                }
                #endregion
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return dtAttendance;
        }
        /***************** End ******************/

        public DataTable GetLeaveDetailsByDate(int UserID, string strDate)
        {
            //ProcGetLeaveDetailsByDate => This is the SP which can be called to remove logic below.

            DataTable dt = new DataTable();
            dt.Columns.Add("leaveDuration", Type.GetType("System.String"));
            dt.Columns.Add("leaveType", Type.GetType("System.String"));
            dt.Columns.Add("approveType", Type.GetType("System.String"));
            dt.Columns.Add("shortLeaveType", Type.GetType("System.String"));

            SqlParameter[] sqlParameters = new SqlParameter[2];
            sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserID);
            sqlParameters[1] = new SqlParameter("@StrDate", strDate);
            DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                DataRow dr = dt.NewRow();
                int CalendarDays = Convert.ToInt32(ds.Tables[0].Rows[0]["CalendarDays"].ToString());
                dr["shortLeaveType"] = ds.Tables[0].Rows[0]["LeaveStatus"].ToString();

                if (CalendarDays == 0)
                {
                    if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsFullDay"]))
                    {
                        dr["leaveDuration"] = "Full";
                        dr["leaveType"] = "FL";
                    }
                    else if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsFirstHalf"]))
                    {
                        dr["leaveDuration"] = "FirstHalf";
                        dr["leaveType"] = "FH";
                    }
                    else if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsSecondHalf"]))
                    {
                        dr["leaveDuration"] = "SecondHalf";
                        dr["leaveType"] = "SH";
                    }
                }
                else
                {
                    DateTime dtFrom = Convert.ToDateTime(ds.Tables[0].Rows[0]["FromDate"].ToString());
                    DateTime dtTo = Convert.ToDateTime(ds.Tables[0].Rows[0]["ToDate"].ToString());
                    DateTime dtCurr = DateTime.ParseExact(strDate, "yyyyMMdd", System.Globalization.CultureInfo.InvariantCulture);
                    if (dtCurr == dtFrom)
                    {
                        if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsFullDay"]))
                        {
                            dr["leaveDuration"] = "Full";
                            dr["leaveType"] = "FL";
                        }
                        else if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsSecondHalf"]))
                        {
                            dr["leaveDuration"] = "SecondHalf";
                            dr["leaveType"] = "SH";
                        }
                    }
                    else if (dtCurr == dtTo)
                    {
                        if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsFullDay"]))
                        {
                            dr["leaveDuration"] = "Full";
                            dr["leaveType"] = "FL";
                        }
                        else if (Convert.ToBoolean(ds.Tables[0].Rows[0]["IsFirstHalf"]))
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
        #endregion

        #region Worksheet
        //blworksheet

        public DataTable GetMonthWorkSheetReport()
        {
            //procGetLeaveFormDetail => this is the sp which can be called to remove logic below.
            //procGetNWDHistoryForEmpForDate => this is the sp which can be called to remove logic below.
            //ProcCalTotalAttendanceReport => this is the sp which can be called to remove logic below.
            //procGetEmpLeaveLedgerForDate => this is the sp which can be called to remove logic below.
            //ProcGetLeaveDetailsByDate => this is the sp which can be called to remove logic below.

            Int32 userid = 21;
            string strmonthstartdate = "2015-06-01";
            string strmonthenddate = "2015-06-07";
            DataSet dsresult = new DataSet();
            DataTable dtattendance = new DataTable("attendance");
            DateTime startdate = DateTime.Now;
            DateTime enddate = DateTime.Now;
            try
            {
                SqlParameter[] _para = new SqlParameter[2];
                _para = new SqlParameter[2];
                _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, userid);
                _para[1] = new SqlParameter("@Date", startdate.ToString("yyyymmdd"));
                DataSet dstripleave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);

                dtattendance.Columns.Add("employee_name", Type.GetType("system.string"));
                dtattendance.Columns.Add("employee_id", Type.GetType("system.string"));
                dtattendance.Columns.Add("date", Type.GetType("system.string"));
                dtattendance.Columns.Add("in_time", Type.GetType("system.string"));
                dtattendance.Columns.Add("out_time", Type.GetType("system.string"));
                dtattendance.Columns.Add("lunchout_time", Type.GetType("system.string"));
                dtattendance.Columns.Add("lunchin_time", Type.GetType("system.string"));
                dtattendance.Columns.Add("other_time", Type.GetType("system.string"));
                dtattendance.Columns.Add("total_hr", Type.GetType("system.string"));
                dtattendance.Columns.Add("totalworksheet_hr", Type.GetType("system.string"));
                dtattendance.Columns.Add("diff", Type.GetType("system.string"));
                dtattendance.Columns.Add("status", Type.GetType("system.string"));
                dtattendance.Columns.Add("inid", Type.GetType("system.string"));
                dtattendance.Columns.Add("outid", Type.GetType("system.string"));
                dtattendance.Columns.Add("lunchoutid", Type.GetType("system.string"));
                dtattendance.Columns.Add("lunchinid", Type.GetType("system.string"));
                dtattendance.Columns.Add("otherid", Type.GetType("system.string"));
                dtattendance.Columns.Add("totalid", Type.GetType("system.string"));
                dtattendance.Columns.Add("color", Type.GetType("system.string"));
                dtattendance.Columns.Add("year", Type.GetType("system.string"));
                dtattendance.Columns.Add("month", Type.GetType("system.string"));
                dtattendance.Columns.Add("todaydate", Type.GetType("system.string"));
                dtattendance.Columns.Add("fulldate", Type.GetType("system.string"));

                startdate = convertStrToDate(strmonthstartdate);
                enddate = convertStrToDate(strmonthenddate);

                TimeSpan tsdays = enddate - startdate;
                int totaldays = tsdays.Days + 1;

                bool isnwd = false;
                bool isholyday = false;
                bool isleave = false;
                bool isontrip = false;
                string strleavetype = "";
                string strApproveType = "";

                for (int i = 0; i < totaldays; i++)
                {
                    string strdate = startdate.ToString("yyyy-mm-dd");

                    string[] arrdate = strdate.Split('/');
                    _para = new SqlParameter[2];
                    _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, userid);
                    _para[1] = new SqlParameter("@Date", startdate.ToString("yyyymmdd"));


                    DataSet dsnwd = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);

                    isnwd = false;

                    isholyday = false;
                    isleave = false;
                    isontrip = false;
                    strleavetype = "";


                    if (dsnwd != null && dsnwd.Tables.Count > 0 && dsnwd.Tables[0].Rows.Count > 0)
                    {
                        isnwd = true;


                        if (dstripleave != null && dstripleave.Tables.Count > 0 && dstripleave.Tables[0].Rows.Count > 0)
                        {
                            strApproveType = "ontrip/" + dsnwd.Tables[0].Rows[0]["leavetype"].ToString();
                            isontrip = true;
                        }
                        else
                        {
                            strApproveType = "nwd/" + dsnwd.Tables[0].Rows[0]["leavetype"].ToString();

                        }
                        dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", strApproveType, false, false, dtattendance);
                    }
                    else
                    {

                        _para = new SqlParameter[2];
                        _para[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, userid);
                        _para[1] = new SqlParameter("@Date", startdate.ToString("yyyymmdd"));
                        DataSet dsleave = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);

                        if (dsleave == null || dsleave.Tables[0].Rows.Count == 0)
                        {
                            DataTable dt = GetLeaveDetailsByDate(Convert.ToInt32(userid), startdate.ToString("yyyymmdd"));
                            if (dt != null && dt.Rows.Count > 0)
                            {
                                DataRow dr = dsleave.Tables[0].NewRow();
                                dr["leaveduration"] = dt.Rows[0]["leaveduration"].ToString();
                                dr["leavetype"] = dt.Rows[0]["leavetype"].ToString();
                                dr["approvetype"] = dt.Rows[0]["approvetype"].ToString();
                                dr["shortleavetype"] = dt.Rows[0]["shortleavetype"].ToString();
                                dsleave.Tables[0].Rows.Add(dr);
                            }
                        }

                        if (dsleave != null && dsleave.Tables.Count > 0 && dsleave.Tables[0].Rows.Count > 0)
                        {
                            isleave = true;
                            if (dsleave.Tables[0].Columns.Contains("shortleavetype") == true && dsleave.Tables[0].Columns.Contains("approvetype") == true)
                            {
                                strleavetype = dsleave.Tables[0].Rows[0]["shortleavetype"].ToString();
                                strApproveType = dsleave.Tables[0].Rows[0]["approvetype"].ToString();
                            }
                            if (dsleave.Tables[0].Rows[0]["leaveduration"].ToString() == "full")
                            {
                                //new change..

                                dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", dsleave.Tables[0].Rows[0]["approvetype"].ToString(), false, false, dtattendance);
                            }
                            else
                            {
                                if (dsleave.Tables[0].Rows.Count > 1)
                                {
                                    string strapprovetypename = dsleave.Tables[0].Rows[0]["approvetype"].ToString() + " , " + dsleave.Tables[0].Rows[1]["approvetype"].ToString();
                                    dtattendance = getMonthWorksheetRecord(strdate, userid, true, dsleave.Tables[0].Rows[0]["leavetype"].ToString(), strapprovetypename, true, true, dtattendance);
                                }
                                else
                                {
                                    dtattendance = getMonthWorksheetRecord(strdate, userid, true, dsleave.Tables[0].Rows[0]["leavetype"].ToString(), dsleave.Tables[0].Rows[0]["approvetype"].ToString(), true, false, dtattendance);
                                }
                            }
                        }
                        else
                        {
                            _para = new SqlParameter[1];
                            _para[0] = new SqlParameter("@Date", strdate);
                            DataSet dsholiday = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);
                            if (dsholiday != null && dsholiday.Tables.Count > 0 && dsholiday.Tables[0].Rows.Count > 0)
                            {
                                isholyday = true;

                                if (dstripleave != null && dstripleave.Tables.Count > 0 && dstripleave.Tables[0].Rows.Count > 0)
                                {
                                    isontrip = true;
                                    dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", "ontrip/" + dsnwd.Tables[0].Rows[0]["leavetype"].ToString(), false, false, dtattendance);
                                }
                                else
                                {
                                    dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", dsholiday.Tables[0].Rows[0]["holidayname"].ToString(), false, false, dtattendance);
                                }
                            }
                            else
                            {
                                _para = new SqlParameter[1];
                                _para[0] = new SqlParameter("@Date", strdate);
                                dsholiday = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);

                                if (dsholiday != null && dsholiday.Tables.Count > 0 && dsholiday.Tables[0].Rows.Count > 0)
                                {
                                    isholyday = true;
                                    if (dstripleave != null && dstripleave.Tables.Count > 0 && dstripleave.Tables[0].Rows.Count > 0)
                                    {
                                        isontrip = true;
                                        dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", "ontrip/" + dsnwd.Tables[0].Rows[0]["leavetype"].ToString(), false, false, dtattendance);
                                    }
                                    else
                                    {
                                        dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", dsholiday.Tables[0].Rows[0]["holidayname"].ToString(), false, false, dtattendance);
                                    }
                                }
                                else
                                {
                                    dtattendance = getMonthWorksheetRecord(strdate, userid, false, "", "", true, false, dtattendance);
                                }
                            }
                        }
                    }


                    string strtotal_hr = dtattendance.Rows[i]["total_hr"].ToString();
                    string strtotal_worksheet_hr = dtattendance.Rows[i]["totalworksheet_hr"].ToString();
                    TimeSpan totalworksheethr = new TimeSpan();
                    TimeSpan totalworkinghr = new TimeSpan();
                    TimeSpan below = new TimeSpan(1, 0, 0);
                    TimeSpan above = new TimeSpan(0, 30, 0);
                    string[] strworksheethrtemp = strtotal_worksheet_hr.Split(':');
                    string[] strworkinghr = strtotal_hr.Split(':');
                    bool isincorrect = false;
                    if (strtotal_hr != null && strtotal_hr != "" && strtotal_worksheet_hr == "")
                    {
                        isincorrect = true;
                    }
                    if ((!isincorrect) && (strtotal_worksheet_hr != ""))
                    {
                        if (strworksheethrtemp.Length > 1)
                        {
                            if (strworksheethrtemp[1].Length < 2)
                            {
                                strworksheethrtemp[1] = strworksheethrtemp[1] + "0";
                            }

                            totalworksheethr = new TimeSpan(Convert.ToInt32(strworksheethrtemp[0]), Convert.ToInt32(strworksheethrtemp[1]), 0);
                            if (strworkinghr.Length > 1)
                            {
                                totalworkinghr = new TimeSpan(Convert.ToInt32(strworkinghr[0]), Convert.ToInt32(strworkinghr[1]), 0);
                            }
                            else
                            {
                                totalworkinghr = new TimeSpan(0, 0, 0);
                            }

                            if (totalworkinghr <= totalworksheethr)
                            {
                                if ((totalworksheethr - totalworkinghr) > above)
                                {
                                    dtattendance.Rows[i]["color"] = "0x3f9dd6";
                                }
                                else
                                {
                                    dtattendance.Rows[i]["color"] = "0xffffff";
                                }
                            }
                            else if (totalworksheethr < totalworkinghr)
                            {
                                if ((totalworkinghr - totalworksheethr) > below)
                                {
                                    dtattendance.Rows[i]["color"] = "0xd6cf2b";
                                }
                                else
                                {
                                    dtattendance.Rows[i]["color"] = "0xffffff";
                                }
                            }
                            else
                            {
                                dtattendance.Rows[i]["color"] = "0x77797a";
                            }
                        }
                        else
                        {
                            dtattendance.Rows[i]["color"] = "0xffffff";
                        }
                    }
                    else
                    {
                        dtattendance.Rows[i]["totalworksheet_hr"] = "";
                        if (isnwd)
                        {
                            if (isontrip)
                            {
                                dtattendance.Rows[i]["color"] = "0x3399cc";
                            }
                            else
                            {
                                dtattendance.Rows[i]["color"] = "0x3c7e1a";
                            }
                        }
                        else if (isholyday)
                        {
                            if (isontrip)
                            {
                                dtattendance.Rows[i]["color"] = "0x3399cc";
                            }
                            else
                            {
                                dtattendance.Rows[i]["color"] = "0x73334b";
                            }
                        }
                        else if (isincorrect)
                        {
                            dtattendance.Rows[i]["color"] = "0xff0000";
                        }
                        else if (isleave)
                        {
                            if (strleavetype == "cl")
                            {
                                dtattendance.Rows[i]["color"] = "0x47d447";
                            }
                            else if (strleavetype == "sl")
                            {
                                dtattendance.Rows[i]["color"] = "0xfb643e";
                            }
                            else if (strleavetype == "aupl")
                            {
                                dtattendance.Rows[i]["color"] = "0xe48701";
                            }
                            else if (strleavetype == "uupl")
                            {
                                dtattendance.Rows[i]["color"] = "0xaaffaa";
                            }
                            if (strApproveType == "aupl")
                            {
                                dtattendance.Rows[i]["color"] = "0xe48701";
                            }
                            else if (strApproveType == "uupl")
                            {
                                dtattendance.Rows[i]["color"] = "0xaaffaa";
                            }
                            else if (strApproveType == "uupl/fl")
                            {
                                dtattendance.Rows[i]["color"] = "0xaaffaa";
                            }
                            else if (strApproveType == "official trip/fl")
                            {
                                dtattendance.Rows[i]["color"] = "0x3399cc";
                            }

                        }
                        else
                        {
                            dtattendance.Rows[i]["color"] = "0xffffff";
                        }
                    }
                    dtattendance.Rows[i]["todaydate"] = startdate.Day.ToString();
                    dtattendance.Rows[i]["month"] = (startdate.Month - 1).ToString();
                    dtattendance.Rows[i]["year"] = (startdate.Year).ToString(); ;
                    dtattendance.Rows[i]["fulldate"] = "";

                    startdate = startdate.AddDays(1);
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            finally
            {
                //connobj.closeconn();
            }
            return dtattendance;

        }

        protected DataTable getMonthWorksheetRecord(string date, Int32 empID, Boolean halfLeave, string leaveType, string approveType, Boolean checkHrs, Boolean TwoHalfLeaveSameDay, DataTable dtAttendance)
        {
            // ProcCalTotalAttendanceReport  =>  This is the SP which can be called to remove logic below.
            DataRow dr;

            try
            {
                #region New Changes
                //DateTime getDateRecord = Convert.ToDateTime(date, provider);
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter("@EmployeeID", empID);
                sqlParameters[1] = new SqlParameter("@Date", date);
                DataSet dsTemp = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                if (dsTemp.Tables.Count > 0 && dsTemp.Tables[0].Rows.Count > 0)
                {
                    dr = dtAttendance.NewRow();
                    dr["Employee_Id"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeID"].ToString() : "";
                    dr["Employee_Name"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString()) ? dsTemp.Tables[0].Rows[0]["EmployeeName"].ToString() : "";
                    dr["Date"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["Date"].ToString()) ? dsTemp.Tables[0].Rows[0]["Date"].ToString() : "";

                    if (!String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()))
                    {

                        dr["InId"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTimeID"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTimeID"].ToString() : "";
                        dr["In_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["InTIme"].ToString()) ? dsTemp.Tables[0].Rows[0]["InTIme"].ToString() : "";
                        if (dr["InId"].ToString() != "")
                        {
                            int intPunchInID = Convert.ToInt32(dr["InId"]);

                            SqlParameter[] _para = new SqlParameter[1];
                            _para[0] = new SqlParameter("PunchInId", intPunchInID);
                            DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, _para);
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

                                    DateTime dtGetDate = Convert.ToDateTime(date);
                                    strGrace = ds.Tables[0].Rows[0]["grace"].ToString();
                                    tsgrace = new TimeSpan(0, Convert.ToInt32(strGrace), 0);

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
                                dr["status"] = "Present";
                            }
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

                        dr["Other_Time"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOtherTime"].ToString() : ""; ;
                        dr["Total_Hr"] = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalWorkingTime"].ToString() : "";

                        string strTotalOfficeTime = !String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString()) ? dsTemp.Tables[0].Rows[0]["TotalOfficeTime"].ToString() : "";

                        TimeSpan tsTotalOfficeTime = new TimeSpan();
                        if (dr["Total_Hr"].ToString() != "")
                        {
                            string[] arrTotalOfficeTime = dr["Total_Hr"].ToString().Split(':');
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
                            TimeSpan temp = new TimeSpan(4, 15, 0);   // for working Hrs...
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
                            TimeSpan temp = new TimeSpan(8, 30, 0);   // for working Hrs...
                            if (checkHrs && IsInOffice == false && IsInBreak == false && IsInLunch == false)
                            {
                                if (tsTotalOfficeTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "T";
                                }

                                temp = new TimeSpan(9, 30, 0);    // for Total Hrs...
                                if (tsTotalWorkingTime < temp)
                                {
                                    dr["diff"] = dr["diff"].ToString() + "O";
                                }
                            }
                            //Created by Darshan 14/03/2011...
                            //This If Condition Check which not Apply Leave Application
                            //and taken Half Leave so Status will be change if less then 2 hours then "UUPL"
                            // or Less then 7 hours then "0.5/UUPL"
                            if (!IsInOffice && !IsInLunch && !IsInBreak)
                            {
                                temp = new TimeSpan(7, 0, 0);
                                if (tsTotalOfficeTime < temp)
                                {
                                    temp = new TimeSpan(2, 0, 0);
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

                        dr["TotalId"] = "0";
                        if (dr["OutId"].ToString() == "")
                        {
                            dr["Total_Hr"] = "";
                        }
                        if (String.IsNullOrEmpty(dsTemp.Tables[0].Rows[0]["OtherTimeID"].ToString()))
                        {
                            dr["Other_Time"] = "";
                        }
                        if (dr["In_Time"].ToString() != "")
                        {
                            dr["In_Time"] = Convert.ToDateTime(dr["In_Time"].ToString()).ToString("hh:mm:ss");
                        }
                        if (dr["Out_Time"].ToString() != "")
                        {
                            dr["Out_Time"] = Convert.ToDateTime(dr["Out_Time"].ToString()).ToString("hh:mm:ss");
                        }
                    }
                    else
                    {
                        if (checkHrs)
                        {
                            if (TwoHalfLeaveSameDay)
                            {
                                //OldNew//dr["status"] = approveType;
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
                            if (approveType.Split('/')[0] == "Official Trip")
                            {
                                dr["status"] = "OnTrip/FL";
                            }
                            else
                            {
                                dr["status"] = approveType;
                            }
                        }
                        dr["In_Time"] = "";
                        dr["InId"] = "";
                        dr["Out_Time"] = "";
                        dr["OutId"] = "";
                        dr["LunchOut_Time"] = "";
                        dr["LunchIn_Time"] = "";
                        dr["Other_Time"] = "";
                        dr["Total_Hr"] = "";
                        dr["diff"] = "";
                        dr["TotalId"] = "";

                    }
                    dtAttendance.Rows.Add(dr);
                }
                #endregion
            }
            catch (Exception ex)
            {

                throw new Exception(ex.ToString());
            }

            return dtAttendance;
        }


        public DataSet GetWorksheetDetailsReport(int UserId, string strStartDate, string strEndDate)
        {
            // ProcGetWorksheetDetailsReport =>  This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[3];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@StartDate", strStartDate);
                sqlParameters[2] = new SqlParameter("@EndDate", strEndDate);
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetWorksheetDetailsReport, sqlParameters);
                if (ds != null && ds.Tables.Count > 0)
                {
                    return ds;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        public DataTable GetProjectNameByUserId(int UserId)
        {
            // ProcGetProjectNameByUserId => This is the SP which can be called to remove logic below.
            DataTable dt = new DataTable();
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetProjectNameByUserId, sqlParameters);
                if (ds != null && ds.Tables.Count > 0)
                {
                    dt = ds.Tables[0];
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return dt;
        }
        #endregion

        #region Leave

        //BLLeave

        public DataSet LeaveReportById(string userId, int year)
        {

            DataSet dsResult = new DataSet("Dataset");

            DataTable dtResult = new DataTable();
            dtResult.Columns.Add("MonthNumber", Type.GetType("System.Int32"));
            dtResult.Columns.Add("Month", Type.GetType("System.String"));
            dtResult.Columns.Add("CL", Type.GetType("System.String"));
            dtResult.Columns.Add("SL", Type.GetType("System.String"));
            dtResult.Columns.Add("OnTrip", Type.GetType("System.String"));
            dtResult.Columns.Add("AUPL", Type.GetType("System.String"));
            dtResult.Columns.Add("UUPL", Type.GetType("System.String"));
            dtResult.Columns.Add("PendingLeave", Type.GetType("System.String"));
            dtResult.Columns.Add("Total", Type.GetType("System.String"));

            try
            {
                int count = 1;
                for (int i = 0; i < 12; i++)
                {
                    DateTime dtStart = new DateTime(year, count, 01);
                    DateTime dtEnd = LastDayOfMonthFromDateTime(dtStart);
                    DataRow dr = dtResult.NewRow();
                    dr["MonthNumber"] = count;
                    dr["Month"] = getMonthName(count);
                    if (year > 2012)
                    {
                        DataTable dt = GetLeaveSummary_New(userId, "User", "CL", dtStart, dtEnd);
                        dr["CL"] = dt.Rows[0]["TotalCL"].ToString();
                        dr["SL"] = dt.Rows[0]["TotalSL"].ToString();
                        dr["AUPL"] = dt.Rows[0]["TotalAUPL"].ToString();
                        dr["UUPL"] = dt.Rows[0]["TotalUUPL"].ToString();
                        dr["OnTrip"] = "0";
                        dr["PendingLeave"] = dt.Rows[0]["TotalPending"].ToString();
                    }
                    else
                    {
                        dr["CL"] = GetLeaveSummary(userId, "CL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), true);
                        dr["SL"] = GetLeaveSummary(userId, "SL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), true);
                        dr["AUPL"] = GetLeaveSummary(userId, "AUPL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), true);
                        dr["UUPL"] = GetLeaveSummary(userId, "UUPL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), true);

                        double PendingCL = GetLeaveSummary(userId, "CL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), false);
                        double PendingSL = GetLeaveSummary(userId, "SL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), false);
                        double PendingAUPL = GetLeaveSummary(userId, "AUPL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), false);
                        double PendingUUPL = GetLeaveSummary(userId, "UUPL", Convert.ToString(dtStart.ToString("yyyyMMdd")), Convert.ToString(dtEnd.ToString("yyyyMMdd")), false);
                        dr["PendingLeave"] = PendingCL + PendingSL + PendingAUPL + PendingUUPL;
                    }
                    dr["Total"] = Convert.ToDouble(dr["CL"]) + Convert.ToDouble(dr["SL"]) + Convert.ToDouble(dr["AUPL"]) + Convert.ToDouble(dr["UUPL"]) + Convert.ToDouble(dr["PendingLeave"]);
                    count += 1;
                    dtResult.Rows.Add(dr);
                }
                dtResult.TableName = "Table1";

                dsResult = new DataSet();
                dsResult.Tables.Add(dtResult);

                //dsResult.Tables[1].Merge(dtResult2);

                if (dsResult != null && dsResult.Tables.Count > 0)
                {
                    return dsResult;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        protected double GetLeaveSummary(string UserId, string LeaveType, string strStartDate, string strEndDate, bool isPendingLeave)
        {
            //procGetLeaveSummary => This is the SP which can be called to remove logic below.

            double result = 0;
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[5];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@LeaveType", LeaveType);
                sqlParameters[2] = new SqlParameter("@StartDate", strStartDate);
                sqlParameters[3] = new SqlParameter("@EndDate", strEndDate);
                sqlParameters[4] = new SqlParameter("@IsPendingLeave", isPendingLeave);
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetLeaveSummary, sqlParameters);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    result = Convert.ToDouble(ds.Tables[0].Rows[0][0].ToString());
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message.ToString());
                return 0;

            }
            return 0;
        }

        protected DataTable GetLeaveSummary_New(string UserID, string userType, string LeaveType, DateTime dtStartDate, DateTime dtEndDate)
        {
            //procGetLeaveSummary_New => This is the SP which can be called to remove logic below.
            //procGetPresentDaysBetweenDateForEmp => This is the SP which can be called to remove logic below.
            //procGetEmployeeLeaveRelatedDetailForDate => This is the SP which can be called to remove logic below.

            try
            {
                double TotalCL = 0;
                double TotalSL = 0;
                double TotalAUPL = 0;
                double TotalUUPL = 0;
                double TotalPending = 0;
                //(SELECT IsNWD FROM Leaveledger where LeaveFormID=LeaveForm.ID ) AS IsNWD,

                SqlParameter[] _para = new SqlParameter[3];
                _para[0] = new SqlParameter("@EmployeeID", UserID);
                _para[1] = new SqlParameter("@FromDate", dtStartDate);
                _para[2] = new SqlParameter("@ToDate", dtEndDate);
                _para[3] = new SqlParameter("@userType", userType);

                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetLeaveSummary_New, _para);
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    string _leaveType = "";
                    string _leaveStatus = "";
                    DateTime _dtFrom;
                    DateTime _dtTo;
                    double _balance;
                    int _leaveDays;
                    bool _isFullDays;
                    bool _isFirstHalf;
                    //   bool _isNwd;
                    bool _isSecondHalf;
                    bool _IsConfirmed;
                    DateTime _ConfirmationDate = DateTime.Now;
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        _leaveStatus = ds.Tables[0].Rows[i]["Status"].ToString();
                        if (_leaveStatus == "Approved")
                        {
                            _balance = Convert.ToDouble(ds.Tables[0].Rows[i]["Balance"].ToString());
                        }
                        else
                        {
                            _balance = 0.0;
                        }
                        _IsConfirmed = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsConfirmed"]);
                        if (_IsConfirmed)
                        {
                            _ConfirmationDate = Convert.ToDateTime(ds.Tables[0].Rows[i]["ConfirmationDate"].ToString());
                        }

                        _leaveType = ds.Tables[0].Rows[i]["LeaveType"].ToString();
                        _dtFrom = Convert.ToDateTime(ds.Tables[0].Rows[i]["FromDate"].ToString());
                        _dtTo = Convert.ToDateTime(ds.Tables[0].Rows[i]["ToDate"].ToString());

                        _leaveDays = Convert.ToInt32(ds.Tables[0].Rows[i]["LeaveDay"].ToString());
                        _isFullDays = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsFullDay"]);
                        _isFirstHalf = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsFirstHalf"]);
                        _isSecondHalf = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsSecondHalf"]);

                        SqlParameter[] _paraoneAttendance = new SqlParameter[3];
                        _paraoneAttendance[0] = new SqlParameter("@EmployeeID", UserID);
                        _paraoneAttendance[1] = new SqlParameter("@fromdate", _dtFrom);
                        _paraoneAttendance[2] = new SqlParameter("@todate", _dtTo);
                        DataSet Attendance = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetPresentDaysBetweenDateForEmp, _paraoneAttendance);
                        double leaveToBeAdded = 0;
                        leaveToBeAdded = _isFullDays ? 1.0 : 0.5;

                        if (_leaveDays == 1)
                        {
                            if (_leaveStatus == "Approved" && _balance >= 0)
                            {
                                if (_IsConfirmed && _dtFrom >= _ConfirmationDate)
                                {
                                    if (_leaveType == "CL")
                                    {
                                        TotalCL += leaveToBeAdded;
                                    }
                                    else if (_leaveType == "SL")
                                    {
                                        TotalSL += leaveToBeAdded;
                                    }
                                }
                                else
                                {
                                    TotalAUPL += leaveToBeAdded;
                                }
                            }
                            else
                            {
                                if (_leaveStatus == "Approved")
                                {

                                    TotalAUPL += leaveToBeAdded;

                                }
                                else
                                {
                                    if (_leaveStatus == "New")
                                    {
                                        TotalPending += leaveToBeAdded;
                                    }
                                    else if (_leaveStatus == "Cancel")
                                    {
                                        if (_leaveType == "CL")
                                        {
                                            TotalCL += leaveToBeAdded;
                                        }
                                        else if (_leaveType == "SL")
                                        {
                                            TotalSL += leaveToBeAdded;
                                        }
                                    }
                                    else if (_leaveStatus == "Cancel Approved")
                                    {

                                    }

                                    else if (_leaveStatus == "Rejected")
                                    {

                                        if (Convert.ToInt32(Attendance.Tables[0].Rows[0]["isPresent"]) > 0)
                                        { }
                                        else
                                        {
                                            TotalUUPL += leaveToBeAdded;
                                        }
                                    }
                                    else
                                    {
                                        TotalUUPL += leaveToBeAdded;
                                    }
                                }
                            }
                        }
                        else
                        {
                            int totalDays = Convert.ToInt32((_dtTo - _dtFrom).TotalDays + 1);
                            DateTime dtTemp = _dtFrom;

                            for (int j = 0; j < totalDays; j++)
                            {
                                if (dtTemp.Month == dtStartDate.Month && dtTemp.Month == dtEndDate.Month)
                                {

                                    SqlParameter[] _paraAttendance = new SqlParameter[2];
                                    _paraAttendance[0] = new SqlParameter("@LeaveDate", dtTemp.ToString("yyyyMMdd"));
                                    _paraAttendance[1] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserID);

                                    DataSet dsAttendance = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetEmployeeLeaveRelatedDetailForDate, _paraAttendance);
                                    if (dsAttendance != null && dsAttendance.Tables[0].Rows.Count > 0)
                                    {
                                        bool isFullDays = Convert.ToBoolean(dsAttendance.Tables[0].Rows[0]["IsFullDay"]);
                                        bool isFirstHalf = Convert.ToBoolean(dsAttendance.Tables[0].Rows[0]["IsFirstHalf"]);
                                        bool isSecondHalf = Convert.ToBoolean(dsAttendance.Tables[0].Rows[0]["IsSecondHalf"]);
                                        double balance = Convert.ToDouble(dsAttendance.Tables[0].Rows[0]["Balance"].ToString());
                                        bool IsConfirmed = Convert.ToBoolean(dsAttendance.Tables[0].Rows[0]["IsConfirmed"]);

                                        DateTime ConfirmationDate = DateTime.Now; //Convert.ToDateTime(dsAttendance.Tables[0].Rows[0]["ConfirmationDate"].ToString());
                                        if (IsConfirmed)
                                        {
                                            ConfirmationDate = Convert.ToDateTime(dsAttendance.Tables[0].Rows[0]["ConfirmationDate"].ToString());
                                        }

                                        if (Convert.ToInt32(dsAttendance.Tables[0].Rows[0]["Present"]) > 0)
                                        {
                                            //Employee Present on dtTemp Date 
                                        }
                                        else
                                        {
                                            if (_leaveStatus == "Approved" && balance >= 0)
                                            {
                                                if (isFullDays)
                                                {
                                                    if (IsConfirmed && dtTemp >= ConfirmationDate)
                                                    {
                                                        if (_leaveType == "CL")
                                                        {
                                                            TotalCL += 1;
                                                        }
                                                        else if (_leaveType == "SL")
                                                        {
                                                            TotalSL += 1;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        TotalAUPL += 1;
                                                    }
                                                }
                                                else
                                                {
                                                    if (isFirstHalf)
                                                    {
                                                        if (IsConfirmed && dtTemp >= ConfirmationDate)
                                                        {
                                                            if (_leaveType == "CL")
                                                            {
                                                                TotalCL += 0.5;
                                                            }
                                                            else if (_leaveType == "SL")
                                                            {
                                                                TotalSL += 0.5;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            TotalAUPL += 0.5;
                                                        }
                                                    }
                                                    if (isSecondHalf)
                                                    {
                                                        if (IsConfirmed && dtTemp >= ConfirmationDate)
                                                        {
                                                            if (_leaveType == "CL")
                                                            {
                                                                TotalCL += 0.5;
                                                            }
                                                            else if (_leaveType == "SL")
                                                            {
                                                                TotalSL += 0.5;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            TotalAUPL += 0.5;
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if (isFullDays)
                                                {
                                                    if (_leaveStatus == "Approved")
                                                    {
                                                        TotalAUPL += 1;
                                                    }
                                                    else if (_leaveStatus == "New")
                                                    {
                                                        TotalPending += 1;
                                                    }
                                                    else if (_leaveStatus == "Cancel")
                                                    {
                                                        if (_leaveType == "CL")
                                                        {
                                                            TotalCL += 1;
                                                        }
                                                        else if (_leaveType == "SL")
                                                        {
                                                            TotalSL += 1;
                                                        }
                                                    }
                                                    else if (_leaveStatus == "Cancel Approved") { }

                                                    else if (_leaveStatus == "Rejected")
                                                    {
                                                        if (Convert.ToInt32(Attendance.Tables[0].Rows[0]["isPresent"]) > 0)
                                                        { }
                                                        else
                                                        {
                                                            TotalUUPL += 1;
                                                        }
                                                    }

                                                    else
                                                    {
                                                        TotalUUPL += 1;
                                                    }
                                                }
                                                else
                                                {
                                                    if (isFirstHalf)
                                                    {
                                                        if (_leaveStatus == "Approved")
                                                        {
                                                            TotalAUPL += 0.5;
                                                        }
                                                        else if (_leaveStatus == "New")
                                                        {
                                                            TotalPending += 1;
                                                        }
                                                        else if (_leaveStatus == "Cancel")
                                                        {
                                                            if (_leaveType == "CL")
                                                            {
                                                                TotalCL += 1;
                                                            }
                                                            else if (_leaveType == "SL")
                                                            {
                                                                TotalSL += 1;
                                                            }
                                                        }
                                                        else if (_leaveStatus == "Cancel Approved") { }
                                                        else if (_leaveStatus == "Rejected")
                                                        {
                                                            if (Convert.ToInt32(Attendance.Tables[0].Rows[0]["isPresent"]) > 0)
                                                            { }
                                                            else
                                                            {
                                                                TotalUUPL += 0.5;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            TotalUUPL += 0.5;
                                                        }
                                                    }
                                                    if (isSecondHalf)
                                                    {
                                                        if (_leaveStatus == "Approved")
                                                        {
                                                            TotalAUPL += 0.5;
                                                        }
                                                        else if (_leaveStatus == "New")
                                                        {
                                                            TotalPending += 1;
                                                        }
                                                        else if (_leaveStatus == "Cancel")
                                                        {
                                                            if (_leaveType == "CL")
                                                            {
                                                                TotalCL += 1;
                                                            }
                                                            else if (_leaveType == "SL")
                                                            {
                                                                TotalSL += 1;
                                                            }
                                                        }
                                                        else if (_leaveStatus == "Cancel Approved") { }
                                                        else if (_leaveStatus == "Rejected")
                                                        {
                                                            if (Convert.ToInt32(Attendance.Tables[0].Rows[0]["isPresent"]) > 0)
                                                            { }
                                                            else
                                                            {
                                                                TotalUUPL += 0.5;
                                                            }
                                                        }

                                                        else
                                                        {
                                                            TotalUUPL += 0.5;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                    }
                                    else
                                    {
                                        if (_leaveDays == 1)
                                        {
                                            if (_leaveStatus == "New")
                                            {
                                                if (_isFullDays)
                                                {
                                                    TotalPending += 1;
                                                }
                                                else
                                                {
                                                    if (_isFirstHalf)
                                                    {
                                                        TotalPending += 0.5;
                                                    }
                                                    if (_isSecondHalf)
                                                    {
                                                        TotalPending += 0.5;
                                                    }
                                                }
                                            }
                                            else if (_leaveStatus == "Cancel Approved") { }
                                            else if (_leaveStatus == "Rejected")
                                            {
                                                if (Convert.ToInt32(Attendance.Tables[0].Rows[j]["isPresent"]) > 0)
                                                { }
                                                else
                                                {
                                                    if (_isFullDays)
                                                    {
                                                        TotalUUPL += 1;
                                                    }
                                                    else
                                                    {
                                                        TotalUUPL += 0.5;
                                                    }
                                                }
                                            }
                                            else
                                            {

                                                if (_isFullDays)
                                                {
                                                    TotalUUPL += 1;
                                                }
                                                else
                                                {
                                                    if (_isFirstHalf)
                                                    {
                                                        TotalUUPL += 0.5;
                                                    }
                                                    if (_isSecondHalf)
                                                    {
                                                        TotalUUPL += 0.5;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            if (dtTemp == _dtFrom)
                                            {
                                                if (_isSecondHalf)
                                                {
                                                    if (_leaveStatus == "New")
                                                    {
                                                        TotalPending += 0.5;
                                                    }
                                                    else if (_leaveStatus == "Cancel Approved") { }
                                                    else if (_leaveStatus == "Rejected")
                                                    {
                                                        if (Convert.ToInt32(Attendance.Tables[0].Rows[j]["isPresent"]) > 0)
                                                        { }
                                                        else
                                                        {
                                                            TotalUUPL += 0.5;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        TotalUUPL += 0.5;
                                                    }
                                                }
                                                else
                                                {
                                                    if (_leaveStatus == "New")
                                                    {
                                                        TotalPending += 1;
                                                    }
                                                    else if (_leaveStatus == "Cancel Approved") { }
                                                    else if (_leaveStatus == "Rejected")
                                                    {
                                                        if (Convert.ToInt32(Attendance.Tables[0].Rows[j]["isPresent"]) > 0)
                                                        { }
                                                        else
                                                        {
                                                            TotalUUPL += 1;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        TotalUUPL += 1;
                                                    }
                                                }
                                            }
                                            else if (dtTemp == _dtTo)
                                            {
                                                if (_isFirstHalf)
                                                {
                                                    if (_leaveStatus == "New")
                                                    {
                                                        TotalPending += 0.5;
                                                    }
                                                    else if (_leaveStatus == "Cancel Approved") { }
                                                    else if (_leaveStatus == "Rejected")
                                                    {
                                                        if (Convert.ToInt32(dsAttendance.Tables[0].Rows[0]["Present"]) > 0)
                                                        { }
                                                        else
                                                        {
                                                            TotalUUPL += 0.5;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        TotalUUPL += 0.5;
                                                    }
                                                }
                                                else
                                                {
                                                    if (_leaveStatus == "New")
                                                    {
                                                        TotalPending += 1;
                                                    }
                                                    else if (_leaveStatus == "Cancel Approved") { }
                                                    else if (_leaveStatus == "Rejected")
                                                    {
                                                        if (Convert.ToInt32(Attendance.Tables[0].Rows[j]["isPresent"]) > 0)
                                                        { }
                                                        else
                                                        {
                                                            TotalUUPL += 1;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        TotalUUPL += 1;
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if (_leaveStatus == "New")
                                                {
                                                    TotalPending += 1;
                                                }
                                                else if (_leaveStatus == "Cancel Approved") { }
                                                else if (_leaveStatus == "Rejected")
                                                {
                                                    if (Convert.ToInt32(Attendance.Tables[0].Rows[j]["isPresent"]) > 0)
                                                    { }
                                                    else
                                                    {
                                                        TotalUUPL += 1;
                                                    }
                                                }
                                                else
                                                {
                                                    TotalUUPL += 1;
                                                }
                                            }
                                        }

                                    }
                                }
                                dtTemp = dtTemp.AddDays(1);
                            }
                            //}
                        }
                    }
                }
                DataTable dt = new DataTable();
                dt.Columns.Add("TotalCL", Type.GetType("System.String"));
                dt.Columns.Add("TotalSL", Type.GetType("System.String"));
                dt.Columns.Add("TotalAUPL", Type.GetType("System.String"));
                dt.Columns.Add("TotalUUPL", Type.GetType("System.String"));
                dt.Columns.Add("TotalPending", Type.GetType("System.String"));
                DataRow dr = dt.NewRow();
                dr["TotalCL"] = TotalCL.ToString();
                dr["TotalSL"] = TotalSL.ToString();
                dr["TotalAUPL"] = TotalAUPL.ToString();
                dr["TotalUUPL"] = TotalUUPL.ToString();
                dr["TotalPending"] = TotalPending.ToString();
                dt.Rows.Add(dr);
                return dt;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }

        }

        public DataSet GetLeaveReportByYear(string UserId, int year, string UserType)
        {
            //ProcGetLeaveReportByYear => This is the SP which can be called to remove logic below.
            DataTable dtResult = new DataTable();
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[3];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@Year", year);
                sqlParameters[2] = new SqlParameter("@UserType", UserType);
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetLeaveReportByYear, sqlParameters);

                if (ds != null && ds.Tables.Count > 0)
                {
                    return ds;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        #endregion

        #region Allocation


        //BLAllocation

        public DataSet ProjectAllocationByUserId(Int32 UserId)
        {
            //ProcProjectAllocationByUserId => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetProjectAllocationByUserId, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        #endregion

        #region Team

        //BLMyTeam

        public DataSet MyTeamByUserId(Int32 userId, bool IsLineManager)
        {
            //ProcMyTeamByUserId => This is the SP which can be called to remove logic below.
            DataSet dsResult = new DataSet();
            DataTable dtResult = new DataTable("Table");

            dtResult.Columns.Add(new DataColumn("EmployeeId", Type.GetType("System.Int32")));
            dtResult.Columns.Add(new DataColumn("EmployeeName", Type.GetType("System.String")));
            dtResult.Columns.Add(new DataColumn("ProjectName", Type.GetType("System.String")));

            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, userId);
                sqlParameters[1] = new SqlParameter("@IsLineManager", IsLineManager);
                List<int> lstEmpIds = new List<int>();
                List<string> lstEmpNames = new List<string>();
                DataSet ds = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        if (lstEmpIds.Contains(Convert.ToInt32(ds.Tables[0].Rows[i]["EmployeeId"])) == false)
                        {
                            lstEmpIds.Add(Convert.ToInt32(ds.Tables[0].Rows[i]["EmployeeId"]));
                            lstEmpNames.Add(Convert.ToString(ds.Tables[0].Rows[i]["EmployeeName"]));
                        }
                    }
                    string strProjectName = "";

                    for (int intIndex = 0; intIndex < lstEmpIds.Count; intIndex++)
                    {
                        strProjectName = "";

                        DataRow[] dataRow = ds.Tables[0].Select("[EmployeeId] = " + Convert.ToInt32(lstEmpIds[intIndex]));
                        if (dataRow != null && dataRow.Length > 0)
                        {
                            for (int i = 0; i < dataRow.Length; i++)
                            {
                                if (strProjectName != "")
                                {
                                    strProjectName += ",";
                                }
                                strProjectName += Convert.ToString(dataRow[i]["ProjectName"]);
                            }
                        }
                        DataRow dr = dtResult.NewRow();
                        dr["EmployeeId"] = Convert.ToInt32(lstEmpIds[intIndex]);
                        dr["EmployeeName"] = Convert.ToString(lstEmpNames[intIndex]);
                        dr["ProjectName"] = strProjectName;

                        dtResult.Rows.Add(dr);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            dsResult.Tables.Add(dtResult);
            return dsResult;
        }
        #endregion

        #region Alert

        public DataSet GetAlertList(Int32 UserId, bool IsAdmin)
        {
            //ProcGetAlertList => This is the SP which can be called to remove logic below.
            DataTable dt = new DataTable();
            dt.Columns.Add(new DataColumn("Label", Type.GetType("System.String")));
            dt.Columns.Add(new DataColumn("Count", Type.GetType("System.Int32")));
            DataSet ds = new DataSet();
            try
            {
                DataRow dr = dt.NewRow();
                dr = dt.NewRow();
                dr["Label"] = "All";
                DataSet dsAlldetails = GetAllDetails(UserId, IsAdmin);
                dr["Count"] = Convert.ToInt32(dsAlldetails.Tables[0].Rows.Count);
                dt.Rows.Add(dr);

                if (IsAdmin)
                {
                    dr = dt.NewRow();
                    dr["Label"] = "Project Unplanned";
                    DataSet dsProjectUnplanned = GetProjectUnplanned();
                    dr["Count"] = Convert.ToInt32(dsProjectUnplanned.Tables[0].Rows.Count);
                    dt.Rows.Add(dr);
                }

                dr = dt.NewRow();
                dr["Label"] = "Leave Pending";
                DataSet dsPendingLeave = GetPendingLeave(UserId, IsAdmin);

                dr["Count"] = Convert.ToInt32(dsPendingLeave.Tables[0].Rows.Count);
                dt.Rows.Add(dr);

                if (IsAdmin)
                {
                    dr = dt.NewRow();
                    dr["Label"] = "Opportunity Pending";
                    DataSet dsOpportunity = GetOpportunityPending(UserId, IsAdmin);
                    dr["Count"] = Convert.ToInt32(dsOpportunity.Tables[0].Rows.Count);
                    dt.Rows.Add(dr);
                }

                if (IsAdmin)
                {
                    dr = dt.NewRow();
                    dr["Label"] = "Invoice Pending";
                    DataSet dsInvoicePending = GetInvoicePending(UserId);
                    dr["Count"] = Convert.ToInt32(dsInvoicePending.Tables[0].Rows.Count);
                    dt.Rows.Add(dr);
                }

                if (IsAdmin)
                {
                    dr = dt.NewRow();
                    dr["Label"] = "Collection Pending";
                    DataSet dsCollectionPending = GetCollectionPending(UserId);
                    dr["Count"] = Convert.ToInt32(dsCollectionPending.Tables[0].Rows.Count);
                    dt.Rows.Add(dr);
                }

                dr = dt.NewRow();
                dr["Label"] = "Appraisal Pending";
                DataSet dsAppraisalPending = GetAppraisalPending(UserId);
                dr["Count"] = dsAppraisalPending.Tables[0].Rows.Count;
                dt.Rows.Add(dr);

                dr = dt.NewRow();
                dr["Label"] = "Tickets";
                DataSet dsSuggestions = GetSuggestion(UserId, IsAdmin);
                dr["Count"] = dsSuggestions.Tables[0].Rows.Count;
                dt.Rows.Add(dr);

                dr = dt.NewRow();
                dr["Label"] = "Pending Task";
                DataSet dsPendingTask = GetPendingTask(UserId);
                dr["Count"] = dsPendingTask.Tables[0].Rows.Count;
                dt.Rows.Add(dr);

                dr = dt.NewRow();
                dr["Label"] = "Pending Signoff";
                DataSet dsPendingSignoff = GetPendingSignoff(UserId);
                dr["Count"] = dsPendingSignoff.Tables[0].Rows.Count;
                dt.Rows.Add(dr);

                ds.Tables.Add(dt);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return ds;
        }
        /********** Project Unplanned **********/

        public DataSet GetAllDetails(Int32 UserId, bool isAdmin)
        {
            //ProcGetAlertList => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@IsAdmin", isAdmin);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetAllDetails, sqlParameters);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        /********** Project Unplanned **********/

        public DataSet GetProjectUnplanned()
        {
            //fnGetProjectUnplanned  This is the Function which can be called to remove logic below.
            try
            {
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetProjectUnplanned, null);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Leave Pending **********/

        public DataSet GetPendingLeave(Int32 UserId, bool IsAdmin)
        {
            //ProcGetAlertList => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@IsAdmin", IsAdmin);
                //DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetPendingLeave, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        /********** Invoice Pending **********/

        public DataSet GetInvoicePending(Int32 UserId)
        {
            //fnGetInvoicePendingAlert => This is the Function which can be called to remove logic below.
            try
            {
                //string strQuery += " ORDER BY CONVERT(DATETIME,[MilestoneMaster].[MilestoneDate],103) DESC,[MilestoneMaster].[id] DESC ";

                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetInvoicePending, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Appraisal Unplanned **********/

        public DataSet GetAppraisalPending(Int32 UserId)
        {
            //fnGetAppraisalPendingAlert => This is the Function which can be called to remove logic below.
            try
            {
                //string strQuery = "ORDER BY [setup_appraisal].AppraisalDate DESC";
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetAppraisalPending, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Collection Pending **********/

        public DataSet GetCollectionPending(Int32 UserId)
        {
            //fnGetCollectionPendingAlert => This is the Function which can be called to remove logic below.
            try
            {
                //string strQuery = " ORDER BY CONVERT(DATETIME,InvoiceMaster.InvoiceDate,103) DESC  ";

                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetCollectionPending, sqlParameters);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Suggestions **********/

        public DataSet GetSuggestion(Int32 UserId, bool IsAdmin)
        {
            //fnGetSuggestionAlert => This is the Function which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@IsAdmin", IsAdmin);
                DataSet dsSuggestion = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetSuggestion, sqlParameters);
                if (IsAdmin)
                {
                }
                else
                {
                    //strQuery += " WHERE [Employee_Master].[id]=" + UserId
                }
                //strQuery += " ORDER BY [Suggestions].[SuggestionGivenDate] DESC";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Opportunity Pending **********/

        public DataSet GetOpportunityPending(Int32 UserId, bool IsAdmin)
        {
            //fnGetOpportunityPending => This is the FUNCTION which can be called to remove logic below.
            try
            {
                //string str = 'ORDER BY  CONVERT(DATETIME,[OpportunityMaster].[TentativeStartDate],103) DESC';
                DataSet dsOpportunityPending = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetOpportunityPending, null);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        /********** Pending Task **********/

        public DataSet GetPendingTask(Int32 UserId)
        {
            //fnGetPendingTaskAlert => This is the FUNCTION which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsPendingTask = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetPendingTask, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        /********** Pending Signoff **********/

        public DataSet GetPendingSignoff(Int32 UserId)
        {
            //WBS_GetPendingSignOffList => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter("@MgrID", UserId);
                DataSet dsPendingSignoff = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetPendingTask, sqlParameters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        #endregion  // check

        #region Skill

        public DataSet UserSkillById(Int32 UserId, bool IsApproved)
        {
            //ProcUserSkillById => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[2];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                sqlParameters[1] = new SqlParameter("@IsApproved", IsApproved);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);

                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    return dsResult;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }

        public DataSet SkillReportByUserId(Int32 UserId)
        {
            //ProcSkillReportByUserId => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[1];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, UserId);
                DataSet dsResult = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetSkillReportByUserId, sqlParameters);

                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    return dsResult;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            return null;
        }
        #endregion

        #region Common Functions
        public string GetEmployee_Name(string UserId)
        {
            // => This is the Function which can be called to remove logic below.
            string strEmployee_Name = "";
            try
            {

                strEmployee_Name = ReturnScalarValueFromFunction("select [dbo].[fnGetEmployeeNameFromId](" + UserId + ")").ToString();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString() + Environment.NewLine + ex.StackTrace);
            }
            return strEmployee_Name;
        }

        public string getEmployeeIds_LM(Int32 UserId)
        {

            object objListOfEmpForLM = ReturnScalarValueFromFunction("select [dbo].[fnGetCommaSeparatedListOfEmployeeForLM](" + UserId + ")");
            string strResult = objListOfEmpForLM == null ? string.Empty : objListOfEmpForLM.ToString();
            return strResult;
        }

        public DateTime convertStrToDate(string strDate)
        {
            DateTime dt = new DateTime();
            try
            {
                string[] strArrDate = strDate.Split('-');
                string strCurr = strArrDate[1] + "-" + strArrDate[2] + "-" + strArrDate[0] + " 00:00:00";
                dt = Convert.ToDateTime(strDate);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString() + Environment.NewLine + ex.StackTrace);
            }
            return dt;
        }

        public DateTime LastDayOfMonthFromDateTime(DateTime dateTime)
        {
            DateTime firstDayOfTheMonth = new DateTime(dateTime.Year, dateTime.Month, 1);
            return firstDayOfTheMonth.AddMonths(1).AddDays(-1);
        }
        public string getMonthName(int intMonth)
        {
            return CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(intMonth);
        }

        #endregion

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public DataSet GetLevelsList()
        {
            //ProcLevels_GetLevelsList => This is the SP which can be called to remove logic below.
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[0];
                DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);
                return DashboardDataSet;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        public DataSet GetPointsDetails()
        {
            try
            {
                SqlParameter[] sqlParameters = new SqlParameter[0];
                DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);
                return DashboardDataSet;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
        public DataSet GetPointsDetails(int iForEmpId)
        {
            try
            {
                bool bIsPointDetails = true;
                bool bIsPeriodic = false;
                bool bIsMonthRange = false;
                bool bIsDetail = true;
                bool bAllDates = true;
                string sViewType = "";
                DateTime dtMonday = DateTime.Today;
                DateTime dtStartMonth = DateTime.Today;
                DateTime dtEndMonth = DateTime.Today;

                SqlParameter[] sqlParameters = new SqlParameter[10];
                sqlParameters[0] = new SqlParameter(VISBaseEntityConstants.const_Field_Id, iForEmpId);
                sqlParameters[1] = new SqlParameter("@pointDetails", bIsPointDetails);
                sqlParameters[2] = new SqlParameter("@isDetail", bIsDetail);
                sqlParameters[3] = new SqlParameter("@viewType", sViewType);
                sqlParameters[4] = new SqlParameter("@startDate", dtMonday);
                sqlParameters[5] = new SqlParameter("@isPeriodic", bIsPeriodic);
                sqlParameters[6] = new SqlParameter("@monthRange", bIsMonthRange);
                sqlParameters[7] = new SqlParameter("@isAllDates", bAllDates);
                sqlParameters[8] = new SqlParameter("@monthStart", dtStartMonth);
                sqlParameters[9] = new SqlParameter("@monthEnd", dtEndMonth);
                DataSet DashboardDataSet = ReturnDataSetFromSP(DashboardConstsants.const_Proc_GetDashboardDataSets, sqlParameters);
                return DashboardDataSet;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
            //EmployeeLevelsBAL levelsBAL = new EmployeeLevelsBAL();
            //if (rbtlistReport.SelectedValue == "Detail")
            //{
            //    bIsPointDetails = true;
            //}
            //else
            //{
            //    bIsDetail = false;
            //    sViewType = rbtlistReport.SelectedValue;
            //    if (sViewType == "Weekly")
            //    {
            //        dtMonday = GetMonday(levelsBAL.GetPointStartDate(iEmpId));
            //    }
            //}

            //connection conn = new connection();
            //conn.GetConnectionString();
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "Levels_ReportAdmin";
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.Connection = conn.conn;

            //cmd.Parameters.AddWithValue("@empId", iForEmpId);
            //cmd.Parameters.AddWithValue("@pointDetails", bIsPointDetails);
            //cmd.Parameters.AddWithValue("@isDetail", bIsDetail);
            //cmd.Parameters.AddWithValue("@viewType", sViewType);
            //cmd.Parameters.AddWithValue("@startDate", dtMonday);
            //cmd.Parameters.AddWithValue("@isPeriodic", bIsPeriodic);
            //cmd.Parameters.AddWithValue("@monthRange", bIsMonthRange);
            //cmd.Parameters.AddWithValue("@isAllDates", bAllDates);
            //cmd.Parameters.AddWithValue("@monthStart", dtStartMonth);
            //cmd.Parameters.AddWithValue("@monthEnd", dtEndMonth);

            //DataSet dsReport = new DataSet();
            //SqlDataAdapter sda = new SqlDataAdapter();
            //sda.SelectCommand = cmd;
            //sda.Fill(dsReport);

            //if (dsReport != null)
            //{
            //    if (dsReport.Tables[0].Rows.Count > 0)
            //    //List<Levels_ReportAdmin> listReport = levelsBAL.GetAdminReport(Convert.ToInt32(ddlEmployee.SelectedValue),bIsDetail,sViewType,dtMonday);
            //    //if (listReport != null && listReport.Count > 0)
            //    {
            //        lblGridEmpty.Visible = false;
            //        lblResult.Visible = true;

            //        gvReport.DataSource = dsReport;
            //        gvReport.DataBind();

            //        iCount = dsReport.Tables[0].Rows.Count;
            //        trpaging.Visible = true;

            //        int iTotalPoints = Convert.ToInt32(dsReport.Tables[0].Rows[iCount - 1]["Points Gained"].ToString());
            //        string sCurrLevel = levelsBAL.GetCurrentLevel(iTotalPoints);
            //        Employee_MasterBAL employeeBAL = new Employee_MasterBAL();
            //        Employee_Master empMaster = employeeBAL.GetEmployeeById(iForEmpId);
            //        if (empMaster != null)
            //        {
            //            sUserName = empMaster.Employee_Name;
            //        }
            //        if (sCurrLevel != null)
            //        {
            //            lblResult.Text = sUserName + " is at Level: " + sCurrLevel + " with " + iTotalPoints + " points.";
            //        }
            //        else
            //        {
            //            lblResult.Text = sUserName + " gained: " + iTotalPoints + " points.";
            //        }
            //    }
            //    else
            //    {
            //        //gvReport.DataSource = listReport;
            //        gvReport.DataSource = dsReport;
            //        gvReport.DataBind();
            //        lblGridEmpty.Visible = true;
            //        iCount = 0;
            //        trpaging.Visible = false;
            //    }
            //    Paging();
            //}
        }

        public DataTable GetAttendanceDetail(int Id,string Date)
        {
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                

                for (int i = 0; i < 8; i++)
                {
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = DashboardConstsants.const_ProcCalTotalAttendanceReport;
                    base.objSqlCommand.Parameters.AddWithValue("@EmployeeID", Id);
                    base.objSqlCommand.Parameters.AddWithValue("@Date", Date);

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
}