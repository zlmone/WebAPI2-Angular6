using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using SD = System.Drawing;


using System.Collections;
//using System.Windows.Forms;
using System.Drawing;
using System.Net.Mail;

using System.Web.UI.HtmlControls;

using System.Runtime.InteropServices;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Linq;

using VIS_Domain.HumanResource.EmployeeManagement;
using VIS_Domain;

namespace VIS_Repository.HumanResource.EmployeeManagement
{


    public class EmpInfoTabularRepository : VISDbCommand, VISIBaseRepository<EmpInfoTabular>
    {
        IFormatProvider provider = new System.Globalization.CultureInfo("es-ES", true);
        public long returnid;
        public Int32 intAffectedRecords { get; set; }
        public int nwdId;
        public HttpServerUtility Server { get; }
        public HttpPostedFile PostedFile { get; }
        public DataRow dr;
        string lastYear = System.DateTime.Now.Year.ToString();

        string id; //UserID get
        string Mode;


        public EmpInfoTabularRepository(string _connectionstring) : base(_connectionstring)
        {
        }
        #region commonmethod
        public string DeleteEntity(Int64 ExpRoleId)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.Parameters.Clear();
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procExperienceRoleAdd;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "DeleteExpRole");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ExpRoleId, ExpRoleId);

            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            objVISDbCommand.objSqlCommand.Connection.Open();
            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            objSqlCommand.Connection.Close();

            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
   
        public EmpInfoTabular GetEntityByID(Int64 entityId)
        {
            return null;
        }

        public IEnumerable<EmpInfoTabular> GetEntityList()
        {
            return null;

        }

        public string AddEntity(EmpInfoTabular entityObject)
        {
            try
            {
                return null;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }
        public string UpdateEntity(EmpInfoTabular entityObject)
        {
            return null;
        }


        public string Delete()
        {
            try
            {

                return null;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }
        #endregion

        #region MainSave
        public string SaveMain(EmpInfoTabular entityObject)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNewEmployeeAdd;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, 21);

                string name = entityObject.FirstName + " " + entityObject.LastName;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_EmployeeName, name);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_FirstName, entityObject.FirstName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LastName, entityObject.LastName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_MiddleName, entityObject.MiddleName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Password, entityObject.Password);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Gender, entityObject.Gender);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserType, entityObject.UserType);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Email, entityObject.Email);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LineManagerID, entityObject.EmployeeID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_WorkingLocation, entityObject.WID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_WorkingLocationAddress, entityObject.WorkingLocationAddress);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CommunicationID, entityObject.CommunicationID);
                if (entityObject.OtherRemark !=null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherRemark, entityObject.OtherRemark);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherRemark, null);
                }
             
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsWebAccess, entityObject.IsWebAccess);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsWorksheetWeb, entityObject.IsWorksheetWeb);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ValidForLogin, entityObject.ValidForLogin);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AllowScreenCapture, entityObject.AllowScreenCapture);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsSwitchUser, entityObject.IsSwitchUser);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsWorksheetFill, entityObject.IsWorksheetFill);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_EmployeeGradeID, entityObject.EID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsAllowMouseMovement, entityObject.IsAllowMouseMovement);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsMouseTracking, entityObject.IsMouseTracking);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsScreenCaptureRemar, entityObject.IsScreenCaptureRemarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_isInvisibleUser, entityObject.isInvisibleUser);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsHostForEmpMaster, entityObject.IsHostForEmpMaster);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsProductivityTracker, entityObject.IsProductivityTracker);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_WorkFromHome, entityObject.WorkFromHome);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Active, entityObject.Active);


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_JoiningDate, entityObject.JoiningDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelevingDate, entityObject.RelevingDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ResignedDate, entityObject.ResignedDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_TotalCL, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_TotalSL, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Employeecode, entityObject.Employeecode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ProbationTill, entityObject.ProbationTill);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CompanyId, entityObject.CompanyId);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsConfirmed, entityObject.IsConfirmed);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ConfirmationDate, entityObject.ConfirmationDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_JoiningSalary, entityObject.JoiningSalary);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_JoiningDesignation, entityObject.PositionId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_PhotographFileName, entityObject.PhotographFileName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Sar, entityObject.Sar);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsSLASigned, entityObject.IsSLASigned);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsAppraisalRequired, entityObject.IsAppraisalRequired);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AppraisalDate, entityObject.AppraisalDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SLAYear, entityObject.SLAYear);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsConfirmationLeave, entityObject.IsConfirmationLeave);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsResigned, entityObject.IsResigned);


             

                objVISDbCommand.objSqlCommand.Parameters.Add("@returnid", SqlDbType.Int).Direction = ParameterDirection.Output;
                objVISDbCommand.objSqlCommand.Connection.Open();

               

               // returnid = 489;

                //objVISDbCommand.objSqlCommand.Parameters.Add("@returnid", SqlDbType.Int);
               // objVISDbCommand.objSqlCommand.Parameters["@returnid"].Direction = ParameterDirection.Output;

                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                long returnid = Convert.ToInt64(objVISDbCommand.objSqlCommand.Parameters["@returnid"].Value);

                objSqlCommand.Connection.Close();

                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;


            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }

        #endregion

        #region Personal
        public string SavePersonal(EmpInfoTabular entityObject)
        {

            try
            {
                id = entityObject.EditEmployeeid;
                //UserID get Edit 

                Mode = entityObject.Editmode; //mode pass Edit 
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procPersonalInformation_Add;
                if (Mode != null)
                {
                    if (id != null && Mode == "e")
                    {
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procPersonalInformation_Add;

                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "PersonalDeatilget");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsPersonalInformation = new DataSet();
                        sda.Fill(dsPersonalInformation);


                        base.objSqlCommand.Connection.Close();



                        if (dsPersonalInformation.Tables[0].Rows.Count == 0)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, returnid);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                        }
                    }
                    else if (id != null && Mode == "Convert")
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, returnid);
                    }
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, returnid);
                }


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_FatherName, entityObject.FatherName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Grandfathername, entityObject.Grandfathername);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Birthdate, entityObject.Birthdate);
                if (entityObject.Paddress != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Paddress, entityObject.Paddress);

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Paddress, "");
                }
                if (entityObject.Caddress != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Caddress, entityObject.Caddress);

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Caddress, "");
                }

                if (entityObject.Landlineno != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Landlineno, entityObject.Landlineno);

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Landlineno, "");
                }
                if (entityObject.Mobileno != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Mobileno, entityObject.Mobileno);

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Mobileno, "");
                }

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Emergencyno, entityObject.Emergencyno);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Age, entityObject.Age);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Bloodgroup, entityObject.Bloodgroup);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Status, entityObject.Status);
                if (entityObject.Status != "Unmarried")
                {
                    if (entityObject.Status != "Engaged")
                    {
                        if (entityObject.Numberofchild != 0)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Numberofchild, entityObject.Numberofchild);

                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Numberofchild, 0);
                        }

                        if (entityObject.Childname != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Childname, entityObject.Childname);

                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Childname, "");
                        }
                        if (entityObject.AnniversaryDate != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AnniversaryDate, entityObject.AnniversaryDate);

                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AnniversaryDate, null);
                        }
                    }

                    if (entityObject.Spouse != null)
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spouse, entityObject.Spouse);
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spouse, "");
                    }
                    if (entityObject.SpouseOccupation != null)
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SpouseOccupation, entityObject.SpouseOccupation);
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SpouseOccupation, null);
                    }

                    if (entityObject.Spousedob != null)
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spousedob, entityObject.Spousedob);
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spousedob, "");
                    }

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Status, "Unmarried");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spouse, "");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SpouseOccupation, null);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Numberofchild, 0);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Childname, "");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AnniversaryDate, null);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Spousedob, "");
                }


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_MotherName, entityObject.MotherName);

                if (entityObject.BrotherName != null)
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_BrotherName, entityObject.BrotherName);
                }
                else
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_BrotherName, null);
                }
                if (entityObject.BrotherOccupation != null)
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_BrotherOccupation, entityObject.BrotherOccupation);
                }
                else
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_BrotherOccupation, null);
                }
                if (entityObject.SisterName != null)
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SisterName, entityObject.SisterName);
                }
                else
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SisterName, null);
                }
                if (entityObject.SisterOccupation != null)
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SisterOccupation, entityObject.SisterName);
                }
                else
                {


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SisterOccupation, null);
                }
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_FatherOccupation, entityObject.FatherOccupation);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_MotherOccupation, entityObject.MotherOccupation);
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;


            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        #endregion

        #region Education
        public string SaveEducation(EmpInfoTabular entityObject)
        {

            try
            {
                id = entityObject.EditEmployeeid; //UserID get Edit 

                Mode = entityObject.Editmode; //mode pass Edit 

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_ProcEducation;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Education, entityObject.EducationID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);

                objVISDbCommand.objSqlCommand.Connection.Open();
                objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procPersonalInformation_Add;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EducatioDeatilget");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);
                DataSet DsEducation = new DataSet();
                sda.Fill(DsEducation);


                base.objSqlCommand.Connection.Close();



                if (entityObject.Schoolinstitute != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procEducationAdd;


                    if (Mode != null)
                    {
                        if (id != null && Mode == "e")
                        {

                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Eduid, Convert.ToInt32(DsEducation.Tables[0].Rows[0][0]));

                            int i = Convert.ToInt32(DsEducation.Tables[0].Rows[0][0]);
                        }
                        else
                        {
                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procPersonalInformation_Add;

                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EducatioDeatilget");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter sdaEducation = new SqlDataAdapter(base.objSqlCommand);
                            DataSet DsEducation1 = new DataSet();
                            sdaEducation.Fill(DsEducation1);


                            base.objSqlCommand.Connection.Close();

                            if (DsEducation1.Tables[0].Rows.Count == 0)
                            {
                                if (id != null && (Mode == "e" || Mode == "Convert"))
                                {

                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                                }
                            }
                        }
                    }
                    else if (Mode != null)
                    {

                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Eduid, Convert.ToInt32(DsEducation.Tables[0].Rows[0][0]));
                    }

                    else
                    {

                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    }


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_HighestEducation, entityObject.HighestEducation);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ClassDegree, entityObject.ClassDegree);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Schoolinstitute, entityObject.Schoolinstitute);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Medium, entityObject.Medium);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Passingyear, entityObject.Passingyear);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Boarduniversity, entityObject.Boarduniversity);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Percentage, entityObject.Percentage);

                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    objSqlCommand.Connection.Close();



                }

                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        #endregion


        #region Experiences
        public string AddRole(EmpInfoTabular entityObject)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procExperienceRoleAdd;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AddExpRole");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RoleId, entityObject.RoleId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Efficiency, entityObject.Efficiency);
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;


            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }

        public IEnumerable<EmpInfoTabular> GetRoleAdd()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procExperienceRoleAdd;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "GetUserExpRole");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public string AddPastExperience(EmpInfoTabular entityObject)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procExperienceRoleAdd;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AddExpRole");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RoleId, entityObject.RoleId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Efficiency, entityObject.Efficiency);
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;


            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        
        protected void checkExperience(EmpInfoTabular entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                int checkvar = 0, checkvar2 = 0;
                int flag = 0;
                string id = "21";
                System.TimeSpan resultofj = new TimeSpan(0, 0, 0, 0, 0);
                if (entityObject.Joiningdate != null)
                {
                    checkvar = 1;
                    DateTime joinExperience = Convert.ToDateTime(entityObject.Joiningdate);
                    int Enodate = joinExperience.Day;
                    int Enomonth = joinExperience.Month;
                    int Enoyear = joinExperience.Year;
                    System.DateTime dtjoiningE = new System.DateTime(Enoyear, Enomonth, Enodate, 0, 0, 0);
                    //joining must greater than last releving
                    if (id != null)
                    {
                        flag = 1;
                    }
                    else
                    {
                        List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
                        using (base.objSqlCommand.Connection)
                        {
                            base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCheckExperience;


                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ExperienceCheck");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);

                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daExperience = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsExperience = new DataSet();
                            daExperience.Fill(dsExperience);



                            if (dsExperience.Tables[0].Rows.Count > 0)
                            {
                                DateTime rdate = Convert.ToDateTime(dsExperience.Tables[0].Rows[0]["relievingdate"].ToString());
                                rdate = rdate.AddDays(1);

                                resultofj = dtjoiningE.Subtract(rdate);
                                flag = 0;
                            }
                            else
                            {
                                flag = 1;
                            }
                            //end releving
                        }
                    }
                    if (entityObject.Relievingdate != null)
                    {
                        checkvar2 = 1;
                    }

                    if (checkvar == 1 && checkvar2 == 1)
                    {
                        DateTime joindate = Convert.ToDateTime(entityObject.Joiningdate);

                        int JoDate = joindate.Day;
                        int JoMonth = joindate.Month;
                        int JoYear = joindate.Year;

                        DateTime releavingExperience = Convert.ToDateTime(entityObject.Relievingdate);
                        int Enodate1 = releavingExperience.Day;
                        int Enomonth1 = releavingExperience.Month;
                        int Enoyear1 = releavingExperience.Year;

                        DateTime currentdateexperience = DateTime.Today;

                        int nodate = currentdateexperience.Day;
                        int nomonth = currentdateexperience.Month;
                        int noyear = currentdateexperience.Year;

                        DateTime dtjoining = new DateTime(Enoyear, Enomonth, Enodate, 0, 0, 0);

                        DateTime currentdate1 = new DateTime(noyear, nomonth, nodate, 0, 0, 0);

                        DateTime dtrelevingE = new DateTime(Enoyear1, Enomonth1, Enodate1, 0, 0, 0);

                        TimeSpan resultrelnjoining = dtjoiningE.Subtract(dtrelevingE);
                        TimeSpan resultofjoining = dtjoiningE.Subtract(currentdate1);
                        TimeSpan resultofreleaving = dtrelevingE.Subtract(currentdate1);

                        if (resultofjoining.Days <= 0)
                        {
                            if (resultofreleaving.Days <= 0)
                            {
                                if (resultrelnjoining.Days <= 0)
                                {
                                    if (resultofj.Days > 0)
                                    {
                                        id = entityObject.EditEmployeeid;
                                        Mode = entityObject.Editmode;
                                        string experienceid = "";


                                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
                                        if (Mode != null)
                                        {
                                            if (id != null && experienceid != null && ((Mode == "e") || (Mode == "Convert")))
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);

                                            }
                                            else
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                                            }
                                        }
                                        else
                                        {
                                            if (id != null && experienceid != null)
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);
                                            }
                                            else
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                            }
                                        }

                                        if (entityObject.Org != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, entityObject.Org);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, "");
                                        }
                                        if (entityObject.Url != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, entityObject.Url);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, "");
                                        }
                                        if (entityObject.Designation != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, entityObject.Designation);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, "");
                                        }
                                        if (entityObject.Joiningdate != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, entityObject.Joiningdate);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, "");
                                        }

                                        if (entityObject.Relievingdate != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, entityObject.Relievingdate);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, "");
                                        }
                                        if (entityObject.Reportingto != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, entityObject.Reportingto);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, "");
                                        }
                                        if (entityObject.Contactno != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, entityObject.Contactno);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, "");
                                        }
                                        if (entityObject.Reason != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, entityObject.Reason);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, "");
                                        }
                                        if (entityObject.Lastsalary != 0)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, entityObject.Lastsalary);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, "");
                                        }
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Totalexp, entityObject.Totalexp);

                                        objVISDbCommand.objSqlCommand.Connection.Open();
                                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                                        objSqlCommand.Connection.Close();

                                        // SetData();
                                    }
                                    else
                                    {
                                        id = entityObject.EditEmployeeid;
                                        Mode = entityObject.Editmode;
                                        string experienceid = "";

                                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
                                        if (Mode != null)
                                        {
                                            if (id != null && experienceid != null && ((Mode == "e") || (Mode == "Convert")))
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);

                                            }
                                            else
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                                            }
                                        }
                                        else
                                        {
                                            if (id != null && experienceid != null)
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);
                                            }
                                            else
                                            {
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                                            }
                                        }

                                        if (entityObject.Org != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, entityObject.Org);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, "");
                                        }
                                        if (entityObject.Url != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, entityObject.Url);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, "");
                                        }
                                        if (entityObject.Designation != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, entityObject.Designation);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, "");
                                        }
                                        if (entityObject.Joiningdate != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, entityObject.Joiningdate);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, "");
                                        }

                                        if (entityObject.Relievingdate != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, entityObject.Relievingdate);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, "");
                                        }
                                        if (entityObject.Reportingto != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, entityObject.Reportingto);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, "");
                                        }
                                        if (entityObject.Contactno != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, entityObject.Contactno);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, "");
                                        }
                                        if (entityObject.Reason != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, entityObject.Reason);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, "");
                                        }
                                        if (entityObject.Lastsalary != 0)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, entityObject.Lastsalary);
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, "");
                                        }
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Totalexp, entityObject.Totalexp);

                                        objVISDbCommand.objSqlCommand.Connection.Open();
                                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                                        objSqlCommand.Connection.Close();

                                    }
                                }

                            }

                        }

                    }
                    else if (checkvar2 == 1)
                    {
                        DateTime releavingExperience = Convert.ToDateTime(entityObject.Relievingdate);
                        int Enodate1 = releavingExperience.Day;
                        int Enomonth1 = releavingExperience.Month;
                        int Enoyear1 = releavingExperience.Year;

                        DateTime currentdateexperience = DateTime.Today;

                        int nodate = currentdateexperience.Day;
                        int nomonth = currentdateexperience.Month;
                        int noyear = currentdateexperience.Year;

                        System.DateTime currentdate1 = new System.DateTime(noyear, nomonth, nodate, 0, 0, 0);

                        System.DateTime dtrelevingE = new System.DateTime(Enoyear1, Enomonth1, Enodate1, 0, 0, 0);
                        System.TimeSpan resultofreleaving = dtrelevingE.Subtract(currentdate1);
                        if (resultofreleaving.Days <= 0)
                        {


                            if (id != null && (Mode == "e" || Mode == "Convert"))
                            {
                                base.objSqlCommand.Parameters.Clear();
                                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCheckExperience;


                                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ExperienceCheck");
                                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                                {
                                    base.objSqlCommand.Connection.Open();
                                }
                                SqlDataAdapter daExperienceMaster = new SqlDataAdapter(base.objSqlCommand);
                                DataSet dsExperienceMaster = new DataSet();
                                daExperienceMaster.Fill(dsExperienceMaster);
                                base.objSqlCommand.Connection.Close();


                                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand.objSqlCommand.Parameters.Clear();
                                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;

                                if (dsExperienceMaster.Tables[0].Rows.Count == 0)
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                }
                                else
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                                }
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            }
                            if (entityObject.expyear != 0 || entityObject.expmonth != 0)
                            {
                                int expyear = 0;
                                int expMonth = 0;
                                if (entityObject.expyear != 0)
                                {
                                    expyear = Convert.ToInt32(entityObject.relevanceExpYear);
                                }
                                if (entityObject.relevanceExpMonth != null)
                                {
                                    expMonth = Convert.ToInt32(entityObject.relevanceExpMonth);
                                }
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelevanceExp, expyear + "." + expMonth);

                            }
                            if (!string.IsNullOrEmpty(entityObject.hdnProjectsToSave.ToString()))
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ProjectHandled, entityObject.hdnProjectsToSave.Substring(0, entityObject.hdnProjectsToSave.Length - 1));

                            }
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_experiencesummary, entityObject.experiencesummary);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Skills, entityObject.Skills);

                        }

                    }
                    else if (checkvar == 1)
                    {
                        DateTime joinExperience1 = Convert.ToDateTime(entityObject.Joiningdate);
                        int Enodate1 = joinExperience1.Day;
                        int Enomonth1 = joinExperience1.Month;
                        int Enoyear1 = joinExperience1.Year;

                        DateTime currentdateexperience = DateTime.Today;

                        int nodate = currentdateexperience.Day;
                        int nomonth = currentdateexperience.Month;
                        int noyear = currentdateexperience.Year;

                        DateTime dtjoining = new DateTime(Enoyear1, Enomonth1, Enodate1, 0, 0, 0);
                        DateTime currentdate1 = new DateTime(noyear, nomonth, nodate, 0, 0, 0);
                        TimeSpan resultofjoining = dtjoining.Subtract(currentdate1);

                        if (resultofjoining.Days <= 0)
                        {

                            id = entityObject.EditEmployeeid;
                            Mode = entityObject.Editmode;
                            string experienceid = "";


                            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
                            if (Mode != null)
                            {
                                if (id != null && experienceid != null && ((Mode == "e") || (Mode == "Convert")))
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);

                                }
                                else
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                                }
                            }
                            else
                            {
                                if (id != null && experienceid != null)
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);
                                }
                                else
                                {
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                }
                            }

                            if (entityObject.Org != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, entityObject.Org);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, "");
                            }
                            if (entityObject.Url != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, entityObject.Url);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, "");
                            }
                            if (entityObject.Designation != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, entityObject.Designation);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, "");
                            }
                            if (entityObject.Joiningdate != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, entityObject.Joiningdate);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, "");
                            }

                            if (entityObject.Relievingdate != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, entityObject.Relievingdate);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, "");
                            }
                            if (entityObject.Reportingto != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, entityObject.Reportingto);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, "");
                            }
                            if (entityObject.Contactno != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, entityObject.Contactno);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, "");
                            }
                            if (entityObject.Reason != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, entityObject.Reason);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, "");
                            }
                            if (entityObject.Lastsalary != 0)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, entityObject.Lastsalary);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, "");
                            }
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Totalexp, entityObject.Totalexp);

                            objVISDbCommand.objSqlCommand.Connection.Open();
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                            objSqlCommand.Connection.Close();
                            //  SetData();


                        }

                    }
                    else
                    {


                        id = entityObject.EditEmployeeid;
                        Mode = entityObject.Editmode;
                        string experienceid = null;

                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
                        if (Mode != null)
                        {
                            if (id != null && experienceid != null && ((Mode == "e") || (Mode == "Convert")))
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);

                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                            }
                        }
                        else
                        {
                            if (id != null && experienceid != null)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expid, experienceid);
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            }
                        }

                        if (entityObject.Org != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, entityObject.Org);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, "");
                        }
                        if (entityObject.Url != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, entityObject.Url);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, "");
                        }
                        if (entityObject.Designation != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, entityObject.Designation);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, "");
                        }
                        if (entityObject.Joiningdate != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, entityObject.Joiningdate);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, "");
                        }

                        if (entityObject.Relievingdate != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, entityObject.Relievingdate);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, "");
                        }
                        if (entityObject.Reportingto != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, entityObject.Reportingto);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, "");
                        }
                        if (entityObject.Contactno != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, entityObject.Contactno);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, "");
                        }
                        if (entityObject.Reason != null)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, entityObject.Reason);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reason, "");
                        }
                        if (entityObject.Lastsalary != 0)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, entityObject.Lastsalary);
                        }
                        else
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, "");
                        }
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Totalexp, entityObject.Totalexp);

                        objVISDbCommand.objSqlCommand.Connection.Open();
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                        objSqlCommand.Connection.Close();
                        // SetData();

                    }
                }
            }
            catch (Exception ex)
            {
                //return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }
        public string btnAddExp(EmpInfoTabular entityObject)
        {
            id = entityObject.EditEmployeeid;


            Mode = entityObject.Editmode;

            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.Parameters.Clear();
            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
            try
            {


                if (Mode != null)
                {

                    if (Mode == "Convert")

                    {

                        using (base.objSqlCommand.Connection)
                        {
                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procprojectListGet;

                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "NonWbsProject");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsCandidatePreviousDetails = new DataSet();
                            sda.Fill(dsCandidatePreviousDetails);

                            base.objSqlCommand.Connection.Close();
                            if (dsCandidatePreviousDetails.Tables[0].Rows.Count > 0)
                            {

                                for (int i = 0; i < dsCandidatePreviousDetails.Tables[0].Rows.Count; i++)
                                {
                                    base.objSqlCommand.Parameters.Clear();
                                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procprojectListGet;

                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "GetPosition");
                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_positionName, dsCandidatePreviousDetails.Tables[0].Rows[i]["Designation"].ToString());

                                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                                    {
                                        base.objSqlCommand.Connection.Open();
                                    }
                                    SqlDataAdapter daposition = new SqlDataAdapter(base.objSqlCommand);
                                    DataSet dsposition = new DataSet();
                                    daposition.Fill(dsposition);

                                    base.objSqlCommand.Connection.Close();

                                    objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperience_Add;
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);


                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Org, dsCandidatePreviousDetails.Tables[0].Rows[i]["OrganizationName"].ToString());
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Url, null);
                                    if (dsposition.Tables[0].Rows.Count > 0)
                                    {
                                        if (dsposition.Tables[0].Rows[0]["id"] != null)
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, Convert.ToInt32(dsposition.Tables[0].Rows[0]["id"].ToString()));
                                        }
                                        else
                                        {
                                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, null);
                                        }
                                    }
                                    else
                                    {
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designation, null);
                                    }
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastsalary, Convert.ToInt32(dsCandidatePreviousDetails.Tables[0].Rows[i]["Salary"].ToString()));
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Joiningdate, Convert.ToDateTime(dsCandidatePreviousDetails.Tables[0].Rows[i]["JoiningDate"].ToString()));
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, Convert.ToDateTime(dsCandidatePreviousDetails.Tables[0].Rows[i]["RelievingDate"].ToString()));
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Reportingto, null);
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Contactno, null);
                                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Relievingdate, null);

                                    objVISDbCommand.objSqlCommand.Connection.Open();
                                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                                    objSqlCommand.Connection.Close();
                                    SetExperienceData(id);
                                }
                            }
                        }

                    }
                    else
                    {
                        checkExperience(entityObject);
                    }
                }
                else
                {
                    checkExperience(entityObject);
                }
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
            return null;


        }
        protected void SavePastExperience(EmpInfoTabular entityObject)
        {


        }
        private string GetProjects()
        {
            DataSet dsProjects = new DataSet();
            string hdnProject;
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procExperienceProjectGet;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "GetProjects");

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);

                sda.Fill(dsProjects);

                base.objSqlCommand.Connection.Close();
                if (dsProjects != null && dsProjects.Tables[0].Rows.Count > 0)
                {


                    foreach (DataRow dr1 in dsProjects.Tables[0].Rows)
                    {
                        hdnProject = dr1.ItemArray[0].ToString() + ",";
                        var var = hdnProject;
                        return var;
                    }
                }

            }
            return null;

        }
        protected DataTable SetExperienceData(string id)
        {
            List<EmpInfoTabular> objListToReturn1 = new List<EmpInfoTabular>();
            try
            {
                GetProjects();

                DataSet dsExp = new DataSet();
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procprojectListGet;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "GetExperience");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = dsExp.Tables[0];

                da.Fill(dsExp);

                base.objSqlCommand.Connection.Close();


                if (dsExp != null)
                {
                    if (dsExp.Tables[2].Rows.Count > 0)
                    {
                        DataTable Detail = new DataTable();
                        string name = dsExp.Tables[2].Rows[0]["Employee_Name"].ToString();

                        string lblmsgRecordExist = "Employee Name: " + name.ToString();
                        string lbltotalExp = dsExp.Tables[2].Rows[0]["TotalExp"].ToString().Split('.')[0]
                                    + " Year " + dsExp.Tables[2].Rows[0]["TotalExp"].ToString().Split('.')[1] + " Month";

                        string technology = dsExp.Tables[2].Rows[0]["Technology"].ToString();
                        string[] techarr = technology.Split(',');
                        List<ListItem> RemoveEmployeeIndex = new List<ListItem>();
                        List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procTechnologyListboxbind;



                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daSkill = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dtSkill = new DataSet();
                        daSkill.Fill(dtSkill);



                        for (int i = 0; i < techarr.Length; i++)
                        {
                            for (int k = 0; k < dtSkill.Tables[0].Rows.Count; k++)
                            {
                                if (dtSkill.Tables[0].Rows[i].ToString() == techarr[i].ToString())
                                {
                                    List<ListItem> lsbTechnicalSkill = new List<ListItem>();
                                    ListItem item = new ListItem();
                                    item.Text = dtSkill.Tables[0].Rows[i]["TechnologyID"].ToString();
                                    item.Value = dtSkill.Tables[0].Rows[i]["technologyName"].ToString();
                                    lsbTechnicalSkill.Add(item);
                                    RemoveEmployeeIndex.Add(item);

                                }
                            }
                            for (int iCount = 0; iCount < RemoveEmployeeIndex.Count; iCount++)
                            {
                                string dtskill = dtSkill.Tables[0].Rows.ToString();
                                string Removeid = Convert.ToString(RemoveEmployeeIndex[iCount]);
                                dtskill.Remove(Convert.ToInt32(Removeid));
                            }
                        }
                        string txtTechnicalExpertise = dsExp.Tables[2].Rows[0]["OtherTechnology"].ToString();
                    }
                    if (dsExp.Tables[0].Rows.Count > 0)
                    {
                        return dt;


                    }

                    if (dsExp.Tables[1].Rows.Count > 0)
                    {
                        string txtExperienceSummary = dsExp.Tables[1].Rows[0]["ExperienceSummary"].ToString();
                        string txtSkillRemarks = dsExp.Tables[1].Rows[0]["Skills"].ToString();
                        // var experience = dsExperienceMaster.Tables[0].Rows[0]["RelevanceExperience"].ToString().Split(',')[0];
                        if (dsExp.Tables[1].Rows[0]["RelevanceExperience"].ToString() != "")
                        {
                            string txtrelevanceExpYear = dsExp.Tables[1].Rows[0]["RelevanceExperience"].ToString().Split('.')[0];
                            string txtrelevanceExpMonth = dsExp.Tables[1].Rows[0]["RelevanceExperience"].ToString().Split('.')[1];
                        }
                        else
                        {
                            //  txtrelevanceExpYear.Text = "0";
                            //   txtrelevanceExpMonth.Text = "0";
                        }
                        if (dsExp.Tables[1].Rows[0]["Projectshandled"] != null)
                        {

                            string[] tagarr = dsExp.Tables[1].Rows[0]["Projectshandled"].ToString().Split(',');
                            for (int i = 0; i < tagarr.Length; i++)
                            {
                                HtmlGenericControl newLi = new HtmlGenericControl("li");
                                string targetid = tagarr[i].ToString();
                                UList(targetid);
                            }
                        }
                    }
                }
                return null;
            }
            catch (Exception)
            {

            }
            return null;
        }

        private HtmlGenericControl UList(string targetid) // For <ul> tag

        {

            HtmlGenericControl newLi = new HtmlGenericControl("li");
            newLi.InnerHtml += targetid;

            return newLi;

        }


        #endregion

        #region Salary
        public string SaveSalary(EmpInfoTabular entityObject)
        {

            try
            {

                Mode = entityObject.Editmode;
                id = entityObject.EditEmployeeid;
                string mode = "";
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                using (base.objSqlCommand.Connection)
                {
                    if (Mode != null)
                    {
                        if (id != null && (Mode == "e" || Mode == "Convert"))
                        {
                            base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCurrentSalary_Add;


                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "checksalarydata");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daCurrentSalary = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsCurrentSalary = new DataSet();
                            daCurrentSalary.Fill(dsCurrentSalary);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCurrentSalary_Add;

                            if (dsCurrentSalary.Tables[0].Rows.Count == 0)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                                mode = "add";
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                mode = "update";
                            }
                        }
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    }


                    if (mode == "add")
                    {
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCurrentSalary_Add;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "JoiningDesignation");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daJoiDesig = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsJoiDesig = new DataSet();
                        daJoiDesig.Fill(dsJoiDesig);



                        if (dsJoiDesig != null && dsJoiDesig.Tables.Count > 0)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CurrentDesignation, dsJoiDesig.Tables[0].Rows[0]["JoiningDesignation"].ToString());
                        }
                    }
                    if (mode == " ")
                    {
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procCurrentSalary_Add;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "JoiningDesignationSelect");

                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }

                        SqlDataAdapter daJoiDesig = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsJoiDesig = new DataSet();
                        daJoiDesig.Fill(dsJoiDesig);



                        if (dsJoiDesig != null && dsJoiDesig.Tables.Count > 0)
                        {
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CurrentDesignation, dsJoiDesig.Tables[0].Rows[0]["JoiningDesignation"].ToString());
                        }
                    }
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Salary, entityObject.Salary);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Bankname, entityObject.Bankname);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Accountno, entityObject.Accountno);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ISPFApplicable, entityObject.ISPFApplicable);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_PFAccountNo, entityObject.PFAccountNo);
                    if (entityObject.AdharNumber != 0)
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AdharNumber, entityObject.AdharNumber);
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AdharNumber, 0);
                    }


                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UANNumber, entityObject.UANNumber);

                    objVISDbCommand.objSqlCommand.Connection.Open();
                    intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    objVISDbCommand.objSqlCommand.Parameters.Clear();
                    objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procManagesalary;
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SalaryRangeId, entityObject.SalaryRangeId);
                    objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    objSqlCommand.Connection.Close();
                    return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

                }
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        #endregion

        #region Attendance
        public string SaveAttendance(EmpInfoTabular entityObject)
        {

            try
            {
                Mode = entityObject.Editmode;
                id = entityObject.EditEmployeeid;

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procAttendance_Add;
                if (Mode != null)
                {
                    if (id != null && (Mode == "e" || Mode == "Convert"))
                    {

                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                    }
                }
                else
                {

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                }




                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Intime, entityObject.Intime);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Outitme, entityObject.Outitme);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Intimesat, entityObject.Intimesat);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Outtimesat, entityObject.Outtimesat);


                if (entityObject.Grace != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Grace, entityObject.Grace);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Grace, 0);
                }

                if (entityObject.SatGrace != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SatGrace, entityObject.SatGrace);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SatGrace, 0);
                }

                if (entityObject.EmployeeID != 0)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Leaveapproveby, entityObject.EmployeeID);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Leaveapproveby, 0);
                }

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsAlertRequired, entityObject.IsAlertRequired);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AccessCardId, entityObject.AccessCardId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AttendancePolicy, entityObject.AttendancePolicy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                string value = entityObject.Nwdday;
                SaveNwdDay(entityObject.Nwdday);

                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;




            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        public DataTable GetAttendanceDetail(int AccessCardId, long UserId)
        {
            DataTable dt = new DataTable();
            DataRow dr = dt.NewRow();
            DataSet dataSet = new DataSet();
            dt.Columns.Add(new DataColumn("Output", typeof(string)));
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procAttencessdeatilcheck;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AccessCardId, AccessCardId);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaProject1 = new SqlDataAdapter(base.objSqlCommand);

                DaProject1.Fill(dataSet);
                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    if (dataSet.Tables[0].Rows[0]["Output"].ToString() == "Already")
                    {
                        string value = "true";
                        dr["Output"] = value;
                    }
                    else
                    {
                        string value = "false";
                        dr["Output"] = value;
                    }
                }
                else
                {
                    string value = "Null";
                    dr["Output"] = value;
                }
                dt.Rows.Add(dr);
            }


            return dt;

        }
        public string SaveNwdDay(string Nwdday)
        {

            string[] NWDday = Nwdday.Split(',');

            string id = "484";
            string mode = "";
            if (id != null && mode == "e")
            {
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeNwd");
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter daEmpNwd = new SqlDataAdapter(base.objSqlCommand);
                    DataSet dsEmpNwd = new DataSet();
                    daEmpNwd.Fill(dsEmpNwd);

                    if (dsEmpNwd.Tables[0].Rows.Count > 0)
                    {


                        VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "DeleteEmplyeeNwd");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Connection.Open();
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                        objSqlCommand.Connection.Close();
                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "SelectEmplyeeNwd");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daNwdHistory = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsNwdHistory = new DataSet();
                        daNwdHistory.Fill(dsNwdHistory);
                        if (dsNwdHistory.Tables[0].Rows.Count > 0)
                        {
                            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "deleteEmplyeeNwd");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Connection.Open();
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                            objSqlCommand.Connection.Close();
                        }

                    }


                }


            }
            // start : add Non working days
            else
            {
                DateTime dtNow = System.DateTime.Now;
                string strNow = dtNow.ToString("yyyyMMdd");

                int daysInMonth = System.DateTime.DaysInMonth(dtNow.Year, dtNow.Month);
                DateTime dtEnd = new DateTime(dtNow.Year, 12, daysInMonth);
                string strEnd = dtEnd.ToString("yyyyMMdd");

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                //int nwdId = 12;
                foreach (string day in NWDday)
                {
                    nwdId = Convert.ToInt32(day);

                    using (base.objSqlCommand.Connection)
                    {
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "NwdDaySelect");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, nwdId);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daNwd = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsNwd = new DataSet();
                        daNwd.Fill(dsNwd);
                        string strDay = dsNwd.Tables[0].Rows[0]["day"].ToString();
                        string strDuration = dsNwd.Tables[0].Rows[0]["duration"].ToString();
                        string strOcc = dsNwd.Tables[0].Rows[0]["occurrence"].ToString();

                        base.objSqlCommand.Parameters.Clear();

                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procFunctioncallNwd;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_strNow, strNow);
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_strEnd, strEnd);
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_strDay, strDay);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daList = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsList = new DataSet();
                        daList.Fill(dsList);

                        string val = "484";

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "insertNwdDay");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, val);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_nwdId, nwdId);
                        objVISDbCommand.objSqlCommand.Connection.Open();
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                        for (int j = 0; j < dsList.Tables[0].Rows.Count; j++)
                        {
                            string stDate = dsList.Tables[0].Rows[j]["Dt"].ToString();
                            DateTime dtFromNon = DateTime.Parse(stDate, provider, System.Globalization.DateTimeStyles.NoCurrentDateDefault);

                            Boolean addRecord = false;
                            //string duration = lstNonWorkingDays.Items[i].Attribut

                            if (strOcc == "Every")
                            {
                                addRecord = true;
                            }
                            else if (strOcc == "Even")
                            {
                                int weekNum = weekOfYear(dtFromNon.Year, dtFromNon.Month, dtFromNon.Day);

                                if (weekNum % 2 == 0)
                                {
                                    addRecord = true;
                                }
                            }
                            else if (strOcc == "Odd")
                            {
                                int weekNum = weekOfYear(dtFromNon.Year, dtFromNon.Month, dtFromNon.Day);
                                if (weekNum % 2 != 0)
                                {
                                    addRecord = true;
                                }
                            }
                            else if (strOcc == "Last")
                            {
                                int year = dtFromNon.Year;
                                int month = dtFromNon.Month;
                                int days = System.DateTime.DaysInMonth(year, month);

                                DateTime dtStart = new DateTime(year, month, 1);
                                int totalWeek = Weeks(year, month, dtStart.DayOfWeek);

                                DateTime date = dtFromNon;
                                DateTime beginningOfMonth = new DateTime(date.Year, date.Month, 1);

                                while (date.Date.AddDays(1).DayOfWeek != CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek)
                                    date = date.AddDays(1);

                                int tempInt = (int)Math.Truncate((double)date.Subtract(beginningOfMonth).TotalDays / 7f) + 1;

                                if (tempInt == totalWeek)
                                {
                                    addRecord = true;
                                }
                            }
                            else
                            {
                                DateTime date = dtFromNon;
                                DateTime beginningOfMonth = new DateTime(date.Year, date.Month, 1);

                                while (date.Date.AddDays(1).DayOfWeek != CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek)
                                    date = date.AddDays(1);

                                int tempInt = (int)Math.Truncate((double)date.Subtract(beginningOfMonth).TotalDays / 7f) + 1;

                                //int intPart = dtFromNon.Day / 7;
                                if (tempInt.ToString() == strOcc)
                                {
                                    addRecord = true;
                                }
                            }

                            if (addRecord)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.Clear();
                                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procNowworkingcheck;
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "InsertNwdHistory");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, val);
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_dtFromNon, dtFromNon.ToString("yyyyMMdd"));
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_strDuration, strDuration);
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_nwdId, nwdId);

                                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                                objSqlCommand.Connection.Close();

                            }
                        }
                    }
                    break;
                }

            }


            return "Save data";
        }
        protected int weekOfYear(int year, int month, int date)
        {
            DateTime dt = new DateTime(year, month, date);

            DateTime dt2 = new DateTime(dt.Year, 1, 1);

            int intDiff = 0;
            if (dt2.DayOfWeek == DayOfWeek.Sunday)
            {
                intDiff = 0;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Monday)
            {
                intDiff = 6;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Tuesday)
            {
                intDiff = 5;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Wednesday)
            {
                intDiff = 4;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Thursday)
            {
                intDiff = 3;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Friday)
            {
                intDiff = 2;
            }
            else if (dt2.DayOfWeek == DayOfWeek.Saturday)
            {
                intDiff = 1;
            }

            int i = dt.DayOfYear;

            int j = i % 7;
            int k = i / 7;

            int answer = 0;

            if (j > intDiff)
            {
                answer = 1 + k + 1;
            }
            else
            {
                answer = 1 + k;
            }

            return answer;
        }

        private static int Weeks(int year, int month, DayOfWeek wkstart)
        {
            DateTime first = new DateTime(year, month, 1);
            int firstwkday = (int)first.DayOfWeek;
            int otherwkday = (int)wkstart;

            int offset = ((otherwkday + 7) - firstwkday) % 7;

            double weeks = (double)(DateTime.DaysInMonth(year, month) - offset) / 7d;

            return (int)Math.Ceiling(weeks);
        }
        #endregion

        #region OfficialDeatil
        public string SaveOfficial(EmpInfoTabular entityObject)
        {

            try
            {
                id = entityObject.EditEmployeeid; //UserID get Edit 

                Mode = entityObject.Editmode; //mode pass Edit 

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procOfficialDetail_Add;
                if (id != null)
                {
                    using (base.objSqlCommand.Connection)
                    {
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procOfficialDetail_Add;
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "OfficialDetail");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                        DataSet ds = new DataSet();
                        da.Fill(ds);

                        base.objSqlCommand.Connection.Close();

                        if (Mode != null)
                        {
                            if (ds.Tables.Count > 0)
                            {
                                if (id != null && Mode == "e")
                                {
                                    base.objSqlCommand.Parameters.Clear();
                                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procOfficialDetail_Add;
                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "OfficialDetail");
                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                                    {
                                        base.objSqlCommand.Connection.Open();
                                    }
                                    SqlDataAdapter daOfficialDetail = new SqlDataAdapter(base.objSqlCommand);
                                    DataSet dsOfficialDetail = new DataSet();
                                    daOfficialDetail.Fill(dsOfficialDetail);

                                    base.objSqlCommand.Connection.Close();

                                    if (dsOfficialDetail.Tables[0].Rows.Count == 0)
                                    {

                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                                    }
                                    else
                                    {
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, ds.Tables[0].Rows[0]["Id"]);


                                    }
                                }
                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                            }
                        }


                    }

                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                }

                if (entityObject.Verveemail != null)
                {

                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Verveemail, entityObject.Verveemail);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Verveemail, "");
                }


                if (entityObject.Vervepassword != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Vervepassword, entityObject.Vervepassword);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Vervepassword, "");
                }

                if (entityObject.Gmail != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Gmail, entityObject.Gmail);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Gmail, "");
                }

                if (entityObject.Gmailpassword != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Gmailpassword, entityObject.Gmailpassword);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Gmailpassword, "");
                }
                if (entityObject.Yahoo != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Yahoo, entityObject.Yahoo);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Yahoo, "");
                }
                if (entityObject.Yahoopassword != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Yahoopassword, entityObject.Yahoopassword);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Yahoopassword, "");
                }
                if (entityObject.Skype != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Skype, entityObject.Skype);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Skype, "");
                }
                if (entityObject.Skypepassword != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Skypepassword, entityObject.Skypepassword);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Skypepassword, "");
                }
                if (entityObject.Othersitename != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Othersitename, entityObject.Othersitename);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Othersitename, "");
                }
                if (entityObject.Otherid != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Otherid, entityObject.Otherid);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Otherid, "");
                }
                if (entityObject.Otherpassword != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Otherpassword, entityObject.Otherpassword);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Otherpassword, "");
                }


                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }
        #endregion


        #region Joining
        public string SaveJoining(EmpInfoTabular entityObject)
        {

            try
            {


                id = entityObject.EditEmployeeid;
                Mode = entityObject.Editmode;


                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;

                if (!string.IsNullOrEmpty(Mode))
                {
                    if (id != null && Mode == "e" || Mode == "Convert")
                    {
                        using (base.objSqlCommand.Connection)
                        {
                            base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;


                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "joingdetailscheck");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daJoiningDocument = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsJoiningDocument = new DataSet();
                            daJoiningDocument.Fill(dsJoiningDocument);
                            base.objSqlCommand.Parameters.Clear();



                            if (dsJoiningDocument.Tables[0].Rows.Count == 0)
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);

                            }
                            else
                            {
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            }
                        }
                    }
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                }

                if (entityObject.Panno != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Panno, entityObject.Panno);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Panno, "");
                }
                if (entityObject.Passportno != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Passportno, entityObject.Passportno);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Passportno, "");
                }

                if (entityObject.Placeofissue != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Placeofissue, entityObject.Placeofissue);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Placeofissue, "");
                }

                if (entityObject.Issuedate != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Issuedate, entityObject.Issuedate);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Issuedate, "");
                }

                if (entityObject.Expirydate != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expirydate, entityObject.Expirydate);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Expirydate, "");
                }
                if (entityObject.Other != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other, entityObject.Other);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other, "");
                }
                if (entityObject.Other0 != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other0, entityObject.Other0);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other0, "");
                }
                if (entityObject.Other1 != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other1, entityObject.Other1);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Other1, "");
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;


                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "JoingCheck");
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter DaJoiningDocument = new SqlDataAdapter(base.objSqlCommand);
                    DataSet DsJoiningDocument = new DataSet();
                    DaJoiningDocument.Fill(DsJoiningDocument);
                    base.objSqlCommand.Parameters.Clear();

                    if (DsJoiningDocument.Tables[0].Rows[0]["IsRelevingLetter"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsRelevingLetter"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["RelievingLetterFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveRelievingLetter");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelievingLetterFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isrelevingletter, entityObject.Isrelevingletter);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.RelievingLetterFileName != null)
                        {
                            string filename = entityObject.RelievingLetterFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveRelievingLetter");
                            string[] arr = filename.Split('.');
                            string prefix = arr[0].ToString();
                            filename = "";
                            filename += prefix.ToString() + "-Rel-" + id + "." + type.ToString();
                            string filedir = "upload/JoiningDocuments/" + filename;


                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelievingLetterFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isrelevingletter, entityObject.Isrelevingletter);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();




                        }
                    }
                    if (DsJoiningDocument.Tables[0].Rows[0]["IsExperienceLetter"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsExperienceLetter"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["ExperienceLetterFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveExperienceLetter");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ExperienceLetterFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isexperienceletter, entityObject.Isexperienceletter);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.ExperienceLetterFileName != null)
                        {
                            string filename = entityObject.ExperienceLetterFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveExperienceLetter");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelievingLetterFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isrelevingletter, entityObject.Isrelevingletter);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                        }
                    }

                    if (DsJoiningDocument.Tables[0].Rows[0]["IsSalarySlip"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsSalarySlip"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["LastSalarySlipFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveLastSalarySlip");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LastSalarySlipFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Issalaryslip, entityObject.Issalaryslip);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.LastMarksheetFileName != null)
                        {
                            string filename = entityObject.ExperienceLetterFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveLastSalarySlip");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LastSalarySlipFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Issalaryslip, entityObject.Issalaryslip);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                        }
                    }


                    if (DsJoiningDocument.Tables[0].Rows[0]["IsDegreeCertificate"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsDegreeCertificate"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["DegreeCertificateFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveDegreeCertificate");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelievingLetterFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsDegreeCertificate, entityObject.IsDegreeCertificate);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.DegreeCertificateFileName != null)
                        {
                            string filename = entityObject.DegreeCertificateFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveDegreeCertificate");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_RelievingLetterFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsDegreeCertificate, entityObject.IsDegreeCertificate);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();





                        }
                    }

                    if (DsJoiningDocument.Tables[0].Rows[0]["IsMarkSheet"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsMarkSheet"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["LastMarksheetFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveLastMarksheet");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LastMarksheetFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsMarkSheet, entityObject.IsMarkSheet);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.LastMarksheetFileName != null)
                        {
                            string filename = entityObject.LastMarksheetFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveLastMarksheet");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_LastMarksheetFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsMarkSheet, entityObject.IsMarkSheet);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();





                        }
                    }
                    if (DsJoiningDocument.Tables[0].Rows[0]["IsPassport"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsPassport"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["PassportFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemovePassport");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_PassportFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsPassport, entityObject.IsPassport);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.PassportFileName != null)
                        {
                            string filename = entityObject.PassportFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemovePassport");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_PassportFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_IsPassport, entityObject.IsPassport);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }



                    if (DsJoiningDocument.Tables[0].Rows[0]["Isdrivinglicense"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["Isdrivinglicense"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["DrivingLicenseFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveDrivingLicense");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_DrivingLicenseFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isdrivinglicense, entityObject.Isdrivinglicense);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.DrivingLicenseFileName != null)
                        {
                            string filename = entityObject.DrivingLicenseFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveDrivingLicense");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_DrivingLicenseFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isdrivinglicense, entityObject.Isdrivinglicense);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }




                    if (DsJoiningDocument.Tables[0].Rows[0]["Ispancard"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["Ispancard"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["PANCardFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemovePANCard");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_DrivingLicenseFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Ispancard, entityObject.Ispancard);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.PANCardFileName != null)
                        {
                            string filename = entityObject.PANCardFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemovePANCard");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_PANCardFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Ispancard, entityObject.Ispancard);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }


                    if (DsJoiningDocument.Tables[0].Rows[0]["IsCurriculamVitae"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["IsCurriculamVitae"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["CurriculamVitaeFilName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveCurriculamVitae");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CurriculamVitaeFilName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Iscv, entityObject.Iscv);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.CurriculamVitaeFilName != null)
                        {
                            string filename = entityObject.CurriculamVitaeFilName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveCurriculamVitae");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CurriculamVitaeFilName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Iscv, entityObject.Iscv);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }



                    if (DsJoiningDocument.Tables[0].Rows[0]["Isother"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["Isother"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["OtherFileName"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother, entityObject.Isother);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.OtherFileName != null)
                        {
                            string filename = entityObject.OtherFileName;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother, entityObject.Isother);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }




                    if (DsJoiningDocument.Tables[0].Rows[0]["Isother0"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["Isother0"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["OtherFileName0"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther0");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName0, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother0, entityObject.Isother0);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.OtherFileName0 != null)
                        {
                            string filename = entityObject.OtherFileName0;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther0");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName0, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother0, entityObject.Isother0);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }

                    if (DsJoiningDocument.Tables[0].Rows[0]["Isother1"].ToString() == "True" && DsJoiningDocument.Tables[0].Rows[0]["Isother1"] != null)
                    {
                        string FileName = DsJoiningDocument.Tables[0].Rows[0]["OtherFileName1"].ToString();

                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther1");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName1, FileName.ToString());
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother1, entityObject.Isother1);
                        intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                    }
                    else
                    {
                        if (entityObject.OtherFileName1 != null)
                        {
                            string filename = entityObject.OtherFileName1;
                            string type = filename.Substring(filename.LastIndexOf(".") + 1);

                            objVISDbCommand.objSqlCommand.Parameters.Clear();
                            objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procJoiningDocument_Add;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "RemoveOther1");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_OtherFileName1, filename.ToString());
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isother1, entityObject.Isother1);
                            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                        }
                    }
                }
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;




            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        #endregion

        #region leave
        public string AddLeave(EmpInfoTabular entityObject)
        {

            try
            {
                id = entityObject.EditEmployeeid; //UserID get

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procAdjustedLeaveAdd;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "InsertLeave");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Leavetype, entityObject.Leavetype);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AdjustedValue, entityObject.AdjustedValue);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Transactiontype, entityObject.Transactiontype);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isadjusted, entityObject.Isadjusted);


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Remarks, entityObject.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);


                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
                return intAffectedRecords >= 2 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }

            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }
        public DataTable FillLeaveDeatil()
        {

            DataTable dtleave = new DataTable();
            dtleave = new System.Data.DataTable();
            dtleave.Columns.Add("OpeningSL", Type.GetType("System.String"));
            dtleave.Columns.Add("OpeningCL", Type.GetType("System.String"));
            dtleave.Columns.Add("availedcl", Type.GetType("System.String"));
            dtleave.Columns.Add("availedsl", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailPLSL", Type.GetType("System.String"));
            dtleave.Columns.Add("balancecl", Type.GetType("System.String"));
            dtleave.Columns.Add("balancesl", Type.GetType("System.String"));
            dtleave.Columns.Add("CarryCL", Type.GetType("System.String"));
            dtleave.Columns.Add("CarryForwardCL", Type.GetType("System.String"));
            dtleave.Columns.Add("CarrySL", Type.GetType("System.String"));
            dtleave.Columns.Add("CarryForwardSL", Type.GetType("System.String"));
            dtleave.Columns.Add("BalLeft", Type.GetType("System.String"));
            dtleave.Columns.Add("ExpireLeaveSL", Type.GetType("System.String"));
            dtleave.Columns.Add("ExpireLeaveCL", Type.GetType("System.String"));
            dtleave.Columns.Add("accuredUCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AccuredUSL", Type.GetType("System.String"));
            dtleave.Columns.Add("AccuredCCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AccuredCSL", Type.GetType("System.String"));
            dtleave.Columns.Add("TotalCL", Type.GetType("System.String"));
            dtleave.Columns.Add("TotalSL", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailableCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailableSL", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailAUPLCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailAUPLSL", Type.GetType("System.String"));
            dtleave.Columns.Add("AvailPLCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AdjustmentCL", Type.GetType("System.String"));
            dtleave.Columns.Add("AdjustmentSL", Type.GetType("System.String"));
            dtleave.Columns.Add("BalanceCurCL", Type.GetType("System.String"));
            dtleave.Columns.Add("BalanceCurSL", Type.GetType("System.String"));
            dtleave.Columns.Add("leavestartdate", Type.GetType("System.String"));
            dtleave.Columns.Add("leaveenddate", Type.GetType("System.String"));

            dr = dtleave.NewRow();

            DateTime leavestartdate;
            int enddatedays;
            DateTime leaveenddate;
            double month;
            double op_sl;
            if (System.DateTime.Today.Month == 1)
            {
                leavestartdate = new DateTime(System.DateTime.Today.Year, System.DateTime.Today.Month, 1);

                dr["leavestartdate"] = leavestartdate.ToString("dd/MM/yyyy");
                enddatedays = System.DateTime.DaysInMonth(System.DateTime.Today.Year, System.DateTime.Today.Month);
                leaveenddate = new DateTime(System.DateTime.Today.Year, System.DateTime.Today.Month, enddatedays);
                dr["leaveenddate"] = leaveenddate.ToString("dd/MM/yyyy");
            }
            else
            {
                leavestartdate = new DateTime(System.DateTime.Today.Year, System.DateTime.Today.Month - 1, 1);
                dr["leavestartdate"] = leavestartdate.ToString("dd/MM/yyyy");
                enddatedays = System.DateTime.DaysInMonth(System.DateTime.Today.Year, System.DateTime.Today.Month - 1);
                leaveenddate = new DateTime(System.DateTime.Today.Year, System.DateTime.Today.Month - 1, enddatedays);
                dr["leaveenddate"] = leaveenddate.ToString("dd/MM/yyyy");
            }
            string id = "484";
            if (id != null)
            {

                
                dr["OpeningSL"] = "0.00";
                dr["OpeningCL"] = "0.00";
                int empid_leave = Convert.ToInt32(id);
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "getjoiningdate");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaEmpLeave = new SqlDataAdapter(base.objSqlCommand);

                DataSet DsEmpLeave = new DataSet();
                DaEmpLeave.Fill(DsEmpLeave);
                base.objSqlCommand.Connection.Close();

                DateTime joiningdate = (Convert.ToDateTime(DsEmpLeave.Tables[0].Rows[0]["joiningDate"]));




                if (joiningdate >= Convert.ToDateTime("01/01/" + DateTime.Now.Year.ToString()) && joiningdate <= Convert.ToDateTime("31/12/" + DateTime.Now.Year.ToString()))
                {
                    if (Convert.ToInt16(joiningdate.Day) <= 10)
                    {
                        dr["OpeningCL"] = "0.5";


                        month = Convert.ToDouble(joiningdate.Month.ToString());

                        op_sl = 0.5;
                        dr["OpeningSL"] = op_sl.ToString();

                        //for balancesheet
                        dr["OpeningCL"] = "0.5";
                        dr["OpeningSL"] = op_sl.ToString();
                    }
                    else if (Convert.ToInt16(joiningdate.Day) >= 11 && Convert.ToInt16(joiningdate.Day) <= 20)
                    {
                        dr["OpeningCL"] = "0";

                        month = Convert.ToDouble(joiningdate.Month.ToString());
                        //  op_sl = (6 - (month / 2));
                        op_sl = 0;
                        dr["OpeningSL"] = op_sl.ToString();


                        dr["OpeningCL"] = "0";
                        dr["OpeningSL"] = op_sl.ToString();
                    }
                    else
                    {
                        dr["OpeningCL"] = "0";

                        month = Convert.ToDouble(joiningdate.Month.ToString());

                        op_sl = 0;
                        dr["OpeningSL"] = op_sl.ToString();


                        dr["OpeningCL"] = "0";
                        dr["OpeningSL"] = op_sl.ToString();
                    }
                }
                else
                {
                    dr["OpeningSL"] = "0";
                    dr["OpeningCL"] = "0";
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availedCL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAvailedCl = new SqlDataAdapter(base.objSqlCommand);
                DataSet DsAvailedCl = new DataSet();
                DaAvailedCl.Fill(DsAvailedCl);
                base.objSqlCommand.Connection.Close();

                string availedcl = DsAvailedCl.Tables[0].Rows[0]["availedcl"].ToString();


                if (availedcl != null && availedcl != "")
                {
                    dr["availedcl"] = availedcl;
                }
                else
                {
                    dr["availedcl"] = "0.00";
                }

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availedSL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAvailedSl = new SqlDataAdapter(base.objSqlCommand);
                DataSet DsAvailedSl = new DataSet();
                DaAvailedSl.Fill(DsAvailedSl);
                base.objSqlCommand.Connection.Close();

                string availedsl = DsAvailedSl.Tables[0].Rows[0]["availedsl"].ToString();

                if (availedsl != null && availedsl != "")
                {
                    dr["availedsl"] = availedsl;
                }
                else
                {
                    dr["availedsl"] = "0.00";
                }

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availPLSL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAvailPLSL = new SqlDataAdapter(base.objSqlCommand);
                DataSet DsAvailPLSL = new DataSet();
                DaAvailPLSL.Fill(DsAvailPLSL);
                base.objSqlCommand.Connection.Close();

                string availPLSL = DsAvailPLSL.Tables[0].Rows[0]["availPLSL"].ToString();
                dr["AvailPLSL"] = availPLSL;


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "leavebalanceclnew");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter Dabalancecl = new SqlDataAdapter(base.objSqlCommand);
                DataSet Dsbalancecl = new DataSet();
                Dabalancecl.Fill(Dsbalancecl);
                base.objSqlCommand.Connection.Close();


                string balancecl = Dsbalancecl.Tables[0].Rows[0]["CL"].ToString();

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "leavebalanceslnew");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter Dabalancesl = new SqlDataAdapter(base.objSqlCommand);
                DataSet Dsbalancesl = new DataSet();
                Dabalancesl.Fill(Dsbalancesl);
                base.objSqlCommand.Connection.Close();

                string balancesl = Dsbalancesl.Tables[0].Rows[0]["SL"].ToString();

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "carryleaves");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaCarryBalance = new SqlDataAdapter(base.objSqlCommand);
                DataSet DsCarryBalance = new DataSet();
                DaCarryBalance.Fill(DsCarryBalance);
                base.objSqlCommand.Connection.Close();
                string carryforward;
                if (DsCarryBalance.Tables.Count > 0) // if Yes
                {
                    if (DsCarryBalance.Tables[0].Rows.Count > 0)
                    {
                        carryforward = DsCarryBalance.Tables[0].Rows[0]["carrybalance"].ToString();
                    }
                    else
                    {
                        carryforward = "0.00";
                    }

                }

                else
                {
                    carryforward = "0.00";
                }


                if (carryforward != null && carryforward != "")
                {
                    dr["CarryCL"] = carryforward;
                    dr["CarryForwardCL"] = carryforward;
                }
                else
                {
                    dr["CarryCL"] = "0.00";
                    dr["CarryForwardCL"] = "0.00";
                }
                dr["CarrySL"] = "0.00";
                dr["CarryForwardSL"] = "0.00";


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "getballeft");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Lastyear, lastYear);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter Da = new SqlDataAdapter(base.objSqlCommand);
                DataSet ds = new DataSet();
                Da.Fill(ds);
                base.objSqlCommand.Connection.Close();


                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    dr["BalLeft"] = ds.Tables[0].Rows[0][0].ToString();
                }
                else
                {
                    dr["BalLeft"] = "0";
                }

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ExpiredLeaveSL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaExpireLeaveSL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsExpireLeaveSL = new DataSet();
                DaExpireLeaveSL.Fill(dsExpireLeaveSL);
                base.objSqlCommand.Connection.Close();

                dr["ExpireLeaveSL"] = dsExpireLeaveSL.Tables[0].Rows[0]["SL"].ToString();

                // Leave balance sheet
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ExpiredLeaveCL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaExpireLeaveCL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsExpireLeaveCL = new DataSet();
                DaExpireLeaveCL.Fill(dsExpireLeaveCL);
                base.objSqlCommand.Connection.Close();

                dr["ExpireLeaveCL"] = dsExpireLeaveCL.Tables[0].Rows[0]["CL"].ToString();



                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "accuredUCL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaaccuredUCL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsaccuredUCL = new DataSet();
                DaaccuredUCL.Fill(dsaccuredUCL);
                base.objSqlCommand.Connection.Close();

                string accuredUCL = dsaccuredUCL.Tables[0].Rows[0]["accuredUCL"].ToString();


                dr["accuredUCL"] = accuredUCL;

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "accuredccl");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter Daaccuredccl = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsaccuredccl = new DataSet();
                Daaccuredccl.Fill(dsaccuredccl);
                base.objSqlCommand.Connection.Close();


                string accuredccl = dsaccuredccl.Tables[0].Rows[0]["accuredccl"].ToString();

                dr["AccuredCCL"] = accuredccl;
                dr["AccuredUSL"] = accuredccl;

                if (joiningdate >= Convert.ToDateTime("01/01/" + DateTime.Now.Year.ToString()) && joiningdate <= Convert.ToDateTime("31/01/" + DateTime.Now.Year.ToString()))
                {

                    dr["accuredUCL"] = Convert.ToString((Convert.ToDecimal(accuredUCL) - Convert.ToDecimal(0.5)));
                    dr["AccuredUSL"] = Convert.ToString((Convert.ToDecimal(accuredUCL) - Convert.ToDecimal(0.5)));


                }

                dr["AccuredCCL"] = accuredccl;
                dr["AccuredCSL"] = accuredccl;
                dr["TotalCL"] = (Convert.ToDouble(dr["CarryForwardCL"]) + Convert.ToDouble(dr["OpeningCL"]) + Convert.ToDouble(dr["accuredUCL"]) + Convert.ToDouble(dr["AccuredCCL"])).ToString();
                dr["TotalSL"] = (Convert.ToDouble(dr["CarryForwardSL"]) + Convert.ToDouble(dr["OpeningSL"]) + Convert.ToDouble(dr["AccuredUSL"]) + Convert.ToDouble(dr["AccuredCSL"])).ToString();


                dr["AvailableCL"] = dr["TotalCL"];
                dr["AvailableSL"] = dr["TotalSL"];


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availAUPL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaavailAUPL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsavailAUPL = new DataSet();
                DaavailAUPL.Fill(dsavailAUPL);
                base.objSqlCommand.Connection.Close();


                dr["AvailAUPLCL"] = dsavailAUPL.Tables[0].Rows[0]["availAUPL"].ToString();

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availAUPLSL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAvailAUPLSL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsAvailAUPLSL = new DataSet();
                DaAvailAUPLSL.Fill(dsAvailAUPLSL);
                base.objSqlCommand.Connection.Close();

                dr["AvailAUPLSL"] = dsAvailAUPLSL.Tables[0].Rows[0]["availAUPLSL"].ToString();


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "availPL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAvailPLCL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsAvailPLCL = new DataSet();
                DaAvailPLCL.Fill(dsAvailPLCL);
                base.objSqlCommand.Connection.Close();

                dr["AvailPLCL"] = dsAvailPLCL.Tables[0].Rows[0]["availPL"].ToString();


                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "isconfirmed");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaisconfirmedL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsisconfirmed = new DataSet();
                DaisconfirmedL.Fill(dsisconfirmed);
                base.objSqlCommand.Connection.Close();

                int isconfirmed = Convert.ToInt16(dsisconfirmed.Tables[0].Rows[0]["isconfirmed"]);
                if (isconfirmed == 1)
                {
                    if (Convert.ToDouble(dr["TotalCL"]) < Convert.ToDouble(dr["AvailPLCL"]))
                    {
                        dr["AvailAUPLCL"] = (Convert.ToDouble(dr["AvailPLCL"]) - Convert.ToDouble(dr["TotalCL"])).ToString();
                        dr["AvailPLCL"] = dr["TotalCL"];
                    }
                }

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "GetTotalAdjustedCL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAdjustmentCL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsAdjustmentCL = new DataSet();
                DaAdjustmentCL.Fill(dsAdjustmentCL);
                base.objSqlCommand.Connection.Close();


                dr["AdjustmentCL"] = dsAdjustmentCL.Tables[0].Rows[0]["TotalAdjustedCL"].ToString();

                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "adjustedvalueSL");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaAdjustmentSL = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsAdjustmentSL = new DataSet();
                DaAdjustmentSL.Fill(dsAdjustmentSL);
                base.objSqlCommand.Connection.Close();

                dr["AdjustmentSL"] = dsAdjustmentSL.Tables[0].Rows[0]["TotalAdjustedSL"].ToString();
                dr["BalanceCurCL"] = balancecl;
                dr["BalanceCurSL"] = balancesl;


            }
            else
            {
                if (Convert.ToInt32(System.DateTime.Now.Day) <= 10)
                {
                    dr["OpeningCL"] = "1";
                    dr["OpeningSL"] = "0.5";
                }
                else if (Convert.ToInt32(System.DateTime.Now.Day) >= 11 && Convert.ToInt32(System.DateTime.Now.Day) <= 20)
                {
                    dr["OpeningCL"] = "0.5";
                    dr["OpeningSL"] = "0";
                }
                else
                {
                    dr["OpeningCL"] = "0";
                    dr["OpeningSL"] = "0";
                }
                dr["AvailCL"] = "0.00";
                dr["AvailSL"] = "0.00";


            }


            dtleave.Rows.Add(dr);


            return dtleave;

        }

        public DataTable GetAdustmentleave(long UserId)
        {
            DataTable dt = new DataTable();
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procLeaveDeatilMaster;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "adjustedleavelist");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId,UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);

                da.Fill(dt);
              

            }

            return dt;

        }

        #endregion

        #region Increment
        public string SaveIncrement(EmpInfoTabular entityObject)
        {

            try
            {
                id = entityObject.EditEmployeeid;
                Mode = entityObject.Editmode;
                string IncrementHistoryId = "";
        
                DateTime dtFrom = Convert.ToDateTime(entityObject.Incrementdate, provider);

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementHistoryMaster_Add;

                if (!string.IsNullOrEmpty(Mode))
                {
                    if (id != null && IncrementHistoryId != null && Mode == "e")
                    {

                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Incrementid, IncrementHistoryId);

                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    }
                }
                else
                {
                    if (id != null && IncrementHistoryId != null && IncrementHistoryId != "")
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "update");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Incrementid, IncrementHistoryId);
                    }
                    else
                    {
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "add");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    }
                }



                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Incrementdate, entityObject.Incrementdate);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designationchange, entityObject.Designationchange);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Increment, entityObject.Increment);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Salarychange, entityObject.Salarychange);

                if (entityObject.Remarks != null)
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Remarks, entityObject.Remarks);
                }
                else
                {
                    objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Remarks, entityObject.Remarks);
                }


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Isfirst, entityObject.Isfirst);

                objVISDbCommand.objSqlCommand.Connection.Open();

                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();



                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AppraisalDateupdate");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AppraisalDate, entityObject.AppraisalDate);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, 21);
                objVISDbCommand.objSqlCommand.ExecuteNonQuery();


                List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
                using (base.objSqlCommand.Connection)
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementHistoryMaster_Add;


                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "organizationcheck");
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter daDesignation = new SqlDataAdapter(base.objSqlCommand);
                    DataSet dsDesignation = new DataSet();
                    daDesignation.Fill(dsDesignation);


                    if (dsDesignation.Tables[0].Rows.Count > 0)
                    {
                        int id = Convert.ToInt32(dsDesignation.Tables[0].Rows[0]["Id"].ToString());
                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Updateorganizationcheck");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designationchange, entityObject.Designationchange);
                        objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    }



                    //using (base.objSqlCommand.Connection)
                    //{ 
                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementHistoryMaster_Add;


                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Currentsalary");
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);

                    SqlDataAdapter daCurrentSalary = new SqlDataAdapter(base.objSqlCommand);
                    DataSet dsCurrentSalary = new DataSet();
                    daCurrentSalary.Fill(dsCurrentSalary);


                    if (dsCurrentSalary.Tables[0].Rows.Count > 0)
                    {
                        int id = Convert.ToInt32(dsCurrentSalary.Tables[0].Rows[0]["CurrentSalaryId"].ToString());
                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "updatecurrentsalary");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_CurrentSalaryId, id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Salarychange, entityObject.Salarychange);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Designationchange, entityObject.Designationchange);

                        objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    }
                    if (entityObject.SalaryRangeId != 0)
                    {
                        objVISDbCommand.objSqlCommand.Parameters.Clear();
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "updateEmployeeRangeId");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SalaryRangeId, entityObject.SalaryRangeId);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                    }

                }
                string AppraisalDate = entityObject.AppraisalDate;
                string[] arr = AppraisalDate.Split('-');
                System.DateTime dtAppraisalDateFinal = Convert.ToDateTime(AppraisalDate);
                string apdate = arr[2].ToString() + "/" + arr[1].ToString() + "/" + arr[0].ToString();
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "SecondapprisalUpadate");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AppraisalDate, dtAppraisalDateFinal);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, 21);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }

        public DataTable GetIncrementList()
        {
            string id = "484";
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            DataTable dt = new DataTable();
            DataTable table = new DataTable();
            DataTable table1 = new DataTable();
            DataTable table2 = new DataTable();

            using (base.objSqlCommand.Connection)
            {
                if (id != null)
                {
                    int ddd = 484;
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementHistoryMaster_Add;


                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "IncrementGet");
                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);
                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter daincrement1 = new SqlDataAdapter(base.objSqlCommand);
                    DataSet dsincrement1 = new DataSet();
                    daincrement1.Fill(dsincrement1);

                    daincrement1.Fill(dt);
                    // objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);
                    dt.Columns.Add("AppraisalDateLast");
                    dt.Columns.Add("lblIncrDateTo");
                    dt.Columns.Add("Name");

                    table.Columns.Add(new DataColumn("Name", typeof(string)));
                    table.Columns.Add(new DataColumn("AppraisalDateLast", typeof(string)));
                    table.Columns.Add(new DataColumn("lblIncrDateTo", typeof(string)));
                    DataRow dr = dt.NewRow();

                    for (int i = 0; i < dsincrement1.Tables[0].Rows.Count; i++)
                    {
                        if (dsincrement1.Tables[0].Rows.Count > 0)
                        {


                            //dt.Columns.Add("Name", typeof(int));
                            string name = dsincrement1.Tables[0].Rows[0]["Employee_Name"].ToString();
                            string EmployeeName = "Employee Name :" + name.ToString();
                            table.Rows.Add(EmployeeName);
                            dr["Name"] = table.Rows[i]["Name"];
                        }
                        string myString = dsincrement1.Tables[0].Rows[0]["IncrementDate"].ToString();


                        if (i == 0)
                        {
                            int ID = Convert.ToInt32(dsincrement1.Tables[0].Rows[0]["IncrementHistoryId"].ToString());
                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementHistoryMaster_Add;
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AppraisalDateget");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, 484);

                            SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                            DataSet ds = new DataSet();
                            da.Fill(ds);


                            if (ds.Tables[0].Rows[0]["AppraisalDate"].ToString().Length > 0)
                            {

                                // dt.Columns.Add("AppraisalDate", typeof(int));
                                DateTime dtDate = Convert.ToDateTime(ds.Tables[0].Rows[0]["AppraisalDate"].ToString());
                                DateTime dtToo = dtDate.AddDays(-1);
                                string AppraisalDate = dtToo.ToShortDateString();
                                table.Rows.Add(AppraisalDate);
                                dr["AppraisalDateLast"] = table.Rows[i]["AppraisalDateLast"];


                            }
                            else
                            {

                                //dt.Columns.Add("AppraisalDate", typeof(int));
                                string AppraisalDate = "-";
                                table.Rows.Add(AppraisalDate);
                                dr["AppraisalDateLast"] = table.Rows[i]["AppraisalDateLast"];

                            }

                        }
                        else
                        {
                            //  dt.Columns.Add("IncrementDate", typeof(int));
                            DateTime dtFrom = Convert.ToDateTime(myString);
                            DateTime dtTo = dtFrom.AddDays(-1);
                            string IncrementDate = dtTo.ToShortDateString();
                            table.Rows.Add(IncrementDate);
                            dr["lblIncrDateTo"] = table.Rows[i]["lblIncrDateTo"];
                        }

                    }





                }
            }
            //dt.Merge(table);
            // return dt;
            return dt;


        }


        #endregion

        #region Project
        public IEnumerable<EmpInfoTabular> FillProjectDetail(string FromDate, string ToDate, long UserId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();

            DataSet dsProject = new DataSet();
            DataSet DsProject1 = new DataSet();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procprojectListGet;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeGetdeatil");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaProject1 = new SqlDataAdapter(base.objSqlCommand);

                DaProject1.Fill(DsProject1);
                base.objSqlCommand.Connection.Close();
                if (DsProject1.Tables.Count > 0)
                {
                    string name = DsProject1.Tables[0].Rows[0]["Employee_Name"].ToString();

                    string Name = "Employee Name: " + name.ToString();
                }
                base.objSqlCommand.Parameters.Clear();
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Tech");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_FromDate, FromDate);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ToDate, ToDate);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);

                DaProject1.Fill(dsProject);
                DataTable dt = new DataTable();
                sda.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);
                base.objSqlCommand.Connection.Close();
                if (dsProject != null)
                {


                }
            }

            return objListToReturn;


        }
        public IEnumerable<EmpInfoTabular> FillProjectDetailWbs(string FromDate, string ToDate, long UserId)
        {
            DataSet dsProject2 = new DataSet();
            List<EmpInfoTabular> objListToReturn1 = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procprojectListGet;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "NonWbsProject");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_FromDate, FromDate);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_ToDate, ToDate);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter sda = new SqlDataAdapter(base.objSqlCommand);

                sda.Fill(dsProject2);
                DataTable dt1 = new DataTable();
                sda.Fill(dt1);
                objListToReturn1 = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt1);
                base.objSqlCommand.Connection.Close();
                if (dsProject2 != null)
                {


                }
            }


            return objListToReturn1;

        }
        #endregion

        #region Dropdownbind

        public DataTable GetAccountNo(string AccountNumber, string UserId)
        {
            DataTable dt = new DataTable();
            dt = new System.Data.DataTable();
            dt.Columns.Add("Employee_Name", Type.GetType("System.String"));
            dt.Columns.Add("Type", Type.GetType("System.String"));
            dr = dt.NewRow();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procSalarySAccountNo;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_AccountNumber, AccountNumber);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter daBankAccount = new SqlDataAdapter(base.objSqlCommand);
                DataSet dsBankAccount = new DataSet();
                daBankAccount.Fill(dsBankAccount);

                if (dsBankAccount.Tables[0].Rows.Count > 0)
                {
                    if (Convert.ToBoolean(dsBankAccount.Tables[0].Rows[0]["Active"]) == false)
                    {


                        dr["Employee_Name"] = dsBankAccount.Tables[0].Rows[0]["Employee_Name"].ToString();

                        dr["Type"] = "false";

                    }
                    else
                    {

                        dr["Employee_Name"] = null;

                        dr["Type"] = "true";
                    }
                }
                else
                {

                    dr["Employee_Name"] = null;
                    string value = "NotAccount";

                    dr["Type"] = value;
                }
                dt.Rows.Add(dr);

            }

            return dt;

        }

        public IEnumerable<EmpInfoTabular> GetCompany()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ComapnyName");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    //base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetWorking()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Working");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }
        public IEnumerable<EmpInfoTabular> GetJoiningDesignation()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "JoiningDesignation");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetDepartmentname()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Departmentname");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetPositionName()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "PositionName");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetEmployeeGrade()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeGrade");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetUserRole()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeDropDown;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "UserRole");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }
        public IEnumerable<EmpInfoTabular> GetLinemanager(string Usertype, long UserId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeedropdownbind;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetEducationType()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeEducation;



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }



        public IEnumerable<EmpInfoTabular> GetTechnology()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procTechnologyListboxbind;



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }



        public IEnumerable<EmpInfoTabular> GetRole()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procRoleBind;



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetSalaryRangeDropDown(long Salary)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procSalaryRange;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Salary, Salary);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetSalaryBrakup(long SalaryRangeId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procSalaryBreakUpSalaryRangeWise;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SalaryRangeId, SalaryRangeId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> FillEmployee()
        {
            string id;
            string UserId = "21";
            int parentid = 0;
            string ids = "";
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                try
                {

                    if (UserId != null)
                    {
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procEmployeeListAttandancetabBind;


                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "organization");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsEmp = new DataSet();
                        da.Fill(dsEmp);


                        if (dsEmp.Tables[0].Rows.Count > 0 || dsEmp != null)
                        {
                            parentid = Convert.ToInt32(dsEmp.Tables[0].Rows[0]["parent_id"].ToString());
                            if (parentid != 0)
                            {
                                while (parentid != 0)
                                {
                                    base.objSqlCommand.Parameters.Clear();
                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "organizationFilterParent");
                                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_Parentid, parentid);
                                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                                    {
                                        base.objSqlCommand.Connection.Open();
                                    }
                                    SqlDataAdapter daid = new SqlDataAdapter(base.objSqlCommand);
                                    DataSet dsid = new DataSet();
                                    daid.Fill(dsid);
                                    ids = ids + "," + dsid.Tables[0].Rows[0]["UserId"].ToString();

                                    parentid = Convert.ToInt32(dsid.Tables[0].Rows[0]["parent_id"].ToString());
                                }
                                ids = ids.Substring(1, ids.Length - 1);
                            }
                            else
                            {
                                ids = UserId.ToString();
                            }

                            if (ids.Length > 0)
                            {

                                base.objSqlCommand.Parameters.Clear();
                                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeListId");
                                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, ids);
                                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                                {
                                    base.objSqlCommand.Connection.Open();
                                }
                                SqlDataAdapter daemployeeList = new SqlDataAdapter(base.objSqlCommand);
                                DataSet dsemployee = new DataSet();
                                /*    daemployee.Fill(dsemploye*/
                                DataTable dtemployeeList = new DataTable();

                                daemployeeList.Fill(dtemployeeList);
                                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dtemployeeList);
                            }

                        }
                        else
                        {

                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Employee");
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daemployee = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsemployee = new DataSet();
                            /*    daemployee.Fill(dsemploye*/
                            DataTable dtemployee = new DataTable();

                            daemployee.Fill(dtemployee);
                            objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dtemployee);
                        }
                    }
                    else
                    {
                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Employee");
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daemployee = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsemployee = new DataSet();
                        /*    daemployee.Fill(dsemploye*/
                        DataTable dtemployee = new DataTable();

                        daemployee.Fill(dtemployee);
                        objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dtemployee);
                    }
                    //objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);
                }
                catch (Exception ex)
                {

                }


            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetNonWorking()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procNonWorking;



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }



        public IEnumerable<EmpInfoTabular> GetInTimeOutTimeSelected()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procIntimeSelected;



                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetEmployeeTime(long CompanyId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_procGetEmployeeCodeComapanyWise;

                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CompanyId, CompanyId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }


        public IEnumerable<EmpInfoTabular> GetIncrementType()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procIncrementtype;

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmpInfoTabular> GetPendingList(long UserId)
        {

            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procPendingTask;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dtPendintTask = new DataTable();
                da.Fill(dtPendintTask);
                DataSet dsPendintTask = new DataSet();
                da.Fill(dsPendintTask);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dtPendintTask);


            }



            return objListToReturn;
        }
        public IEnumerable<EmpInfoTabular> GetFeedbackList(long UserId)
        {

            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procEmployeeFeedback;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter daEmployeeFeed = new SqlDataAdapter(base.objSqlCommand);
                DataTable dtEmployeeFeed = new DataTable();
                daEmployeeFeed.Fill(dtEmployeeFeed);
                DataSet dsEmployeeFeed = new DataSet();
                daEmployeeFeed.Fill(dsEmployeeFeed);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dtEmployeeFeed);


            }



            return objListToReturn;
        }





        public IEnumerable<EmpInfoTabular> GetLeaveType()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procAdjustedLeaveAdd;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "LeaveType");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    //base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }
        #endregion

       

        public DataTable FillPassingYear(string id, string mode)
        {
            DateTime d = new DateTime();


            using (base.objSqlCommand.Connection)
            {
                DataTable table = new DataTable();
                List<int> lstyear = new List<int>();
                try
                {

                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procGetEducationYear;

                    if (mode != null)
                    {
                        if (mode == "Convert")
                        {
                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "ConvertEmployee");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daCanBirthdate = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsCanBirthdate = new DataSet();
                            daCanBirthdate.Fill(dsCanBirthdate);
                            base.objSqlCommand.Connection.Close();
                            if (dsCanBirthdate != null && dsCanBirthdate.Tables[0].Rows.Count > 0)
                            {
                                string[] strBirthdate = dsCanBirthdate.Tables[0].Rows[0]["Birthdate"].ToString().Split(' ');
                                d = Convert.ToDateTime(strBirthdate[0]);
                            }
                        }
                        else
                        {
                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeBirthdate");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daPerBirthdate = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsPerBirthdate = new DataSet();
                            daPerBirthdate.Fill(dsPerBirthdate);
                            base.objSqlCommand.Connection.Close();

                            if (dsPerBirthdate != null && dsPerBirthdate.Tables[0].Rows.Count > 0)
                            {
                                string[] strBirthdate = dsPerBirthdate.Tables[0].Rows[0]["Birthdate"].ToString().Split(' ');
                                d = Convert.ToDateTime(strBirthdate[0]);
                            }
                        }
                    }
                    else
                    {

                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Employeecheck");
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daPerNewRecord = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsPerNewRecord = new DataSet();
                        daPerNewRecord.Fill(dsPerNewRecord);
                        base.objSqlCommand.Connection.Close();


                        if (dsPerNewRecord != null && dsPerNewRecord.Tables[0].Rows.Count > 0)
                        {

                            base.objSqlCommand.Parameters.Clear();
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeBirthdate");
                            base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, Convert.ToInt32(dsPerNewRecord.Tables[0].Rows[0]["id"].ToString()));
                            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                            {
                                base.objSqlCommand.Connection.Open();
                            }
                            SqlDataAdapter daPerBirthdate = new SqlDataAdapter(base.objSqlCommand);
                            DataSet dsPerBirthdate = new DataSet();
                            daPerBirthdate.Fill(dsPerBirthdate);
                            base.objSqlCommand.Connection.Close();
                            if (dsPerBirthdate != null && dsPerBirthdate.Tables[0].Rows.Count > 0)
                            {
                                string[] strBirthdate = dsPerBirthdate.Tables[0].Rows[0]["Birthdate"].ToString().Split(' ');
                                d = Convert.ToDateTime(strBirthdate[0]);
                            }
                        }
                    }
                    int year = d.Year;
                    int j = year;
                    int l = 1;

                    table.Columns.Add("YearEducation", typeof(int));
                    if (d.Year != 1)
                    {
                        for (int i = DateTime.Today.Year; i > j; i--)
                        {

                            int YearEducation = i;
                            lstyear.Add(YearEducation);
                            l++;
                            table.Rows.Add(YearEducation);

                        }

                    }


                }
                catch (Exception ex)
                {

                }

                return table;

            }



        }


        public DataTable FillPassingYear()
        {
            DateTime d = new DateTime();


            using (base.objSqlCommand.Connection)
            {
                DataTable table = new DataTable();
                List<int> lstyear = new List<int>();
                try
                {
                    base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procGetEducationYear;


                    base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Employeecheck");

                    if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                    {
                        base.objSqlCommand.Connection.Open();
                    }
                    SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                    DataSet dsEmp = new DataSet();
                    da.Fill(dsEmp);


                    if (dsEmp.Tables[0].Rows.Count > 0 || dsEmp != null)
                    {
                        long id = Convert.ToInt32(dsEmp.Tables[0].Rows[0]["id"].ToString());

                        base.objSqlCommand.Parameters.Clear();
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "EmployeeBirthdate");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daid = new SqlDataAdapter(base.objSqlCommand);
                        DataSet dsid = new DataSet();
                        daid.Fill(dsid);
                        if (dsid != null && dsid.Tables[0].Rows.Count > 0)
                        {
                            string[] strBirthdate = dsid.Tables[0].Rows[0]["Birthdate"].ToString().Split(' ');
                            d = Convert.ToDateTime(strBirthdate[0]);
                        }


                    }

                    int year = d.Year;
                    int j = year;
                    int l = 1;

                    table.Columns.Add("YearEducation", typeof(int));
                    if (d.Year != 1)
                    {
                        for (int i = DateTime.Today.Year; i > j; i--)
                        {

                            int YearEducation = i;
                            lstyear.Add(YearEducation);
                            l++;
                            table.Rows.Add(YearEducation);

                        }

                    }


                }
                catch (Exception ex)
                {

                }

                return table;

            }



        }

        #region offerdetail
        public DataTable GetOfferdeatils(long UserId)
        {



            DataTable dt = new DataTable();
            dt = new System.Data.DataTable();
            dt.Columns.Add("EmployeeName", Type.GetType("System.String"));
            dt.Columns.Add("joingdate", Type.GetType("System.String"));
            
            dt.Columns.Add("Designation", Type.GetType("System.String"));
            dt.Columns.Add("SalaryAfterRevision", Type.GetType("System.String"));
            dt.Columns.Add("JoiningSalary", Type.GetType("System.String"));

            dt.Columns.Add("SLASigned", Type.GetType("System.String"));
            dt.Columns.Add("Department", Type.GetType("System.String"));

            dr = dt.NewRow();
            
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procOfferdeatils;
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AllDeatailJoing");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable DaOffer = new DataTable();
                da.Fill(DaOffer);
                DataSet DsOffer = new DataSet();
                da.Fill(DsOffer);
                // objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(DaOffer);
                base.objSqlCommand.Connection.Close();
                if (DsOffer.Tables[0].Rows.Count > 0)
                {
                    dt.Rows.Add(dr);
                    //joiningdate
                    if (DsOffer.Tables[0].Rows[0]["joiningDate"].ToString() != null)
                    {
                        DateTime Jdate = Convert.ToDateTime(DsOffer.Tables[0].Rows[0]["joiningDate"]);
                        int jday = Jdate.Day;
                        int jmonth = Jdate.Month;
                        int jyear = Jdate.Year;
                        dr["joingdate"] = Jdate.ToShortDateString();
                        
                    }
                    else
                    {
                        dr["joingdate"] = "";
                        
                    }

                    dr["EmployeeName"] = DsOffer.Tables[0].Rows[0]["Employee_Name"].ToString();
                    

                    if ((DsOffer.Tables[0].Rows[0]["joiningDesignation"].ToString() != null))
                    {
                        dr["Designation"] = DsOffer.Tables[0].Rows[0]["joiningDesignation"].ToString();

                    }

                    dr["SalaryAfterRevision"] = DsOffer.Tables[0].Rows[0]["SalaryAfterRevision"].ToString();
                   
                    dr["JoiningSalary"] = DsOffer.Tables[0].Rows[0]["JoiningSalary"].ToString();
                
                    if ((DsOffer.Tables[0].Rows[0]["IsSLASigned"].ToString() == "True" && DsOffer.Tables[0].Rows[0]["IsSLASigned"] != null))
                    {
                        dr["SLASigned"] = DsOffer.Tables[0].Rows[0]["IsSLASigned"].ToString();
                     
                    }
                    else
                    {
                        dr["SLASigned"] = DsOffer.Tables[0].Rows[0]["IsSLASigned"].ToString();
                      
                    }
                }
                base.objSqlCommand.Parameters.Clear();

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Department");
                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter daOrganization = new SqlDataAdapter(base.objSqlCommand);
                DataTable dtOrganization = new DataTable();
                daOrganization.Fill(dtOrganization);
                DataSet dsOrganization = new DataSet();
                daOrganization.Fill(dsOrganization);
             
                base.objSqlCommand.Connection.Close();
                string departmentoffer = "";
                if (dsOrganization != null && dsOrganization.Tables[0].Rows.Count > 0)
                {
                    for (int counter = 0; counter < dsOrganization.Tables[0].Rows.Count; counter++)
                    {
                       
                        base.objSqlCommand.Parameters.Clear();

                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "Department");
                        base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter daDepartment = new SqlDataAdapter(base.objSqlCommand);
                        DataTable dtDepartment = new DataTable();
                        daDepartment.Fill(dtDepartment);
                        DataSet dsDepartment = new DataSet();
                        daDepartment.Fill(dsDepartment);
                      
                        base.objSqlCommand.Connection.Close();

                        if (dsDepartment != null && dsDepartment.Tables[0].Rows.Count > 0)
                        {
                            dr["Department"] = dsDepartment.Tables[0].Rows[0]["Department_Name"].ToString();
                            if (!departmentoffer.Contains(dsDepartment.Tables[0].Rows[0]["Department_Name"].ToString()))
                            {
                                departmentoffer += dsDepartment.Tables[0].Rows[0]["Department_Name"].ToString() + ",";
                            }
                        }

                    }
                    if(departmentoffer !=null && departmentoffer != "")
                    {
                        departmentoffer = departmentoffer.Remove(departmentoffer.Length - 1);
                    }
                    else
                    {
                        departmentoffer = "";
                    }
                    
                    dr["Department"] = departmentoffer;
          
                    //gvDept.DataSource = dt;
                    //gvDept.DataBind();
                }
                

            }
         
            return dt;

        }

        #endregion

        public DataTable GetEmployeeDeatils(string UserId)
        {

            DataTable dt = new DataTable();
            dt = new System.Data.DataTable();
            dt.Columns.Add("Employee_Name", Type.GetType("System.String"));
            dt.Columns.Add("JoiningDate", Type.GetType("System.String"));
            dt.Columns.Add("IsConfirmed", Type.GetType("System.String"));
            dt.Columns.Add("ConfirmationDateJoin", Type.GetType("System.String"));


            dr = dt.NewRow();


            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procEmployeeMasterGet;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter DaEmpLeave = new SqlDataAdapter(base.objSqlCommand);
                DataTable DtEmpLeave = new DataTable();
                DaEmpLeave.Fill(DtEmpLeave);
                DataSet DsEmpLeave = new DataSet();
                DaEmpLeave.Fill(DsEmpLeave);
                // objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(DaOffer);
                base.objSqlCommand.Connection.Close();
                if (DsEmpLeave.Tables[0].Rows.Count > 0)
                {
                    //joiningdate
                    dr["Employee_Name"] = DsEmpLeave.Tables[0].Rows[0]["Employee_Name"].ToString();
                    dr["joiningDate"] = DsEmpLeave.Tables[0].Rows[0]["joiningDate"].ToString();



                    if (Convert.ToBoolean(DsEmpLeave.Tables[0].Rows[0]["IsConfirmed"].ToString()) == true)
                    {
                        dr["IsConfirmed"] = " Yes";
                        dr["ConfirmationDateJoin"] = DsEmpLeave.Tables[0].Rows[0]["ConfirmationDate"].ToString();
                    }
                    else
                    {
                        dr["IsConfirmed"] = "No";
                    }

                }


            }
            dt.Rows.Add(dr);


            return dt;

        }



        #region skill
        public IEnumerable<EmpInfoTabular> GetSkill()
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procGetMySkill;


                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "dropdownGroupBind");
             
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }
        public IEnumerable<EmpInfoTabular> GetPopupSkill(long lookupSkilId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procGetMySkill;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "dropdownSkillNameBind");

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_skillgroupid, lookupSkilId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        public string Saveskill(EmpInfoTabular entityObject)
        {

            try
            {
                if (entityObject.EditEmployeeid != null)
                {

                   id = entityObject.EditEmployeeid; //UserID 
                }
                else
                {
                    id = "440";
                }
                Mode = entityObject.Editmode;
             
       
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procSkillAddtab;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "AddSkills");

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_EmployeeID, 21);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_SkillID, entityObject.id);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, id);
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objVISDbCommand.objSqlCommand.Connection.Close();
                return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }

            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }


        public IEnumerable<EmpInfoTabular> GetGridViewList(long UserId)
        {
            List<EmpInfoTabular> objListToReturn = new List<EmpInfoTabular>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmpInfoTabularConstants.const_Field_procSkillAddtab;

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_mode, "SkillList");

                base.objSqlCommand.Parameters.AddWithValue(EmpInfoTabularConstants.const_Field_UserId, UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmpInfoTabular>(dt);

            }

            return objListToReturn;

        }

        #endregion





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



        void IDisposable.Dispose()
        {
            throw new NotImplementedException();
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~EmpInfoTabularRepository() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
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
