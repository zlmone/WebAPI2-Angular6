using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.UserManagement;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using System.Net.NetworkInformation;

namespace VIS_Repository.UserManagement
{
    public class AttendanceEntryRepository : VISDbCommand, VISIBaseRepository<AttendanceEntry>
    {
        public string EntryTypedatacont = null;
        public string Remarks { get; set; }
        public string strUserId { get; set; }
        public HttpRequest Request { get; set; }
        public Int32 intAffectedRecords { get; set; }
        public string modedata { get; set; }
        public string time = DateTime.Now.ToString("HH:mm");
        public XElement Element { get; set; }
        DataSet ds = new DataSet();
        DataSet dsEntryType = new DataSet();
        DataSet dstype;
        DataTable dtConfig = new DataTable();

        public AttendanceEntryRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public string AddEntity(AttendanceEntry objAttendance)
        {
            try
            {
                EntryTypedatacont = Convert.ToString(objAttendance.Entry_Type);
                Remarks = objAttendance.Remarks;
                GetAttendanceEntryList();
                DateTime dt = DateTime.Now;
                String strDate = dt.ToString("dd/MM/yyyy");
                
                string forwhichDate = dt.ToString("yyyy-MM-dd HH:mm:ss");


                string IpAddress = GetLanIPAddress();
                string MacAddress = GetMACAddress();

                VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "insert");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue("Id", "0");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, 21);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Entry_Type, objAttendance.Entry_Type);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Remarks, objAttendance.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Entry_Time, "");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Date, strDate);
                string actualTime = "", grace = "";
                if (dstype.Tables.Count > 0)
                {
                    actualTime = dstype.Tables[0].Rows[0][0].ToString();
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_actualEntryTime, actualTime);
                if(dstype.Tables.Count > 0)
                {
                    grace = dstype.Tables[0].Rows[0][1].ToString();
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_grace, grace);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_macID, MacAddress);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, forwhichDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_ipAddress, IpAddress);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_source, "W");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_mouseMovement," ");

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();


                if (EntryTypedatacont == "1" || EntryTypedatacont == "2")
                {
                    objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);

                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_GetPointCounts;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "PointCount");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Entry_Type, EntryTypedatacont);

                    if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                    {
                        objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                    }
                    objVISDbCommand.objSqlCommand.Connection.Open();
                    SqlDataAdapter sdapoints = new SqlDataAdapter();
                    sdapoints.SelectCommand = objVISDbCommand.objSqlCommand;
                    DataSet dspoints = new DataSet();
                    dspoints.Clear();
                    sdapoints.Fill(dspoints);
                    objSqlCommand.Connection.Close();
                }

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }
        public String GetLanIPAddress()
        {

            String ipaddress = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            if (string.IsNullOrEmpty(ipaddress))
            {
                ipaddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            return ipaddress;
        }

        public string GetMACAddress()
        {
            NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();
            String sMacAddress = string.Empty;
            foreach (NetworkInterface adapter in nics)
            {
                if (sMacAddress == String.Empty)// only return MAC Address from first card  
                {
                    IPInterfaceProperties properties = adapter.GetIPProperties();
                    sMacAddress = adapter.GetPhysicalAddress().ToString();
                }
            }
            return sMacAddress;
        }
        public string GetPunchOutonNextday(int Id,string Date)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, Date);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "check");
            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            objVISDbCommand.objSqlCommand.Connection.Open();

            SqlDataAdapter sdacheck = new SqlDataAdapter();
            DataSet dscheck = new DataSet();
            sdacheck.SelectCommand = objVISDbCommand.objSqlCommand;
            dscheck.Clear();
            sdacheck.Fill(dscheck);
            //-------------second method--------------//
            objVISDbCommand.objSqlCommand.Parameters.Clear();
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, Date);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "checktoday");
            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            
            SqlDataAdapter sdaAttendance = new SqlDataAdapter();
            DataSet dsAttendance = new DataSet();
            sdaAttendance.SelectCommand = objVISDbCommand.objSqlCommand;
            dsAttendance.Clear();
            sdaAttendance.Fill(dsAttendance);
            //-----------------Thard Method-------------//
            objVISDbCommand.objSqlCommand.Parameters.Clear();
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, Date);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "checktoday");
            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            
            SqlDataAdapter sdaAttendancePreviousday = new SqlDataAdapter();
            DataSet dsAttendancePreviousday = new DataSet();
            sdaAttendancePreviousday.SelectCommand = objVISDbCommand.objSqlCommand;
            dsAttendancePreviousday.Clear();
            sdaAttendancePreviousday.Fill(dsAttendancePreviousday);

            objSqlCommand.Connection.Close();
            

            if(dscheck != null && dscheck.Tables.Count > 0 && dscheck.Tables[0].Rows.Count > 0 && dsAttendance !=null && dsAttendance.Tables.Count > 0 && dsAttendance.Tables[0].Rows.Count == 0 && dsAttendancePreviousday != null && dsAttendancePreviousday.Tables.Count > 0 && dsAttendancePreviousday.Tables[0].Rows.Count > 0)
            {
                //ddlDateList.Visible = true;
                DateTime dt = DateTime.Now;
                DateTime dtPre = dt.AddDays(-1);
                //ddlDateList.Items.Add(new ListItem(dt.ToString("dd/MM/yyyy"), "0"));
                //ddlDateList.Items.Add(new ListItem(dtPre.ToString("dd/MM/yyyy"), "1"));
                //ddlDateList.SelectedIndex = 0;
                //btnsubmit.Enabled = false;
                //RadioButtonListEntryType.Enabled = false;
            }
            return "";
        }
        public DataTable GetTimeDetails(int Id, string Date)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_GetTimer;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Id);
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Date, Date);

            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            objVISDbCommand.objSqlCommand.Connection.Open();

            SqlDataAdapter sdaTimer = new SqlDataAdapter();
            DataTable dstimer = new DataTable();
            sdaTimer.SelectCommand = objVISDbCommand.objSqlCommand;
            dstimer.Clear();
            sdaTimer.Fill(dstimer);
            
            objSqlCommand.Connection.Close();
            return dstimer;
        }
        public DataTable GetEmployeeName(int Id)
        {
            VISDbCommand Objdbcommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            Objdbcommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            Objdbcommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
            Objdbcommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Id);

            Objdbcommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "GetEmployeeName");
            if (!Objdbcommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                Objdbcommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }
            Objdbcommand.objSqlCommand.Connection.Open();

            SqlDataAdapter sdaempname = new SqlDataAdapter();
            DataTable dtemp = new DataTable();
            sdaempname.SelectCommand = Objdbcommand.objSqlCommand;
            dtemp.Clear();
            sdaempname.Fill(dtemp);
            Objdbcommand.objSqlCommand.Connection.Close();
            return dtemp;
        }
        public string DeleteEntity(long Id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public AttendanceEntry GetEntityByID(long entityId)
        {
            throw new NotImplementedException();
        }

        public DataSet GetAttendanceEntryList()
        {
            DateTime dtt = DateTime.Now;
            String strDate = dtt.ToString("dd/MM/yyyy");
            string day = DateTime.Now.DayOfWeek.ToString();
            string time = DateTime.Now.ToString("HH:mm");

            VISDbCommand objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
            objSqlCommand.Connection.Open();
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "login");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, "");

            if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
            {
                objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
            }

            SqlDataAdapter sda = new SqlDataAdapter();
            sda.SelectCommand = objVISDbCommand.objSqlCommand;
            ds.Clear();
            sda.Fill(ds);

            if (ds.Tables[0].Rows.Count > 0)
            {
                dstype = new DataSet();
                objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_GetCommonConfiguration;
                
                SqlDataAdapter sdaconfig = new SqlDataAdapter();
                sdaconfig.SelectCommand = objVISDbCommand.objSqlCommand;
                dtConfig.Clear();
                sdaconfig.Fill(dtConfig);
                
                SqlParameter[] Param = new SqlParameter[2];
                if (Convert.ToInt32(EntryTypedatacont) == 1 || Convert.ToInt32(EntryTypedatacont) == 2)
                {
                    if (Convert.ToInt32(EntryTypedatacont) == 1 && (day == "Monday" || day == "Tuesday" || day == "Wednesday" || day == "Thursday" || day == "Friday" || day == "Sunday"))
                    {
                        Param[0] = new SqlParameter(AttendanceEntryConstants.const_Field_Mode, "allday");
                    }
                    else if (Convert.ToInt32(EntryTypedatacont) == 1 && (day == "Saturday"))
                    {
                        Param[0] = new SqlParameter(AttendanceEntryConstants.const_Field_Mode, "selectgrace");
                    }
                    else if (Convert.ToInt32(EntryTypedatacont) == 2 && (day == "Monday" || day == "Tuesday" || day == "Wednesday" || day == "Thursday" || day == "Friday" || day == "Sunday"))
                    {
                        Param[0] = new SqlParameter(AttendanceEntryConstants.const_Field_Mode, "selectmon");
                    }
                    else if (Convert.ToInt32(EntryTypedatacont) == 2 && (day == "Saturday"))
                    {
                        Param[0] = new SqlParameter(AttendanceEntryConstants.const_Field_Mode, "selectsat");
                    }
                    Param[1] = new SqlParameter(AttendanceEntryConstants.const_Field_forWhichDate, strDate);

                    if (Param[0] != null)
                    {
                        objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, Param[0].Value.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, Param[1].Value.ToString());

                        if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                        {
                            objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                        }
                        SqlDataAdapter sdaAdapter = new SqlDataAdapter();
                        sdaAdapter.SelectCommand = objVISDbCommand.objSqlCommand;
                        //dstype.Clear();
                        sdaAdapter.Fill(dstype);
                        //return dstype;
                    }
                    
                    DataSet dsEntry = new DataSet();
                    if(Convert.ToInt32(EntryTypedatacont) == 2)
                    {
                        DateTime forwhichDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
                        objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id,Convert.ToInt32(21));
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "EntryCount");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, strDate);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Entry_Type,EntryTypedatacont);

                        if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                        {
                            objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                        }
                        SqlDataAdapter sdaEntry = new SqlDataAdapter();
                        sdaEntry.SelectCommand = objVISDbCommand.objSqlCommand;
                        sdaEntry.Fill(dsEntry);
                    }
                    if(dstype != null && dstype.Tables.Count > 0)
                    {
                        if(Convert.ToInt32(EntryTypedatacont) == 1 && (Convert.ToDateTime(time) > Convert.ToDateTime(dstype.Tables[0].Rows[0][0])))
                        {
                            if(Remarks.Trim().ToString() == "")
                            {
                                //alert message => Please Enter Remarks
                            }
                        }
                    }
                }
                else if(Convert.ToInt32(EntryTypedatacont) == 4)
                {
                    int lunchtime = Convert.ToInt32(GetConfigValue("lunchtime"));
                    DateTime EndTime = DateTime.Now;

                    objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "lunch");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, strDate);

                    if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                    {
                        objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                    }
                    SqlDataAdapter sdaEntry = new SqlDataAdapter();
                    sdaEntry.SelectCommand = objVISDbCommand.objSqlCommand;
                    DataSet dslunch = new DataSet();
                    sdaEntry.Fill(dslunch);

                    if(dslunch.Tables[0].Rows.Count > 0)
                    {
                        DateTime dtstarttime = Convert.ToDateTime(dslunch.Tables[0].Rows[0][0].ToString());
                        int iMinBreak = Convert.ToInt16(dtConfig.Rows[0]["MinimumLunchBreak"]);
                        string strstarttime = dtstarttime.ToString("HH:mm:ss");
                        TimeSpan difference = EndTime - dtstarttime;
                        int TotalTime = difference.Hours * 60 + difference.Minutes;

                        if(Convert.ToInt32(difference.TotalMinutes) >= iMinBreak)
                        {
                            if (TotalTime > lunchtime)
                            {
                                if(Remarks.Trim().ToString() == "")
                                {
                                    //alert message => Please Enter Remarks
                                }
                                else
                                {
                                    if (IsValidString(Remarks.Trim()))
                                    {
                                        //AddEntity();
                                    }
                                    else
                                    {
                                        //alert message => Please Enter Proper Remarks
                                    }
                                }
                            }
                            else
                            {
                                //AddEntity()
                            }
                        }
                        else
                        {
                            //alert Message(with time difference)
                        }
                    }
                }
                else if(Convert.ToInt32(EntryTypedatacont) == 5)
                {
                    if(Remarks.Trim().ToString() == "")
                    {
                        //Alert Message Please Enter remarks.
                    }
                    else
                    {
                        if (IsValidString(Remarks.Trim()))
                        {
                            //AddEntity();
                        }
                        else
                        {
                            // Alert Message => Please Enter Proper remarks.
                        }
                    }
                }
                else if (Convert.ToInt32(EntryTypedatacont) == 6)
                {
                    objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, strDate);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "GetOtheroutEntryTime");

                    if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                    {
                        objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                    }
                    SqlDataAdapter sdaEntry = new SqlDataAdapter();
                    sdaEntry.SelectCommand = objVISDbCommand.objSqlCommand;
                    DataSet dsTime = new DataSet();
                    sdaEntry.Fill(dsTime);
                    //int iMinBreak = Convert.ToInt32((xElem.Element("MinimumOtherBreak").Value));
                    int iMinBreak = Convert.ToInt32(dtConfig.Rows[0]["MinimumOtherBreak"]);
                    TimeSpan diff = DateTime.Now - Convert.ToDateTime(dsTime.Tables[0].Rows[0][0]);

                    if(Convert.ToInt32(diff.TotalMinutes) >= iMinBreak)
                    {
                        //Add Entity();
                    }
                    else
                    {
                        //Alert Message With Time Detials.
                    }
                }
                else if(Convert.ToInt32(EntryTypedatacont) == 7)
                {
                    if (string.IsNullOrEmpty(Remarks.Trim()))
                    {
                        //Alert Message Please Enter Remarks.
                    }
                    else
                    {
                        if (IsValidString(Remarks.Trim()))
                        {
                            //Add Entity();
                        }
                        else
                        {
                            // Alert Message Please Enter Proper Remarks.
                        }
                    }
                }
                else if(Convert.ToInt32(EntryTypedatacont) == 9)
                {
                    if(Remarks.Trim().ToString() == "" || Remarks.Length < 20)
                    {
                        //Alert Message => Please Enter Remarks With Atleast 20 Characters
                    }
                    else
                    {
                        if (IsValidString(Remarks.Trim()))
                        {
                            //Add Entity();
                        }
                        else
                        {
                            //Alert message => Please Enter Proper Remarks.
                        }
                        //sendOfficialWorkMAil("Out");
                    }
                }
                else if(Convert.ToInt32(EntryTypedatacont) == 10)
                {
                    if (Remarks.Trim().ToString() == "" || Remarks.Trim().Length < 20)
                    {
                        //Alert Message => Please Enter Remarks With Atleast 20 Characters.
                    }
                    else
                    {
                        TimeSpan MTime;
                        objVISDbCommand = new VISDbCommand(ConfigurationManager.ConnectionStrings["VISConnection"].ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = AttendanceEntryConstants.const_procAttendanceEntry_SelectAll;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Employee_Id, Convert.ToInt32(21));
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_forWhichDate, DateTime.Now.ToString("yyyyMMdd"));
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(AttendanceEntryConstants.const_Field_Mode, "fillentry");

                        if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                        {
                            objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                        }
                        SqlDataAdapter sdaEntry = new SqlDataAdapter();
                        sdaEntry.SelectCommand = objVISDbCommand.objSqlCommand;
                        DataSet dstransaction = new DataSet();
                        sdaEntry.Fill(dstransaction);
                        MTime = DateTime.Parse(DateTime.Now.ToString()) - DateTime.Parse(dstransaction.Tables[0].Rows[0]["Entry_Time"].ToString());
                    }
                }
            }
            objSqlCommand.Connection.Close();
            return ds;
        }


        public string UpdateEntity(AttendanceEntry entityObject)
        {
            throw new NotImplementedException();
        }

        //Common Function
        public static bool IsValidString(string str)
        {
            bool valid;
            int charCount = Regex.Matches(str, @"[a-zA-Z0-9]").Count;
            
            if (charCount >= 3)
                valid = true;
            else
                valid = false;

            if (valid)
            {
                char prev = str[0];
                int rpt = 1;
                for (int i = 1; i < str.Length; i++)
                {
                    char curr = str[i];
                    if (curr == prev) rpt++;
                    else
                    {
                        rpt = 1;
                        prev = curr;
                    }
                    if (rpt >= 3)
                    {
                        valid = false;
                        break;
                    }
                }
            }
            return valid;
        }
        public static string GetConfigValue(string paramName)
        {
            String tmpS = String.Empty;
            try
            {
                tmpS = ConfigurationManager.AppSettings[paramName].ToString();
            }
            catch(Exception ex)
            {
                tmpS = String.Empty;
            }
            return tmpS;

        }

        public IEnumerable<AttendanceEntry> GetEntityList()
        {
            throw new NotImplementedException();
        }
    }
}
