using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using System.Web.UI;
using VIS_Domain.HumanResource.Attendance;
using System.Net;
using System.Web;
using System.Text.RegularExpressions;
using VIS_Domain;


namespace VIS_Repository.HumanResource.Attendace
{



    public class WorkSheetRepository : VISDbCommand
    {

        public Int32 intAffectedRecords { get; set; }


        public WorkSheetRepository(string _connectionstring) : base(_connectionstring)
        {

        }




        public string DeleteEntity(Int64 Id)
        {

            return null;
        }

        public WorkSheet GetEntityByID(Int64 Id)
        {

            return null;
        }

        public IEnumerable<WorkSheet> GetEntityList()
        {

            return null; ;
        }
        public string AddEntity(WorkSheet entityObject)
        {
            return null;
        }
        //public string AddWorkSheet(WorkSheet entityObject)
        //{
        //    try
        //    {


        //        VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
        //        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //        objVISDbCommand.objSqlCommand.CommandText = WorkSheetConstants.const_InsertUpdateWorkSheetMaster;

        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "Insert");
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, 12);
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_FillDate, "2017-09-25 00:00:00.000");

        //        int totalminutes = 0;
        //        int totalhours = 0;
        //        //for (int i = 0; i < 7; i++)
        //        //{

        //        double temphour;
        //        if (entityObject.Hours != "")
        //        {
        //            temphour = Convert.ToDouble(entityObject.Hours);
        //            string[] split = entityObject.Hours.Split('.');
        //            totalminutes += (Int32.Parse(split[0]) * 60) + (Int32.Parse(split[1]));
        //        }
        //        // }
        //        totalhours = totalminutes / 60;
        //        totalminutes = totalminutes % 60;
        //        string finalhours = totalhours.ToString() + "." + totalminutes.ToString();
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, 21);
        //        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_TaskId, entityObject.TaskId);

        //        objVISDbCommand.objSqlCommand.Connection.Open();
        //        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
        //        objSqlCommand.Connection.Close();

        //    }


        //    catch (Exception ex)
        //    {
        //        return ex.Message + Environment.NewLine + ex.StackTrace;
        //    }

        //    return "";
        //}
        //public string AddEntity(WorkSheet entityObject)
        //{

        //    try
        //    {

        //            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
        //            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //            objVISDbCommand.objSqlCommand.CommandText = WorkSheetConstants.const_InsertUpdateWorkSheetMaster;

        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "Insert");
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, 12);
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_FillDate, "2017-09-25 00:00:00.000");

        //            int totalminutes = 0;
        //            int totalhours = 0;
        //            //for (int i = 0; i < 7; i++)
        //            //{

        //            double temphour;
        //            if (entityObject.Hours != "")
        //            {
        //                temphour = Convert.ToDouble(entityObject.Hours);
        //                string[] split = entityObject.Hours.Split('.');
        //                totalminutes += (Int32.Parse(split[0]) * 60) + (Int32.Parse(split[1]));
        //            }
        //            // }
        //            totalhours = totalminutes / 60;
        //            totalminutes = totalminutes % 60;
        //            string finalhours = totalhours.ToString() + "." + totalminutes.ToString();
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, 21);
        //            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_TaskId, entityObject.TaskId);

        //            objVISDbCommand.objSqlCommand.Connection.Open();
        //            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
        //            objSqlCommand.Connection.Close();
        //            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message + Environment.NewLine + ex.StackTrace;
        //    }

        //    //try
        //    //{
        //    //    int wbs_flag = 0;

        //    //    VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
        //    //    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //    //    objVISDbCommand.objSqlCommand.CommandText = WorkSheetConstants.const_InsertUpdateWorkSheetMaster;
        //    //   objVISDbCommand.objSqlCommand.Connection.Open();
        //    //    DayOfWeek today = DateTime.Now.DayOfWeek;
        //    //    DateTime firstDate = DateTime.Now.AddDays(-(int)today);
        //    //    DataTable dt = new DataTable();
        //    //    dt.Columns.Add("date", Type.GetType("System.String"));

        //    //    for (int i = 0; i < 7; i++)
        //    //    {
        //    //        DataRow dr = dt.NewRow();
        //    //        dr["date"] = firstDate.AddDays(i + 1).ToShortDateString();
        //    //        dt.Rows.Add(dr);
        //    //    }
        //    //    for (int outer = 0; outer < dt.Rows.Count; outer++)
        //    //    {
        //    //        int totalminutes = 0;
        //    //        int totalhours = 0;
        //    //        //for (int i = 0; i < 7; i++)
        //    //        //{

        //    //            double temphour;
        //    //            if (entityObject.Hours != "")
        //    //            {
        //    //                temphour = Convert.ToDouble(entityObject.Hours);
        //    //                string[] split = entityObject.Hours.Split('.');
        //    //                totalminutes += (Int32.Parse(split[0]) * 60) + (Int32.Parse(split[1]));
        //    //            }
        //    //       // }
        //    //        totalhours = totalminutes / 60;
        //    //        totalminutes = totalminutes % 60;
        //    //        string finalhours = totalhours.ToString() + "." + totalminutes.ToString();
        //    //        if (Convert.ToDouble(finalhours) > 24)
        //    //        {
        //    //            //  System.Web.UI.ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('Worksheet hours must be less than 24 hours')", true);
        //    //        }
        //    //        else
        //    //        {
        //    //            for (int inner = 0; inner < 7; inner++)
        //    //            {


        //    //                if ((entityObject.ProjectID != 0) && (!String.IsNullOrEmpty(entityObject.Description)) && (!String.IsNullOrEmpty(entityObject.Hours)))
        //    //                {
        //    //                    using (base.objSqlCommand.Connection)
        //    //                    {

        //    //                        base.objSqlCommand.Parameters.Clear();
        //    //                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

        //    //                        base.objSqlCommand.CommandText = WorkSheetConstants.const_ProcGetWorkSheetTaskName;
        //    //                        base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "FollowWBS");

        //    //                        base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);

        //    //                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
        //    //                        {
        //    //                            base.objSqlCommand.Connection.Open();
        //    //                        }
        //    //                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
        //    //                        DataSet dt1 = new DataSet();
        //    //                        da.Fill(dt1);
        //    //                        base.objSqlCommand.Connection.Close();

        //    //                        bool iswbs = (Convert.ToBoolean(dt1.Tables[0].Rows[0]["IsFollowWBS"])==true);
        //    //                        if (entityObject.WorkSheetID == 0)
        //    //                        {
        //    //                            try
        //    //                            {


        //    //                                if (iswbs)
        //    //                                {
        //    //                                    wbs_flag = 1;

        //    //                                    base.objSqlCommand.Parameters.Clear();
        //    //                                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

        //    //                                    base.objSqlCommand.CommandText = WorkSheetConstants.const_ProcGetWorkSheetTaskName;
        //    //                                    base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "FollowWBS");

        //    //                                    base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.TaskId);

        //    //                                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
        //    //                                    {
        //    //                                        base.objSqlCommand.Connection.Open();
        //    //                                    }
        //    //                                    SqlDataAdapter daCode = new SqlDataAdapter(base.objSqlCommand);
        //    //                                    DataSet dtCode = new DataSet();
        //    //                                    daCode.Fill(dtCode);
        //    //                                    base.objSqlCommand.Connection.Close();
        //    //                                    string activitycode = dtCode.Tables[0].Rows[0]["activitycode"].ToString();

        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "Insert");
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, activitycode);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, entityObject.UserId);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_TaskId, entityObject.TaskId);


        //    //                                    objVISDbCommand.objSqlCommand.ExecuteNonQuery();

        //    //                                    base.objSqlCommand.Parameters.Clear();
        //    //                                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

        //    //                                    base.objSqlCommand.CommandText = WorkSheetConstants.const_ProcGetWorkSheetTaskName;
        //    //                                    base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "TaskIdGet");

        //    //                                    base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_TaskId, entityObject.TaskId);

        //    //                                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
        //    //                                    {
        //    //                                        base.objSqlCommand.Connection.Open();
        //    //                                    }
        //    //                                    SqlDataAdapter datask = new SqlDataAdapter(base.objSqlCommand);
        //    //                                    DataSet dstask = new DataSet();
        //    //                                    datask.Fill(dstask);
        //    //                                    base.objSqlCommand.Connection.Close();
        //    //                                    bool value = Convert.ToBoolean(dtCode.Tables[0].Rows[0]["IsSignedOff"].ToString());
        //    //                                    if (!value)
        //    //                                    {
        //    //                                        objVISDbCommand.objSqlCommand.Connection.Open();
        //    //                                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

        //    //                                        if (intAffectedRecords == -1)
        //    //                                        {




        //    //                                        }
        //    //                                    }
        //    //                                    else
        //    //                                    {
        //    //                                        // ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('SignedOff Task can not be inserted/updated')", true);
        //    //                                        value = false;
        //    //                                    }
        //    //                                }
        //    //                                else
        //    //                                {







        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "Insert");
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, 12);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_FillDate, "2015-04-14 00:00:00.000");
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, 21);

        //    //                                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


        //    //                                    if (intAffectedRecords == -1)
        //    //                                    {
        //    //                                        // ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('Please Contact Your Line Manager/Project Manager To Update Your Worksheet. ')", true);

        //    //                                    }
        //    //                                }
        //    //                            }
        //    //                            catch (Exception ex)
        //    //                            {
        //    //                                // System.Web.UI.ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('" + ex.Message.ToString() + "')", true);
        //    //                            }
        //    //                        }
        //    //                        else
        //    //                        {


        //    //                            try
        //    //                            {
        //    //                                if (iswbs)
        //    //                                {
        //    //                                    wbs_flag = 1;

        //    //                                    objVISDbCommand.objSqlCommand.Parameters.Clear();
        //    //                                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

        //    //                                    objVISDbCommand.objSqlCommand.CommandText = WorkSheetConstants.const_UpdateWorkSheetMaster;


        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.TaskId);


        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, 12);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, entityObject.UserId);



        //    //                                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


        //    //                                    if (intAffectedRecords == -1)
        //    //                                    {
        //    //                                        ///ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('Please Contact Your Line Manager/Project Manager To Update Your Worksheet. ')", true);

        //    //                                    }
        //    //                                }



        //    //                                else
        //    //                                {

        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, entityObject.ProjectID);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, entityObject.SubActivityId);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, entityObject.Description);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
        //    //                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, entityObject.UserId);

        //    //                                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


        //    //                                    if (intAffectedRecords == -1)
        //    //                                    {
        //    //                                        //ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('Please Contact Your Line Manager/Project Manager To Update Your Worksheet. ')", true);

        //    //                                    }
        //    //                                }
        //    //                            }
        //    //                            catch (Exception ex)
        //    //                            {
        //    //                                // ScriptManager.RegisterStartupScript(this, this.GetType(), "AddMessage", " alert('" + ex.Message.ToString() + "')", true);
        //    //                            }
        //    //                        }



        //    //                    }

        //    //                }
        //    //            }



        //    //        }
        //    //        break;
        //    //    }
        //    //    objSqlCommand.Connection.Close();
        //    //    return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return ex.Message + Environment.NewLine + ex.StackTrace;
        //    //}

        //}

        public string SaveWorksheet(List<WorkSheet> entityObject)
        {
            try
            {
                foreach (WorkSheet WorkSheet in entityObject)
                {


                    VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = WorkSheetConstants.const_InsertUpdateWorkSheetMaster;

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "Insert");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, WorkSheet.ProjectID);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_SubActivityId, 12);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Description, WorkSheet.Description);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_FillDate, "2017-09-25 00:00:00.000");

                    int totalminutes = 0;
                    int totalhours = 0;
                    //for (int i = 0; i < 7; i++)
                    //{

                    double temphour;
                    if (WorkSheet.Hours != "")
                    {
                        temphour = Convert.ToDouble(WorkSheet.Hours);
                        string[] split = WorkSheet.Hours.Split('.');
                        totalminutes += (Int32.Parse(split[0]) * 60) + (Int32.Parse(split[1]));
                    }
                    // }
                    totalhours = totalminutes / 60;
                    totalminutes = totalminutes % 60;
                    string finalhours = totalhours.ToString() + "." + totalminutes.ToString();
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Hours, finalhours);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, 21);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_TaskId, WorkSheet.TaskId);

                    objVISDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    objSqlCommand.Connection.Close();

                }
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

            finally
            {
                base.objSqlCommand.Connection.Close();
            }

            return "WorkSheet Successfully Saved....";
        }
        public string UpdateEntity(WorkSheet entityObject)
        {

            return null;
        }



        public IEnumerable<WorkSheet> GetDefaultConfigure()
        {
            List<WorkSheet> objListToReturn = new List<WorkSheet>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = WorkSheetConstants.const_ProcGetAllActivity;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                DataSet Activity = new DataSet();
                Activity.Clear();
                da.Fill(Activity);

                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = WorkSheetConstants.const_procGetAllSubActivity;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da1 = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt1 = new DataTable();

                DataSet SubActivity = new DataSet();
                SubActivity.Clear();
                da.Fill(SubActivity);
                DataColumn dcA = new DataColumn("SubActivityId");
                DataColumn dcA1 = new DataColumn("SubActivityName");
                DataTable dtActivty = new DataTable();
                dtActivty.Columns.Add(dcA);
                dtActivty.Columns.Add(dcA1);

                for (int Act = 0; Act < Activity.Tables[0].Rows.Count; Act++)
                {
                    DataRow NewRow = dtActivty.NewRow();
                    NewRow["SubActivityId"] = 0;
                    NewRow["SubActivityName"] = Activity.Tables[0].Rows[Act]["ActivityName"].ToString() + " ....";
                    dtActivty.Rows.Add(NewRow);
                    DataRow[] dr = SubActivity.Tables[0].Select("activityid = " + Activity.Tables[0].Rows[Act]["Activityid"]);
                    for (int innerRow = 0; innerRow < dr.Length; innerRow++)
                    {
                        NewRow = dtActivty.NewRow();
                        NewRow["SubActivityId"] = dr[innerRow]["SubActivityId"];
                        NewRow["SubActivityName"] = SpaceDDL(3) + dr[innerRow]["SubActivityName"];

                        dtActivty.Rows.Add(NewRow);



                    }



                }
                objListToReturn = (from DataRow row in dtActivty.Rows
                                   select new WorkSheet()
                                   {

                                       SubActivityId = (Convert.ToInt64(row["SubActivityId"])),

                                       SubActivityName = row["SubActivityName"].ToString()
                                   }).ToList();
            }
            return objListToReturn;

        }


        public IEnumerable<WorkSheet> GetDate()
        {
            List<WorkSheet> objListToDate = new List<WorkSheet>();

            DayOfWeek today = DateTime.Now.DayOfWeek;
            DateTime firstDate = DateTime.Now.AddDays(-(int)today);
            DataTable dt = new DataTable();
            dt.Columns.Add("date", Type.GetType("System.String"));

            for (int i = 0; i < 7; i++)
            {
                DataRow dr = dt.NewRow();
                dr["date"] = firstDate.AddDays(i + 1).ToShortDateString();
                dt.Rows.Add(dr);
            }
            objListToDate = (from DataRow row in dt.Rows
                             select new WorkSheet()
                             {

                                 Date = row["Date"].ToString()
                             }).ToList();



            return objListToDate;

            // DataSet WorkSheetData = SelectWorkSheetByDate(Convert.ToDateTime(lblDate.Text), Convert.ToInt32(Session["EmpId"].ToString()));


        }




        public IEnumerable<WorkSheet> GetProjectList(long UserId, string Date)
        {
            List<WorkSheet> objListToReturn = new List<WorkSheet>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = WorkSheetConstants.const_procGetProjectsByUserId;
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Date, Date);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<WorkSheet>(dt);
            }
            return objListToReturn;
        }


        public IEnumerable<WorkSheet> GetTaskDropDownFill(long ProjectId, long UserId, string Date)
        {
            List<WorkSheet> objListToReturn = new List<WorkSheet>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                base.objSqlCommand.CommandText = WorkSheetConstants.const_ProcGetWorkSheetTaskName;
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_mode, "GetTaskName");
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_ProjectID, ProjectId);
                base.objSqlCommand.Parameters.AddWithValue(WorkSheetConstants.const_Field_Date, Date);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<WorkSheet>(dt);
            }
            return objListToReturn;
        }





        private string SpaceDDL(int numberOfSpaces)
        {
            string Spaces = "";
            for (int i = 0; i <= numberOfSpaces; i++)
            {
                Spaces += "&nbsp;";


            }
            return System.Net.WebUtility.HtmlDecode(Spaces);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }



        //void IDisposable.Dispose()
        //{
        //    throw new NotImplementedException();
        //}

        //TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~CurrencyRepository()
        //{
        //    // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //    Dispose(false);
        //}

        //This code added to correctly implement the disposable pattern.
        //void IDisposable.Dispose()
        //{
        //    // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //    Dispose(true);
        //    // TODO: uncomment the following line if the finalizer is overridden above.
        //    // GC.SuppressFinalize(this);
        //}



        #endregion
    }
}
