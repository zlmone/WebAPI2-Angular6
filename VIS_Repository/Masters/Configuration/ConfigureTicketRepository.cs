using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VIS_Domain;
using VIS_Domain.Master;
using VIS_Domain.Master.Configuration;
using VIS_Repository.Masters;

namespace VIS_Repository.Masters.Configuration
{
    public class ConfigureTicketRepository : VISDbCommand, VISIBaseRepository<ConfigureTicket>
    {

        public Int32 intAffectedRecords { get; set; }

        public ConfigureTicketRepository(string _connectionstring) : base(_connectionstring)
        {

        }

        public IEnumerable<ConfigureTicket> GetParantGroup()
        {
            List<ConfigureTicket> objListToReturn = new List<ConfigureTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSelectParent;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ConfigureTicket>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<ConfigureTicket> GetChildGroup(int Parent_Id)
        {
            List<ConfigureTicket> objListToReturn = new List<ConfigureTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSelectChildGroup;
                base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Parent_Id,Parent_Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ConfigureTicket>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<ConfigureTicket> GetEmployeeHead()
        {
            List<ConfigureTicket> objListToReturn = new List<ConfigureTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSelectHead;
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ConfigureTicket>(dt);
            }
            return objListToReturn;
        }

        public IEnumerable<ConfigureTicket> GetListofTicketDisplayTo(int Organization_Id)
        {
            List<ConfigureTicket> objListToReturn = new List<ConfigureTicket>();
            using (base.objSqlCommand.Connection)
            {
                base.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                base.objSqlCommand.CommandText = ConfigureTicketConstant.const_proSuggestionsOrganizationEmployeeMapping;
                base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id,Organization_Id);
                if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    base.objSqlCommand.Connection.Open();
                }
                SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<ConfigureTicket>(dt);
            }
            return objListToReturn;
        }

        public string UpdateEntity(ConfigureTicket entityObject)
        {
            try
            { 
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = ConfigureTicketConstant.const_procorganization_Update; 

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_IsActiveSuggestion,entityObject.IsActiveSuggestion);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_SuggestionAlie, entityObject.SuggestionAlie);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(VISBaseEntityConstants.const_Field_UpdatedBy, entityObject.UpdatedBy);

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

        public string UpdateEmployeeId(List<ConfigureTicket> entityObject)
        {
            try
            {

                foreach (ConfigureTicket configticket in entityObject)
                {
                    
                    VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                    //objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                    //objVISDbCommand.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId;


                        objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                        base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                        base.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_Compare;
                        base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id, configticket.Organization_Id);
                        base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Employee_Id, configticket.Employee_Id);
                        if (base.objSqlCommand.Connection.State != ConnectionState.Open)
                        {
                            base.objSqlCommand.Connection.Open();
                        }
                        SqlDataAdapter da = new SqlDataAdapter(base.objSqlCommand);
                        DataSet ds = new DataSet();
                        
                        da.Fill(ds);

                    Int64 OrgId = Convert.ToInt64(ds.Tables[0].Rows[0][1]);
                    Int64 EmpId = Convert.ToInt64(ds.Tables[0].Rows[0][2]);
                    ds.Clear();

                    if (configticket.Employee_Id == EmpId && configticket.Organization_Id==OrgId)
                    {
                            objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                            objVISDbCommand.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId;
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Mode, "Insert");
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id, configticket.Organization_Id);
                            objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Employee_Id, configticket.Employee_Id);
                    }
                    else
                    {
                        objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Mode, "Update");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id, configticket.Organization_Id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Employee_Id, configticket.Employee_Id);
                    }

                    

                }

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

            return "";
        }

        public string UpdateEmployeeNew(List<ConfigureTicket> entityObject)
        {
            try
            {
                foreach (ConfigureTicket configticket in entityObject)
                {
                    VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                    base.objSqlCommand.Parameters.Clear();
                    base.objSqlCommand.CommandType = CommandType.StoredProcedure;
                    base.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_Compare;
                    base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id, configticket.Organization_Id);
                    base.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Employee_Id, configticket.Employee_Id);

                    base.objSqlCommand.Connection.Open();

                    SqlDataAdapter da = new SqlDataAdapter(objSqlCommand);
                    DataSet ds = new DataSet();
                    ds.Clear();
                    da.Fill(ds);
                    base.objSqlCommand.Connection.Close();

                    Int64 OrgId = Convert.ToInt64(ds.Tables[0].Rows[0][1]);
                    Int64 EmpId = Convert.ToInt64(ds.Tables[0].Rows[0][2]);

                    if (configticket.Employee_Id != EmpId && configticket.Organization_Id != OrgId)
                    {
                        objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                        objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                        objVISDbCommand.objSqlCommand.CommandText = ConfigureTicketConstant.const_procSuggestionsOrganizationEmployeeMapping_UpdateEmployeeId;
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Mode, "Insert");
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Organization_Id, configticket.Organization_Id);
                        objVISDbCommand.objSqlCommand.Parameters.AddWithValue(ConfigureTicketConstant.const_Employee_Id, configticket.Employee_Id);
                    }
                    string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                    return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
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

            return "Configure Ticket Successfully Updated....";
        }

        public string DeleteEntity(Int64 Id)
        {

            return "";
        }

        public ConfigureTicket GetEntityByID(Int64 Id)
        {
            ConfigureTicket objEntityToReturn = new ConfigureTicket();
            return objEntityToReturn;
        }

        public IEnumerable<ConfigureTicket> GetEntityList()
        {
            List<ConfigureTicket> objListToReturn = new List<ConfigureTicket>();
            return objListToReturn;
        }

        public string AddEntity(ConfigureTicket entityObject)
        {
            return "";
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
