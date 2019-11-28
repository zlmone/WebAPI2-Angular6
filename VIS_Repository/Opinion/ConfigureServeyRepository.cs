using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using VIS_Domain.Opinion;
using System.Data.SqlClient;

namespace VIS_Repository.Opinion
{
    public class ConfigureServeyRepository : VISDbCommand
    {

        public ConfigureServeyRepository(string _connectionstring) : base(_connectionstring) { }

        public bool GetRollOfEmployee(int EmployeeId, string RoleType)
        {
            DataTable dt = new DataTable();
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ConfigureSurveyConstant.Const_Proc_CheckUserRolesById;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_EmployeeID, EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_RoleName, RoleType);

                objVISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                da.Fill(dt);
            }
            catch (Exception ex)
            {
            }
            if (Convert.ToInt32(dt.Rows[0][0]) == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public DataTable GetSurveyDetails(string SearchField, string searchValue, int EmployeeId, string RoleType, string ServeyType, string Approvetype)
        {
            DataTable dt = new DataTable();
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ConfigureSurveyConstant.const_ProcSurvey_GetAllSurvey_SelectAll;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_EmployeeID, EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_SearchField, SearchField);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_SearchValue, searchValue);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_RoleType, RoleType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_SurveyType, ServeyType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_ApproveType, Approvetype);

                objVISDbCommand.objSqlCommand.Connection.Open();
                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                da.Fill(dt);
            }
            catch (Exception ex)
            {

            }
            return dt;
        }

        public IEnumerable<SurveyType> BindSurveyType()
        {
            List<SurveyType> objListToReturn = new List<SurveyType>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureSurveyConstant.const_ProcEmployeeDropDown;
                base.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_Mode, "SurveyType");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<SurveyType>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<GetUserListForOwnerSelection> BindUsersForOwnerSelection()
        {
            List<GetUserListForOwnerSelection> objListToReturn = new List<GetUserListForOwnerSelection>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureSurveyConstant.const_ProcEmployeeDropDown;
                base.objSqlCommand.Parameters.AddWithValue(ConfigureSurveyConstant.const_Field_Mode, "GetUsersForOwnerSelection");
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<GetUserListForOwnerSelection>(dt);
            }
            return objListToReturn;
        }
    }
}
