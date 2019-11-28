using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.VacancyRelated;
using VIS_Repository.Masters;

namespace VIS_Repository.Masters.VacancyRelated
{
    public class PositionRepository : VISDbCommand
    {

        public Int32 intAffectedRecords { get; set; }

        public PositionRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public string DeleteEntity(Int64 Id)
        {

            try
            {
                string UpdatedBy = string.Empty;

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = PositionConstant.const_procPositionMaster_ActiveInActive;
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        public Position GetEntityByID(Int64 Id)
        {
            Position objEntityToReturn = new Position();

            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = PositionConstant.const_procPositionMaster_SelectById;
                base.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objEntityToReturn = VISAutoMapper.ConvertDataRow<Position>(dt.Rows[0]);
            }
            return objEntityToReturn;
        }

        public IEnumerable<PositionViewModel> GetEntityList()
        {
            List<PositionViewModel> objListToReturn = new List<PositionViewModel>();
            DataTable dt = new DataTable();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = PositionConstant.const_procPositionMaster_SelectAll;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);

                da.Fill(dt);

                objListToReturn = VISAutoMapper.ConvertDataTable<PositionViewModel>(dt);
            }
            return objListToReturn;
        }

        public string AddEntity(Position entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = PositionConstant.const_procPositionMaster_Add;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_PositionName, entityObject.PositionName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_Remarks, entityObject.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_Status, entityObject.Status);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                if (intAffectedRecords > 0)
                {
                    if(entityObject.SkillId.Length > 0)
                    {
                        foreach (Int64 SkillId in entityObject.SkillId)
                        {
                            AddPositionSkill(0,SkillId);
                        }
                    }
                }
                
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateEntity(Position entityObject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = PositionConstant.const_procPositionMaster_Update;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_PositionName, entityObject.PositionName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_Remarks, entityObject.Remarks);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_Status, entityObject.Status);


                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))

                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();

                objSqlCommand.Connection.Close();

                DeletePositionSkill(entityObject.Id);
                
                if (entityObject.SkillId.Length > 0)
                {
                    foreach (Int64 SkillId in entityObject.SkillId)
                    {
                        AddPositionSkill(entityObject.Id,SkillId);
                    }
                }


                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return  strRetValue  + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }
        }

        public IEnumerable<SkillList> GetSkills()
        {
            List<SkillList> objListToReturn = new List<SkillList>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = SkillConstant.const_procGetSkill;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<SkillList>(dt);
            }
            return objListToReturn;

        }

        public void AddPositionSkill(Int64 PositionId,Int64 SkillId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = PositionConstant.const_procPositionSkill_Add;

                objVISDbCommand.objSqlCommand.Parameters.Clear();
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_SkillId,SkillId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_PositionId, PositionId);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                
            }
            catch (Exception ex)
            {
                
            }

        }

        public void DeletePositionSkill(Int64 PositionId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = PositionConstant.const_procPositionSkill_Delete;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(PositionConstant.const_PositionId, PositionId);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

            }
            catch (Exception ex)
            {

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

        #endregion
    }
}
