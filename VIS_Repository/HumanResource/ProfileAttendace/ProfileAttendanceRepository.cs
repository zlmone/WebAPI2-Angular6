using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using VIS_Domain;
using VIS_Domain.HumanResource.ProfileAttendance;

namespace VIS_Repository.HumanResource.ProfileAttendace
{
    public class ProfileAttendanceRepository : VISDbCommand, VISIBaseRepository<ProfileAttend>
    {
        public Int32 intAffectedRecords { get; set; }
        public ProfileAttendanceRepository(string _connectionstring) : base(_connectionstring)
        {

        }
        public string AddEntity(ProfileAttend entityObject)
        {
            throw new NotImplementedException();
        }

        public string DeleteEntity(long Id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public ProfileAttend GetEntityByID(long entityId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProfileAttend> GetEntityList()
        {
            throw new NotImplementedException();
        }

        public string UpdateEntity(ProfileAttend entityObject)
        {
            throw new NotImplementedException();
        }

        //public string ChangePassword(int Id,string VISPassword)
        //{
        //    string StrMsg = string.Empty;
        //    using (base.objSqlCommand.Connection)
        //    {
        //        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        //        base.objSqlCommand.CommandText = ProfileAttendanceConstants.const_procProfileAttendance_ChangePassword;
        //        //base.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.VISBaseEntityConstants.const_Field_Id, 2);
        //        base.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.const_Field_Id, Id);
        //        base.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.const_Field_VISPassword, VISPassword);
        //        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
        //        {
        //            base.objSqlCommand.Connection.Open();
        //        }

        //        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
        //        DataTable dt = new DataTable();
        //        da.Fill(dt);
        //        if (dt.Rows.Count > 0)
        //        {
        //            StrMsg = Convert.ToString(objSqlCommand.ExecuteScalar());
        //        }
        //        else
        //        {
        //            StrMsg = "Please Enter valid Password";
        //        }
        //        // return dt;
        //        base.objSqlCommand.Connection.Close();
        //    }

        //    return StrMsg;


        //}
        public string userchangepsw(int id, ProfileAttend Profile)
        {
            try
            {
                VISDbCommand objvisdbcommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objvisdbcommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objvisdbcommand.objSqlCommand.CommandText = ProfileAttendanceConstants.const_procProfileAttendance_ChangePassword;
                objvisdbcommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, id);
                objvisdbcommand.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.const_Field_VISPassword, Profile.VISPassword);
                objvisdbcommand.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.const_Field_NewPassword, Profile.NewPassword);
                objvisdbcommand.objSqlCommand.Parameters.AddWithValue(ProfileAttendanceConstants.const_Field_ConfirmNewPassword, Profile.ConfirmNewPassword);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
             
                //objvisdbcommand.objsqlcommand.parameters.addwithvalue(visbaseentityconstants.const_field_updatedby, entityobject.updatedby);
                objvisdbcommand.objSqlCommand.Connection.Open();
                if (Profile.NewPassword == Profile.ConfirmNewPassword)
                {
                    intAffectedRecords = objvisdbcommand.objSqlCommand.ExecuteNonQuery();
                }
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return  strRetValue  + base.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }



    }
}
