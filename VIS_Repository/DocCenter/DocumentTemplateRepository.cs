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
using VIS_Domain.Master.CompanyRelated;
using VIS_Domain.DocCentre;
using VIS_Repository.Masters;

namespace VIS_Repository.DocCenter
{
    public class DocumentTemplateRepository : VISDbCommand
    {

        public Int32 intAffectedRecords { get; set; }

        string mode;

        public DocumentTemplateRepository(string _connectionstring) : base(_connectionstring)
        {

        }


        // Step 1

        public IEnumerable<DocumentTemplateViewModel> GetEntityListApproved(int EmployeeId,string EmployeeRole,string ApprovedStatus)
        {

            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                List<DocumentTemplateViewModel> objListToReturn = new List<DocumentTemplateViewModel>();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDOC_GetAllDocumentTemplate;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_PageIndex, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_PageSize, 0);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SortBy,"");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SortOrder, "");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SearchField, "");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SearchText, "");
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsShowAll, true);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_EmployeeId, EmployeeId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_EmployeeRole, EmployeeRole);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ApprovedStatus, ApprovedStatus);


                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<DocumentTemplateViewModel>(dt);
                return objListToReturn;

            }
            catch (Exception ex)
            {

                throw;
            }


            

        }

        public List<DocTemplateModule> GetAllModule()
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                List<DocTemplateModule> objListToReturn = new List<DocTemplateModule>();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procGetAllModule;

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<DocTemplateModule>(dt);
                return objListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public DocumentTemplateModel GetById(Int64 Id)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                DocumentTemplateModel objListToReturn = new DocumentTemplateModel();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocumentTemplateGetById;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id, Id);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);
                objListToReturn = VISAutoMapper.ConvertDataTable<DocumentTemplateModel>(dt)[0];
                return objListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public string AddDocumentTemplate(DocumentTemplateModel entityObject)
        {
            try
            {
                 mode = "Insert";

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocumentTemplateAddEditStep1;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_mode, mode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, entityObject.DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_TemplateName, entityObject.TemplateName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_TemplateDescription, entityObject.TemplateDescription);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ModuleId, entityObject.ModuleId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsRecurrence, entityObject.IsRecurrence);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsSelf, entityObject.IsSelf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsBehalf, entityObject.IsBehalf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SharingVariableType, entityObject.SharingVariableType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_StartingVariableRole, entityObject.StartingVariableRole);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDownloadWord, entityObject.IsDownloadWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDownloadPdf, entityObject.IsDownloadPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDMSPdf, entityObject.IsDMSPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDMSWord, entityObject.IsDMSWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsEmailPdf, entityObject.IsEmailPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsEmailWord, entityObject.IsEmailWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DateFormat, entityObject.DateFormat);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsPortrait, entityObject.IsPortrait);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsApproved, entityObject.IsApproved);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ApprovedOn, entityObject.ApprovedOn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsFinalSubmited, entityObject.IsFinalSubmited);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_OwnerId, entityObject.OwnerId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, entityObject.CreatedBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_UpdatedBy, entityObject.UpdatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public Int64 GetMaxDocTempId()
        {
            Int64 DocTempId;
            VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
            objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procGetMaxDocId;

            if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
            {
                objVISDbCommand.objSqlCommand.Connection.Open();
            }

            SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
            DataTable dt = new DataTable();
            da.Fill(dt);
            DocTempId = Convert.ToInt64(dt.Rows[0][0]);

            return DocTempId;
        }

        public string UpdateDocumentTemplate(DocumentTemplateModel entityObject)
        {
            try
            {
                mode = "Update";

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocumentTemplateAddEditStep1;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_mode, mode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, entityObject.DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_TemplateName, entityObject.TemplateName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_TemplateDescription, entityObject.TemplateDescription);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ModuleId, entityObject.ModuleId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsRecurrence, entityObject.IsRecurrence);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsSelf, entityObject.IsSelf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsBehalf, entityObject.IsBehalf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_SharingVariableType, entityObject.SharingVariableType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_StartingVariableRole, entityObject.StartingVariableRole);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDownloadWord, entityObject.IsDownloadWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDownloadPdf, entityObject.IsDownloadPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDMSPdf, entityObject.IsDMSPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsDMSWord, entityObject.IsDMSWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsEmailPdf, entityObject.IsEmailPdf);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsEmailWord, entityObject.IsEmailWord);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DateFormat, entityObject.DateFormat);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsPortrait, entityObject.IsPortrait);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsApproved, entityObject.IsApproved);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ApprovedOn, entityObject.ApprovedOn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsFinalSubmited, entityObject.IsFinalSubmited);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_OwnerId, entityObject.OwnerId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, entityObject.CreatedBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_UpdatedBy, entityObject.UpdatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string ActiveInActiveDocumentTemplate(Int64 Id)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocumentTemplateActiveInActive;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id,Id);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        // Step 2

        public string AddDocumentField(DocMasterFieldDataContract entityObject)
        {
            try
            {
                mode = "Insert";

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldAddEdit;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_mode, mode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldName, entityObject.FieldName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldDescription, entityObject.FieldDescription);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldType, entityObject.FieldType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ListType, entityObject.ListType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DataSourceTable, entityObject.DataSourceTable);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DataSourceColumn, entityObject.DataSourceColumn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_PageContent, entityObject.PageContent);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageName, entityObject.ImageName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageHeight, entityObject.ImageHeight);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageWidth, entityObject.ImageWidth);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageAlign, entityObject.ImageAlign);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldId, entityObject.FieldId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsCustomField, entityObject.IsCustomField);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, entityObject.DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_AttachmentList, entityObject.AttachmentList);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, entityObject.CreatedBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_UpdatedBy, entityObject.UpdatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string UpdateDocumentField(DocMasterFieldDataContract entityObject)
        {
            try
            {
                mode = "Update";

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldAddEdit;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_mode, mode);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id, entityObject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldName, entityObject.FieldName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldDescription, entityObject.FieldDescription);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ListType, entityObject.ListType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DataSourceTable, entityObject.DataSourceTable);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DataSourceColumn, entityObject.DataSourceColumn);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_PageContent, entityObject.PageContent);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageName, entityObject.ImageName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageHeight, entityObject.ImageHeight);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageWidth, entityObject.ImageWidth);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_ImageAlign, entityObject.ImageAlign);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldId, entityObject.FieldId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_IsCustomField, entityObject.IsCustomField);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, entityObject.DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_AttachmentList, entityObject.AttachmentList);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, entityObject.CreatedBy);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_UpdatedBy, entityObject.UpdatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string DeleteDocumentField(Int64 Id,Int64 UpdatedBy)
        {
            try
            {

                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldActiveInActive;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id,Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_UpdatedBy, UpdatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(VISBaseEntityConstants.const_Field_EntityMessage))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddEntityMessageParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue + objVISDbCommand.objSqlCommand.Parameters[VISBaseEntityConstants.const_Field_EntityMessage].Value.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public List<DocMasterFieldDataContract> GetByDocTemplateId(Int64 DocTemplateId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                List<DocMasterFieldDataContract> listListToReturn = new List<DocMasterFieldDataContract>();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldSelectByDocTempId;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocTemplateId);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if(dt.Rows.Count > 0 )
                {
                    listListToReturn = VISAutoMapper.ConvertDataTable<DocMasterFieldDataContract>(dt);
                }

                return listListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public DocMasterFieldDataContract GetByFieldId(Int64 Id)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                DocMasterFieldDataContract objListToReturn = new DocMasterFieldDataContract();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldSelectById;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_Id, Id);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if(dt.Rows.Count > 0)
                {
                    objListToReturn = VISAutoMapper.ConvertDataTable<DocMasterFieldDataContract>(dt)[0];
                }
                
                return objListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public DataTable BindTableFieldDropdown(string TableName)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procGetDocTemplateModuleVariables;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_TableName, TableName);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                return dt;

                
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public DataTable BindCustomFieldDropdown(Int64 DocumentTemplateId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDOC_GetCustomTokenList;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocumentTemplateId);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                return dt;


            }
            catch (Exception ex)
            {

                throw;
            }




        }


        // Step 3

        public List<DocMasterFieldDataContract> BindDocumentContainer(Int64 DocTemplateId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);

                List<DocMasterFieldDataContract> listListToReturn = new List<DocMasterFieldDataContract>();

                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procBindDocumentContainer;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocTemplateId);

                if (objVISDbCommand.objSqlCommand.Connection.State != ConnectionState.Open)
                {
                    objVISDbCommand.objSqlCommand.Connection.Open();
                }

                SqlDataAdapter da = new SqlDataAdapter(objVISDbCommand.objSqlCommand);
                DataTable dt = new DataTable();
                da.Fill(dt);

                if (dt.Rows.Count > 0)
                {
                    listListToReturn = VISAutoMapper.ConvertDataTable<DocMasterFieldDataContract>(dt);
                }

                return listListToReturn;
            }
            catch (Exception ex)
            {

                throw;
            }




        }

        public string AddDocumentMasterField(List<DocMasterFieldDataContract> entitylist)
        {
            try
            {
                string Response = DeleteMasterField(entitylist[0].DocTemplateId);

                if(Response.StartsWith("Success"))
                {
                    mode = "Insert";

                    foreach(var item in entitylist)
                    {
                        AddDocumentField(item);
                    }

                }
                
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

                return strRetValue;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string DeleteMasterField(Int64? DocTempId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDeleteDocMasterFieldByDocTempId;
                
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocTempId);
                
                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 0 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string DeleteFormBuiler(Int64? DocTempId)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDeleteDocFormBuilder;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocTempId);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 0 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public string AddFormBuilder(DocMasterFieldDataContract entityobject)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocFormBuilderAdd;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_MasterFieldId,entityobject.Id);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId,entityobject.DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, entityobject.CreatedBy);

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();
                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;
                return strRetValue;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }


        }

        public string AddDocumentContainerField(List<DocMasterFieldDataContract> entitylist)
        {
            try
            {
                string Response = DeleteFormBuiler(entitylist[0].DocTemplateId);

                if(entitylist[0].FieldName!="")
                {
                    if (Response.StartsWith("Success"))
                    {
                        foreach (var item in entitylist)
                        {
                            if (item.Id == 0)
                            {
                                item.Id = AddPageBreakField(item.FieldName, item.FieldType, item.DocTemplateId, item.CreatedBy);
                            }

                            if (item.Id > 0)
                            {
                                AddFormBuilder(item);
                            }

                        }

                    }
                }

                string strRetValue = intAffectedRecords >= 1 ? VISBaseEntityConstants.const_Result_Success : VISBaseEntityConstants.const_Result_Failure;

                return strRetValue;

            }
            catch (Exception ex)
            {
                return ex.Message + Environment.NewLine + ex.StackTrace;
            }

        }

        public Int64 AddPageBreakField(string FieldName,string FieldType,Int64? DocTemplateId,Int64 CreatedBy)
        {
            try
            {
                VISDbCommand objVISDbCommand = new VISDbCommand(base.DatabaseConnection.ConnectionString);
                objVISDbCommand.objSqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                objVISDbCommand.objSqlCommand.CommandText = DocumentTemplateViewModelConstant.const_procDocMasterFieldPageLineBreakAdd;

                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldName, FieldName);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_FieldType, FieldType);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_DocTemplateId, DocTemplateId);
                objVISDbCommand.objSqlCommand.Parameters.AddWithValue(DocumentTemplateViewModelConstant.const_CreatedBy, CreatedBy);

                if (!objVISDbCommand.objSqlCommand.Parameters.Contains(DocumentTemplateViewModelConstant.const_MasterFieldId))
                {
                    objVISDbCommand.objSqlCommand.Parameters.Add(AddMasterFieldIdParameter());
                }

                objVISDbCommand.objSqlCommand.Connection.Open();
                intAffectedRecords = objVISDbCommand.objSqlCommand.ExecuteNonQuery();
                objSqlCommand.Connection.Close();

                Int64 MasterFieldId = 0;

                if (intAffectedRecords > 0 )
                {
                    MasterFieldId = Convert.ToInt64(objVISDbCommand.objSqlCommand.Parameters[DocumentTemplateViewModelConstant.const_MasterFieldId].Value);
                }
                
                return MasterFieldId;

            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public SqlParameter AddMasterFieldIdParameter()
        {
            SqlParameter objSqlEntityMessageParameter = new SqlParameter();
            objSqlEntityMessageParameter.SqlDbType = System.Data.SqlDbType.BigInt;
            objSqlEntityMessageParameter.Size = 1000;
            objSqlEntityMessageParameter.Direction = System.Data.ParameterDirection.Output;
            objSqlEntityMessageParameter.ParameterName = DocumentTemplateViewModelConstant.const_MasterFieldId;
            objSqlEntityMessageParameter.Value = 0;
            return objSqlEntityMessageParameter;
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
