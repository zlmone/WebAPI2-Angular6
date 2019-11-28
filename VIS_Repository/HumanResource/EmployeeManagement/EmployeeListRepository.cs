using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.HumanResource.EmployeeManagement;

namespace VIS_Repository.HumanResource.EmployeeManagement
{

    public class EmployeeListRepository : VISDbCommand, VISIBaseRepository<EmployeeList>
    {


        public Int32 intAffectedRecords { get; set; }


        public EmployeeListRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {
            return null;

        }
        public string deleteEmployeeid(Int64 Id)
        {
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.Connection.Open();
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.CommandType = CommandType.StoredProcedure;
            base.objSqlCommand.CommandText = EmployeeListConstants.const_procSelectListDeleteEmployeelist;
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Suggestionselect");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daSuggestion = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsSuggestion = new DataSet();
            dsSuggestion.Clear();
            daSuggestion.Fill(dsSuggestion);
            base.objSqlCommand.Connection.Close();


            if ((dsSuggestion.Tables[0].Rows.Count > 0 && dsSuggestion != null) || (dsSuggestion.Tables[1].Rows.Count > 0 && dsSuggestion != null))
            {


                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Suggestionselect");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
               
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Leave");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daleave = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsleave = new DataSet();
            dsleave.Clear();
            daleave.Fill(dsleave);
            base.objSqlCommand.Connection.Close();

            if (dsleave.Tables[0].Rows.Count > 0 && dsleave != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Leave");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
           
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Email");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daEmail = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsEmail = new DataSet();
            dsEmail.Clear();
            daEmail.Fill(dsEmail);
            base.objSqlCommand.Connection.Close();

            if (dsEmail.Tables[0].Rows.Count > 0 && dsEmail != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Email");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
              
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
             
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"CoFFEmployee");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daCoff = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsCoff = new DataSet();
            dsCoff.Clear();
            daCoff.Fill(dsCoff);
            base.objSqlCommand.Connection.Close();
            if (dsCoff.Tables[0].Rows.Count > 0 && dsCoff != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"CoFFEmployee");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
              
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
             
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"CurrentSalary");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daCurrentSalary = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsCurrentSalary = new DataSet();
            dsCurrentSalary.Clear();
            daCurrentSalary.Fill(dsCurrentSalary);
            base.objSqlCommand.Connection.Close();

            if (dsCurrentSalary.Tables[0].Rows.Count > 0 && dsCurrentSalary != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"CurrentSalary");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
             
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
           
            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Education");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daEducation = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsEducation = new DataSet();
            dsEducation.Clear();
            daEducation.Fill(dsEducation);
            base.objSqlCommand.Connection.Close();
            if (dsEducation.Tables[0].Rows.Count > 0 && dsEducation != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Education");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
              
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"ExperienceInformation");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daExperienceInformation = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsExperienceInformation = new DataSet();
            dsExperienceInformation.Clear();
            daExperienceInformation.Fill(dsExperienceInformation);
            base.objSqlCommand.Connection.Close();
            if (dsExperienceInformation.Tables[0].Rows.Count > 0 && dsExperienceInformation != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"ExperienceInformation");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
             
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Experience");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daExperienceMaster = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsExperienceMaster = new DataSet();
            dsExperienceMaster.Clear();
            daExperienceMaster.Fill(dsExperienceMaster);
            base.objSqlCommand.Connection.Close();

            if (dsExperienceMaster.Tables[0].Rows.Count > 0 && dsExperienceMaster != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Experience");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
               
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
               
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"IncrementHistory");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daIncrementHistoryMaster = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsIncrementHistoryMaster = new DataSet();
            dsIncrementHistoryMaster.Clear();
            daIncrementHistoryMaster.Fill(dsIncrementHistoryMaster);
            if (dsIncrementHistoryMaster.Tables[0].Rows.Count > 0 && dsIncrementHistoryMaster != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"IncrementHistory");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);

                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"JoiningDocument");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daJoiningDocument = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsJoiningDocument = new DataSet();
            dsJoiningDocument.Clear();
            daJoiningDocument.Fill(dsJoiningDocument);
            base.objSqlCommand.Connection.Close();
            if (dsJoiningDocument.Tables[0].Rows.Count > 0 && dsJoiningDocument != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"JoiningDocument");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
   
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
              
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"OfficialDetail");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daOfficialDetail = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsOfficialDetail = new DataSet();
            dsOfficialDetail.Clear();
            daOfficialDetail.Fill(dsOfficialDetail);
            base.objSqlCommand.Connection.Close();
            if (dsOfficialDetail.Tables[0].Rows.Count > 0 && dsOfficialDetail != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"OfficialDetail");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
          
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
        
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Organization");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daOrganization = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsOrganization = new DataSet();
            dsOrganization.Clear();
            daOrganization.Fill(dsOrganization);
            base.objSqlCommand.Connection.Close();
            if (dsOrganization.Tables[0].Rows.Count > 0 && dsOrganization != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Organization");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
              
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            
            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"PersonalInformation");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daPersonalInformation = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsPersonalInformation = new DataSet();
            dsPersonalInformation.Clear();
            daPersonalInformation.Fill(dsPersonalInformation);
            base.objSqlCommand.Connection.Close();
            if (dsPersonalInformation.Tables[0].Rows.Count > 0 && dsPersonalInformation != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"PersonalInformation");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
               
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            
            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"RelevingInformation");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daRelevingInformation = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsRelevingInformation = new DataSet();
            dsRelevingInformation.Clear();
            daRelevingInformation.Fill(dsRelevingInformation);
            base.objSqlCommand.Connection.Close();
            if (dsRelevingInformation.Tables[0].Rows.Count > 0 && dsRelevingInformation != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"RelevingInformation");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
    
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
            }

            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"carryTbl");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter dacarryTbl = new SqlDataAdapter(base.objSqlCommand);
            DataSet dscarryTbl = new DataSet();
            dscarryTbl.Clear();
            dacarryTbl.Fill(dscarryTbl);
            base.objSqlCommand.Connection.Close();
            if (dscarryTbl.Tables[0].Rows.Count > 0 && dsSuggestion != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"carryTbl");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
               
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                
            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"NwdHistory");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daNwdHistory = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsNwdHistory = new DataSet();
            dsNwdHistory.Clear();
            daNwdHistory.Fill(dsNwdHistory);
            base.objSqlCommand.Connection.Close();
            if (dsNwdHistory.Tables[0].Rows.Count > 0 && dsNwdHistory != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"NwdHistory");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
                
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
      
            }
            base.objSqlCommand.Parameters.Clear();
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Employee_ModuleAccess");
            base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            if (base.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                base.objSqlCommand.Connection.Open();
            }
            SqlDataAdapter daModuleAccess = new SqlDataAdapter(base.objSqlCommand);
            DataSet dsModuleAccess = new DataSet();
            dsModuleAccess.Clear();
            daModuleAccess.Fill(dsModuleAccess);
            base.objSqlCommand.Connection.Close();
            if (dsModuleAccess.Tables[0].Rows.Count > 0 && dsModuleAccess != null)
            {
                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Employee_ModuleAccess");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
              
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            
            }

    
        
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = EmployeeListConstants.const_procDeleteEmployeelist;
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_mode,"Employee");
            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId,Id);
            intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
            objSqlCommand.Connection.Close();
            return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
        }
        public EmployeeList GetEntityByID(Int64 entityId)
        {
            return null;
        }



        public IEnumerable<EmployeeList> GetEntityList()
        {
            return null;

        }

        public string AddEntity(EmployeeList entityObject)
        {
            try
            {
                return null;
                //VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                //objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                //objVISDbCommand.objSqlCommand.CommandText =EmployeeListConstants.const_procSkillUser_Add;

                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, 21);
                //objVISDbCommand.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_SkillID, entityObject.id);



                //if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                //{
                //    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                //}
                //objVISDbCommand.objSqlCommand.Connection.Open();
                //intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                //objSqlCommand.Connection.Close();
                ////return intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                //string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(EmployeeList entityObject)
        {
            return null;
        }




        public IEnumerable<EmployeeList> GetEmployeeListActive(string Usertype, long UserId, string EmployeeCode)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procgetEmployeeRecordActive;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_EmployeeCode, EmployeeCode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeList> GetEmployeeListAll(string Usertype, long UserId, string EmployeeCode)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procgetEmployeeRecordAll;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_EmployeeCode, EmployeeCode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeList> GetEmployeeListInActive(string Usertype, long UserId, string EmployeeCode)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procgetEmployeeRecorInActive;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_EmployeeCode, EmployeeCode);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeList> GetEmployeeModeAll(string Usertype, long UserId)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procEmployeemodeAll;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);
              
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

        }



        public IEnumerable<EmployeeList> GetEmployeeModeActive(string Usertype, long UserId)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procEmployeemodeActive;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);
              
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

        }

        public IEnumerable<EmployeeList> GetEmployeeModeInActive(string Usertype, long UserId)
        {
            List<EmployeeList> objListToReturn = new List<EmployeeList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = EmployeeListConstants.const_procEmployeemodeInActive;


                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_Usertype, Usertype);
                base.objSqlCommand.Parameters.AddWithValue(EmployeeListConstants.const_Field_UserId, UserId);

                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();

                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<EmployeeList>(dt);

            }

            return objListToReturn;

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
        // ~EmployeeListRepository() {
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
