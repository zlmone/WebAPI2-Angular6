using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain.Masters.EmployeeLevels;
using VIS_Domain.Master;
using VIS_Domain.Master.CompanyRelated;
using VIS_Repository.Masters;
using VIS_Domain;

namespace VIS_Repository.Masters.EmployeeLevels
{
    public class Levels_AchievementRepository : VISDbCommand, VISIBaseRepository<Levels_Achievement>
    {
        public Int32 intAffectedRecords { get; set; }


        public Levels_AchievementRepository(string _connectionstring) : base(_connectionstring)
        {
        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_ActiveInActive;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, UpdatedBy);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        public Levels_Achievement GetEntityByID(Int64 entityId)
        {
            Levels_Achievement objEntityToReturn = new Levels_Achievement();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_SelectById;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<Levels_Achievement>(dt.Rows[0]);
               
            }
            return objEntityToReturn;
        }
        
        public IEnumerable<Levels_Achievement> GetEntityList()
        {
            List<Levels_Achievement> objListToReturn = new List<Levels_Achievement>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<Levels_Achievement>(dt);

            }
            return objListToReturn;

        }
        //
        public IEnumerable<Levels_Achievement> GetEditData(int Id)
        {
            List<Levels_Achievement> objListToReturn = new List<Levels_Achievement>();
            using (base.objSqlCommand.Connection)
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_OnEdit;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<Levels_Achievement>(dt);
            }
            return objListToReturn;
        }
        public IEnumerable<Levels_Achievement> GetIsCriteriaDDL(int value)
        {
                List<Levels_Achievement> objListToReturn = new List<Levels_Achievement>();
                    using (base.objSqlCommand.Connection)
                    {
                        VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                        base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_IsCriteria;
                        base.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Value, value);
                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        objListToReturn = VISAutoMapper.ConvertDataTable<Levels_Achievement>(dt);
                    }
                    return objListToReturn;
        }

        public string AddEntity(Levels_Achievement entityObject)
        {
            try
            {
                
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AchievementName, entityObject.AchievementName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_SetUpID, entityObject.SetUpID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_IsCriteria, entityObject.IsCriteria);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AndAbove, entityObject.AndAbove);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Description, entityObject.Description);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Help, entityObject.Help);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Calculated, entityObject.Calculated);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AchievedIn, entityObject.AchievedIn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Points, entityObject.Points);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Image, entityObject.Image);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Active, entityObject.Active);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_LevelSetupId, entityObject.LevelSetupId);

              
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Range, entityObject.Range);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_CriteiaId, entityObject.CriteriaId);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_CreatedBy, entityObject.CreatedBy);



                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(Levels_Achievement entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = Levels_AchievementConstants.const_procLevels_Achievement_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AchievementName, entityObject.AchievementName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_SetUpID, entityObject.SetUpID);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_IsCriteria, entityObject.IsCriteria);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AndAbove, entityObject.AndAbove);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Description, entityObject.Description);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Help, entityObject.Help);

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Calculated, entityObject.Calculated);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_AchievedIn, entityObject.AchievedIn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Points, entityObject.Points);
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Image, entityObject.Image);
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Active, entityObject.Active);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_LevelSetupId, entityObject.LevelSetupId);


                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_Range, entityObject.Range);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(Levels_AchievementConstants.const_Field_CriteiaId, entityObject.CriteriaId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);
                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure; return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString(); ;
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
        // ~Levels_AchievementRepository() {
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
